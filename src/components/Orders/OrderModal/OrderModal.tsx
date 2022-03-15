import React from 'react';
import {connect, useDispatch} from "react-redux";
import {RootStateType} from "../../../core/store/reducers";
import {ordersModel} from "../../../core/models/orders.model";
import {getOrder} from "../../../core/store/actions/order/actions";

import DisplayOrder from "./DisplayOrder/DisplayOrder";

import DialogContent from "@mui/material/DialogContent";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';

import './OrderModal.scss';
import OrderComments from "../OrderComments/OrderComments";
import NoData from "../../NoData/NoData";
import OrderPacks from "../OrderPacks/OrderPacks";

interface OrderModalProps {
    id: number,
    loading: boolean,
    order: ordersModel | null
}

const mapStateToProps = (state: RootStateType) => {
    return {
        // @ts-ignore
        order: state.order.order,
        // @ts-ignore
        loading: state.order.loading
    }
}

const OrderModal = (props: OrderModalProps) => {

    const dispatch = useDispatch();
    const {id, loading, order} = props;

    const [tab, setTab] = React.useState('info');

    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    React.useEffect(() => {
        dispatch(getOrder(id))
    },[])

    const comments = <Chip label={order?.comments ? order?.comments : "0"} size={'small'}/>;
    const packs = <Chip label={order?.packs ? order?.packs : "0"} size={'small'}/>;

    return (
        <React.StrictMode>
            <DialogContent dividers>
                <Typography variant={`h6`}>
                    {order && !loading
                        ? <>
                            {order.name}
                            <Chip label={order.nomenclature_id}
                                  variant={'outlined'}
                                  size={'small'}
                                  style={{marginLeft: "5px"}} />
                          </>
                        : <Skeleton />}
                </Typography>
                <Typography component={`div`}>
                    {order && !loading
                        ? <>
                            {order.display_name}
                            <Chip label={order.client_id}
                                  variant={'outlined'}
                                  size={'small'}
                                  style={{marginLeft: "5px"}} />
                          </>
                        : <Skeleton width={150}/>}
                </Typography>
            </DialogContent>
            <Tabs value={tab}
                  variant="scrollable"
                  scrollButtons="auto"
                  onChange={handleChangeTab}>
                <Tab label="Информация" value="info" />
                <Tab label="Заметки" icon={comments} iconPosition={"end"} value="comments" />
                <Tab label="Упаковка" icon={packs} iconPosition={"end"} value="packs" />
            </Tabs>
            <DialogContent dividers className={`orderDisplay`}>
                {
                    order
                        ? <>
                            {tab === 'info' ? <DisplayOrder order={order} /> : null}
                            {tab === 'comments' ? <OrderComments id={order.id} /> : null}
                            {tab === 'packs' ? <OrderPacks id={order.id}
                                                           total={order.total}
                                                           delivered={order.delivered}/> : null}
                        </>
                        : <NoData />
                }
            </DialogContent>
        </React.StrictMode>
    )

}

export default connect(mapStateToProps)(OrderModal);