import React from 'react';
import events from "../../../../core/events";
import {orderPackModel} from "../../../../core/models/orderPack.model";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import NoData from "../../../NoData/NoData";
import DeliveryFormPacksSingle from "./DeliveryFormPacksSingle";
import ApiOrderService from "../../../../core/services/ApiOrderService";
import Loader from "../../../Loader/Loader";
import {clientsModel} from "../../../../core/models/clients.model";
import ClientsModal from "../../../Clients/ClientsModal/ClientsModal";
import DeliveryModalPacks from "./DeliveryModalPacks";

interface DeliveryFormPacksProps {
    packIds: number[],
    setPackIds: (packIds:number[]) => void,
    client_id: number
}

const DeliveryFormPacks = (props:DeliveryFormPacksProps) => {

    const {packIds, setPackIds, client_id} = props;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [packs, setPacks] = React.useState<orderPackModel[]>([]);

    React.useEffect(() => {
        events.emit('modalClose');
    },[])

    React.useEffect(() => {
        packIds.length > 0 ? getApiPacks() : setPacks([])
    },[packIds])

    const getApiPacks = () => {
        setLoading(true);
        const query = `&packs=${JSON.stringify(packIds)}&client_id=${client_id}`
        ApiOrderService.getOrderPacks(null, query)
            .then(response => {
                setPacks(response.data.result)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const getAllPacks = () => {
        setLoading(true);
        const query = `&not_delivered=1&client_id=${client_id}`
        ApiOrderService.getOrderPacks(null, query)
            .then(response => {
                setPackIds(response.data.result.map((item:orderPackModel) => item.id))
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const onChoose = (id:number) => {
        setPackIds([
            ...packIds,
            id
        ]);
        events.emit('modalClose');
    }

    const packsInModal = () => {
        events.emit('modalOpen', {
            fullwidth: true,
            maxwidth: 'md',
            modalTitle: 'Выбор упаково на отгрузку',
            modalContent: <DeliveryModalPacks client_id={client_id}
                                              notPacks={packIds}
                                              callback={onChoose}/>
        })
    }

    const onRemove = (id:number) => {
        setPackIds([
            ...packIds.filter(pack => pack !== id)
        ])
    }

    return (
        <Stack direction={'column'} spacing={2}>
            <Loader active={loading} />

            <Typography variant={'body2'}>
                Содержимое отгрузки
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontSize: "12px", p:1, textAlign:'center'}}>#</TableCell>
                            <TableCell sx={{fontSize: "12px", p:1, textAlign:'center'}}>Кол</TableCell>
                            <TableCell sx={{fontSize: "12px", p:1}}>Название</TableCell>
                            <TableCell sx={{fontSize: "12px", p:1, textAlign:'center'}}>Заказ</TableCell>
                            <TableCell sx={{fontSize: "12px", p:1, textAlign:'center'}}>Счет</TableCell>
                            <TableCell sx={{fontSize: "12px", p:1}}>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            packs && packs.length > 0
                                ? packs.map((pack, index) => {
                                    return <DeliveryFormPacksSingle key={`delivery_pack_${pack.id}`}
                                                                    pack={pack}
                                                                    callback={onRemove}
                                                                    index={index+1}
                                                                    mode={'remove'}
                                    />
                                })
                                : <TableRow><TableCell colSpan={6}>
                                    <NoData />
                                </TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            {
                client_id > 0
                    ? <Stack direction={'row'} sx={{d:'flex', justifyContent:'space-between'}}>
                        <Button color={'info'}
                                variant={'contained'}
                                onClick={packsInModal}>
                            Добавить упаковки
                        </Button>
                        <Button color={'warning'}
                                onClick={getAllPacks}
                                variant={'outlined'}>
                            Загрузить все
                        </Button>
                    </Stack> : null
            }
        </Stack>
    )

}

export default DeliveryFormPacks;