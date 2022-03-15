import React from 'react';
import {orderPackModel} from "../../../../core/models/orderPack.model";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import {ImCancelCircle} from "react-icons/im";

interface DeliveryFormPacksSingleProps {
    pack: orderPackModel,
    index: number,
    callback: (id:number) => void,
    mode?: 'choose' | 'remove'
}

const DeliveryFormPacksSingle = (props:DeliveryFormPacksSingleProps) => {

    const {pack, index, callback, mode = 'choose'} = props;

    return (
        <TableRow>
            <TableCell sx={{fontSize: "10px"}}>
                {index}
            </TableCell>
            <TableCell>
                <Chip label={pack.quantity} color={'info'}/>
            </TableCell>
            <TableCell sx={{fontSize: "12px"}}>
                {pack.nomenclature_name}
            </TableCell>
            <TableCell sx={{fontSize: "12px"}}>
                {pack.order_number}
            </TableCell>
            <TableCell sx={{fontSize: "12px"}}>
                {pack.invoice_number}
            </TableCell>
            <TableCell sx={{fontSize: "12px"}}>
                {
                    mode === 'choose'
                        ? <Button color={'info'} variant={'contained'} onClick={() => callback(pack.id)}>
                            Выбрать
                        </Button>
                        : <IconButton color={'error'} onClick={() => callback(pack.id)}>
                            <ImCancelCircle />
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    )

}

export default DeliveryFormPacksSingle;