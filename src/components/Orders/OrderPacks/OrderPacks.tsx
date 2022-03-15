import React from 'react';
import events from "../../../core/events";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import NoData from "../../NoData/NoData";
import OrderPackSingle from "./OrderPackSingle";
import {orderPackModel} from "../../../core/models/orderPack.model";
import ApiOrderService from "../../../core/services/ApiOrderService";
import Skeleton from "@mui/material/Skeleton";
import OrderPackForm from "./OrderPackForm";

interface OrderPacksProps {
    id: number,
    total: number,
    delivered: number
}

const OrderPacks = (props:OrderPacksProps) => {

    const {id} = props;

    const [loading, setLoading] = React.useState(true);
    const [packs, setPacks] = React.useState<orderPackModel[]>([]);
    const [mode, setMode] = React.useState<"display" | "add" | "edit">("display");
    const [selected, setSelected] = React.useState<number>(0);

    const getPacks = () => {
        setLoading(true);
        ApiOrderService.getOrderPacks(id)
            .then((response) => {
                setPacks(response.data.result);
            })
            .finally(() => {
                setLoading(false);
                events.emit('dataRefresh');
            })
    }

    React.useEffect(() => {
        getPacks();
    },[])

    const selectedPack = packs.find((pack) => {
        return pack.id === selected
    });
    const initPack = selected && selectedPack
        ? selectedPack
        : {
            id: 0,
            quantity: 0,
            data: JSON.stringify([{id:1,p:"pack",qa:0,qp:0}]),
            order_id: id,
            delivery_id: 0
        }

    const addHandler = () => {
        setSelected(0);
        setMode('add');
    }

    const selectHandler = (id: number) => {
        setSelected(id);
        setMode('edit');
    }

    const submitHandler = () => {
        setMode('display');
        getPacks();
    }

    const loadingHtml = [];
    for (let i=0; i<10; i++) {
        loadingHtml.push(<Grid item xs={12} key={`commentSkeleton${i}`}><Skeleton variant={'rectangular'}/></Grid>)
    }

    const packsHtml = packs
        ? packs.map((pack) => {
            return (<Grid item xs={12} key={`pack${pack.id}`}>
                <OrderPackSingle onSelect={selectHandler} pack={pack} />
            </Grid>)
        })
        : <NoData message={'Ошибка. Комментарии не найдены'} />

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {
                        mode === 'display'
                            ? <Button variant="outlined" fullWidth  type={"button"}
                                      onClick={addHandler}>
                                Добавить упаковку
                            </Button>
                            : <Button variant="outlined" fullWidth type={"button"}
                                      onClick={() => setMode('display')}>
                                Отменить
                            </Button>
                    }
                </Grid>

                {
                    loading ? loadingHtml :
                        <>
                            {
                                mode === 'display'
                                    ? packsHtml
                                    :  <Grid item xs={12}>
                                        <OrderPackForm initPack={initPack} onSubmit={submitHandler} />
                                       </Grid>
                            }
                        </>
                }
            </Grid>
        </Box>
    )

}

export default OrderPacks;