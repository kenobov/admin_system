import React from 'react';
import moment from "moment";

import {ordersModel} from "../../../core/models/orders.model";
import orderStatus, {orderStatusType} from "../../../core/config/orderStatus.config";

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import {GoFlame} from "react-icons/go";
import {BsCheckAll, BsSpeedometer} from "react-icons/bs";
import {RiStore2Line} from "react-icons/ri";
import {AiOutlineClockCircle} from "react-icons/ai";

import './OrderTable.scss';

interface OrderTableProps {
    order: ordersModel
}

const OrderTable = (props:OrderTableProps) => {

    const {order} = props;

    const secondsToDeadline = moment(order.deadline).unix() - moment().unix();
    const overdue = moment().toDate() > moment(order.deadline).toDate();
    const orderColor = Object.values(orderStatus).find((status:orderStatusType) => {
        return status.id === order.status
    });

    return (
        <div className={`orderTable ${overdue ? 'overdue' : null}`} key={order.id}>
            <div className={`marks`}>
                {
                    secondsToDeadline < 60*60*24*10 && secondsToDeadline > 0
                        ? <GoFlame className={`mark isLate`}/> : null
                }
                {order.is_urgent ? <BsSpeedometer className={`mark isUrgent`}/> : null}
                {+order.client_id === 1 ? <RiStore2Line className={`mark isSelf`}/> : null}
            </div>
            <div className={`order_number ${orderColor && orderColor.color}`}>
                {order.number}
            </div>
            <div className={`order_content`}>
                <h3 title={order.name}>
                    {order.name}
                </h3>
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                    {
                        order.total === order.ready
                            ? <Chip icon={<BsCheckAll />} size="small" label={order.total} color={"success"} />
                            : <Chip size="small" label={'Тираж: '+order.total} variant="outlined" />
                    }
                    {
                        order.total > order.ready
                            ? <Chip icon={<BsCheckAll />} size="small" label={order.ready}/>
                            : null
                    }
                    <div className={'client'}>
                        {order.display_name}
                    </div>
                    <Chip icon={<AiOutlineClockCircle />}
                          variant="outlined"
                          label={moment(order.deadline).format("DD.MM.YYYY")}
                          style={{marginLeft: "auto"}}
                          size="small" />
                </Stack>
            </div>
        </div>
    )

}

export default OrderTable;