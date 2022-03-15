import React from 'react';
import {orderCommentModel} from "../../../core/models/orderComment.model";

import Paper from "@mui/material/Paper";

interface OrderCommentSingleProps {
    comment: orderCommentModel
}

const OrderCommentSingle = (props:OrderCommentSingleProps) => {

    const {id, name, type, comment} = props.comment;

    let style = '';
    if(+type === 1) {style = 'important';}
    if(+type === 2) {style = 'file';}
    if(+type === 3) {style = 'info';}

    return (
        <Paper elevation={2}
               className={`comment ${style}`}>
            <div className="comment_name">
                {name}:
            </div>
            <div className="comment_content">
                {comment}
            </div>
        </Paper>
    )

}

export default OrderCommentSingle