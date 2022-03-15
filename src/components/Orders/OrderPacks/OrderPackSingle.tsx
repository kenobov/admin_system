import React from 'react';
import {Link} from 'react-router-dom';
import {orderPackModel} from "../../../core/models/orderPack.model";
import moment from "moment";

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/Button";

import {AiOutlineClockCircle} from "react-icons/ai";
import {BsTruck} from "react-icons/bs";
import {FiEdit2, FiTruck} from "react-icons/fi";


interface OrderPackSingleProps {
    pack: orderPackModel,
    onSelect: (id:number) => void
}

const OrderPackSingle = (props:OrderPackSingleProps) => {

    const {pack, onSelect} = props;

    const transferred = pack.transferred
        ? moment(pack.transferred).format("DD.MM.YYYY в HH:mm")
        : 'Не подготовлен'
    const shipped = pack.shipped
        ? moment(pack.shipped).format("DD.MM.YYYY в HH:mm")
        : 'Не отгружен'

    const onPackSelect = () => {
        onSelect(pack.id);
    }

    return (
        <div className={`orderTable`} style={{background: "#eaeaea", boxShadow: "none"}}>
            <div className={`order_number ${pack.shipped ? "success" : pack.transferred ? 'warning' : ''}`}>
                {pack.quantity}
            </div>
            <div className={`order_content`}>
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                    <Chip icon={<AiOutlineClockCircle/>}
                          variant="outlined"
                          label={transferred}
                          color={pack.transferred ? 'success' : 'default'}
                          size="small"/>
                </Stack>
                <Stack direction="row" spacing={1} sx={{alignItems: "center", marginTop: "5px"}}>
                    <Chip icon={<BsTruck/>}
                          variant="outlined"
                          color={pack.shipped ? 'success' : 'default'}
                          label={shipped}
                          size="small"/>
                </Stack>
            </div>
            {
                pack.delivery_id
                    ? <IconButton variant={'outlined'}
                                  color={'success'}
                                  component={Link}
                                  to={`/delivery/${pack.delivery_id}`}
                                  style={{borderRadius:"10px", marginRight:"5px"}}>
                        <FiTruck />
                    </IconButton> : null
            }
            <IconButton variant={'outlined'}
                        onClick={onPackSelect}
                        style={{borderRadius:"10px"}}>
                <FiEdit2 />
            </IconButton>
        </div>
    )

}
export default OrderPackSingle;