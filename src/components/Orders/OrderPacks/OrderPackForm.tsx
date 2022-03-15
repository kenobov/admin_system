import React, {FormEvent} from 'react';
import {orderPackDataModel, orderPackModel} from "../../../core/models/orderPack.model";
import ApiOrderService from "../../../core/services/ApiOrderService";
import OrderPacksTable from "./OrderPacksTable/OrderPacksTable";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

interface OrderPackFormProps {
    initPack: orderPackModel,
    onSubmit: () => void;
}


const OrderPackForm = (props:OrderPackFormProps) => {

    const {initPack, onSubmit} = props;

    const [pack, setPack] = React.useState<orderPackModel>(initPack);

    const {quantity, data} = pack;

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = {
            ...pack,
            [e.currentTarget.name]: e.currentTarget.value
        }
        setPack(newState);
    }

    const setData = (data:orderPackDataModel[]) => {
        setPack({
            ...pack,
            data: JSON.stringify(data)
        })
    }

    const submitHandler = (e:FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', String(pack.id));
        formData.append('order_id', String(pack.order_id));
        formData.append('data', String(pack.data));
        formData.append('quantity', String(pack.quantity));

        ApiOrderService.saveOrderPack(formData, pack.id)
            .then(response => {
                console.log(response)
            })
            .finally(() => {
                onSubmit();
            })

    }

    const jsonData = JSON.parse(data);
    const check = jsonData && jsonData.length > 0 ? jsonData.reduce((acc:number, item:orderPackDataModel) => {
        return acc + item.qa*item.qp
    }, 0) : 0;
    const checkBool = +check === +quantity;

    return (
        <Stack
            component="form"
            spacing={3}
            noValidate
            onSubmit={submitHandler}
        >

            <Grid container spacing={1} style={{alignItems:'center'}}>
                <Grid item xs>
                    <TextField fullWidth
                        label="Общее количество"
                        variant="outlined"
                        type="text"
                        value={quantity}
                        name={"quantity"}
                        onChange={changeHandler}
                        required
                    />
                </Grid>
                <Grid item xs={"auto"}>
                    <Typography component={'span'} style={{padding:"0 10px"}}>
                        Проверка:&nbsp;
                        <strong className={`orderCheck ${checkBool ? 'success' : 'error'}`}>
                            {check}
                        </strong>
                    </Typography>
                </Grid>
            </Grid>

            <OrderPacksTable packs={pack.data ? JSON.parse(pack.data) : [{
                id: 1,
                qa: 0,
                p: 'pack',
                qp: 0
            }]} callback={setData} />

            <Button color={"primary"}
                    variant="contained"
                    type={"submit"}
                    size={"large"}
                    disabled={!checkBool}
            >
                Сохранить
            </Button>

        </Stack>
    )

}

export default OrderPackForm;