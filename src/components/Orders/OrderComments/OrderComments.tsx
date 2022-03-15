import React from 'react';
import ApiOrderService from "../../../core/services/ApiOrderService";
import {orderCommentModel} from "../../../core/models/orderComment.model";
import NoData from "../../NoData/NoData";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import './OrderComments.scss';
import OrderCommentSingle from "./OrderCommentSingle";
import OrderCommentForm from "./OrderCommentForm";

interface OrderCommentsProps {
    id: number
}

const OrderComments = (props: OrderCommentsProps) => {

    const {id} = props;

    const [loading, setLoading] = React.useState(true);
    const [comments, setComments] = React.useState<orderCommentModel[]>([]);
    const [mode, setMode] = React.useState<"display" | "add">("display");

    const getComments = () => {
        setLoading(true);
        ApiOrderService.getOrderComments(id)
            .then((response) => {
                setComments(response.data.result);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    React.useEffect(() => {
        getComments();
    },[])

    const submitHandler = () => {
        setMode('display');
        getComments();
    }

    const loadingHtml = [];
    for (let i=0; i<10; i++) {
        loadingHtml.push(<Grid item xs={12} key={`commentSkeleton${i}`}><Skeleton variant={'rectangular'}/></Grid>)
    }

    const commentsHtml = comments
        ? comments.map((comment) => {
            return <OrderCommentSingle comment={comment}
                                       key={`comment${comment.id}`} />
        })
        : <NoData message={'Ошибка. Комментарии не найдены'} />

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{textAlign: 'right'}}>
                {
                    mode === 'display'
                        ? <Button variant="outlined"
                                  onClick={() => setMode('add')} fullWidth>
                            Добавить заметку
                        </Button>
                        : <Button variant="outlined"
                                  onClick={() => setMode('display')} fullWidth>
                            Отменить
                        </Button>
                }
            </Grid>
            {
                loading ? loadingHtml :
                    <Grid item xs={12}>
                        {
                            mode === 'display'
                                ? commentsHtml
                                : <OrderCommentForm
                                    initComment={{comment:'', type:0, order_id:id}}
                                    onSubmit={submitHandler}
                                />
                        }
                    </Grid>
            }
        </Grid>
    )

}

export default OrderComments;