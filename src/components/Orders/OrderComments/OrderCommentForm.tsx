import React, {ChangeEvent, FormEvent} from 'react';
import {orderCommentModel} from "../../../core/models/orderComment.model";
import {ILoginPageState} from "../../../pages/LoginPage/LoginPage";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ApiOrderService from "../../../core/services/ApiOrderService";

interface OrderCommentFormProps {
    onSubmit: () => void,
    initComment: orderCommentModel
}

const OrderCommentForm = (props:OrderCommentFormProps) => {

    const {onSubmit, initComment} = props;

    const [commentData, setCommentData] = React.useState<orderCommentModel>(initComment);

    const {comment, type} = commentData;

    const changeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
        setCommentData({
            ...commentData,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e:FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('order_id', String(commentData.order_id));
        formData.append('comment', String(commentData.comment));
        formData.append('type', String(commentData.type));

        ApiOrderService.saveOrderComment(formData, 0)
            .then(response => {
                console.log(response)
            })
            .finally(() => {
                onSubmit();
            })

    }

    return (
        <Stack
            component="form"
            spacing={3}
            noValidate
            onSubmit={submitHandler}
        >

            <TextField
                label="Заметка"
                variant="outlined"
                type="text"
                value={comment}
                name={"comment"}
                multiline rows={5}
                onChange={changeHandler}
                required
            />

            <TextField
                label="Заметка"
                select
                value={type}
                name={"type"}
                onChange={changeHandler}
            >
                <MenuItem value={0}>Без пометки</MenuItem>
                <MenuItem value={1}>Важно</MenuItem>
                <MenuItem value={2}>Файл</MenuItem>
                <MenuItem value={3}>Информация</MenuItem>
            </TextField>

            <Button color={"primary"}
                    variant="contained"
                    type={"submit"}
                    size={"large"}
            >
                Сохранить
            </Button>

        </Stack>
    )

}

export default OrderCommentForm;