import React from 'react';
import {orderPackDataModel} from "../../../../core/models/orderPack.model";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/Button";

import {FcCancel} from "react-icons/fc";

interface OrderPacksTableSingleProps {
    pack: orderPackDataModel,
    onChange: (data:orderPackDataModel) => void,
    onRemove: (id:number) => void,
    isRemovable: boolean
}

const OrderPacksTableSingle = (props:OrderPacksTableSingleProps) => {

    const {onChange, onRemove, isRemovable, pack} = props;
    const {id, p, qa, qp} = pack;

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        onChange({
            ...pack,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Grid container spacing={0.5} style={{alignItems: 'center'}}>
            <Grid item xs={"auto"}>
                <Chip label={id} style={{borderRadius:"10px"}}/>
            </Grid>
            <Grid item xs>
                <TextField
                    label="Кол-во пачек"
                    variant="outlined"
                    type="text"
                    name={"qa"}
                    value={qa}
                    onChange={changeHandler}
                    size={'small'}
                />
            </Grid>
            <Grid item xs>
                <TextField
                    label="Упаковка"
                    select fullWidth
                    name={"p"}
                    size={'small'}
                    value={p}
                    onChange={changeHandler}
                >
                    <MenuItem value={'pack'}>Упаковка</MenuItem>
                    <MenuItem value={'box'}>Коробка</MenuItem>
                    <MenuItem value={'package'}>Пакет</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs>
                <TextField
                    label="Кол-во в пачке"
                    variant="outlined"
                    type="text"
                    name={"qp"}
                    value={qp}
                    onChange={changeHandler}
                    size={'small'}
                />
            </Grid>
            <Grid item xs={"auto"} style={{alignSelf:"stretch"}}>
                <IconButton variant={'outlined'} type={"button"}
                            disabled={!isRemovable}
                            color={'error'}
                            onClick={() => onRemove(id)}
                            style={{height:"100%"}}>
                    <FcCancel />
                </IconButton>
            </Grid>
        </Grid>
    )

}

export default OrderPacksTableSingle;