import React from 'react';
import {orderPackModel} from "../../../../core/models/orderPack.model";

import Stack from "@mui/material/Stack";
import DialogContent from "@mui/material/DialogContent";
import ApiOrderService from "../../../../core/services/ApiOrderService";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DeliveryFormPacksSingle from "./DeliveryFormPacksSingle";
import NoData from "../../../NoData/NoData";
import TableContainer from "@mui/material/TableContainer";

interface DeliveryModalPacksProps {
    client_id: number,
    notPacks: number[],
    callback: (id:number) => void
}

const DeliveryModalPacks = (props:DeliveryModalPacksProps) => {

    const {client_id, notPacks, callback} = props;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [packs, setPacks] = React.useState<orderPackModel[]>([]);

    React.useEffect(() => {
        getApiPacks();
    }, [notPacks])

    const getApiPacks = () => {
        setLoading(true);
        const query = `&not_delivered=1&notpacks=${JSON.stringify(notPacks)}&client_id=${client_id}`
        ApiOrderService.getOrderPacks(null, query)
            .then(response => {
                setPacks(response.data.result)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <React.StrictMode>
            <DialogContent dividers sx={{p:0}}>
                <TableContainer>
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
                                        return <DeliveryFormPacksSingle key={`delivery_pack_modal_${pack.id}`}
                                                                        pack={pack}
                                                                        callback={callback}
                                                                        index={index+1}
                                                                        mode={'choose'}
                                        />
                                    })
                                    : <TableRow><TableCell colSpan={6}>
                                        <NoData />
                                    </TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </React.StrictMode>
    )

}

export default DeliveryModalPacks;