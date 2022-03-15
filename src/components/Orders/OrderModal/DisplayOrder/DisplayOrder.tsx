import React from 'react';
import {ordersModel} from "../../../../core/models/orders.model";
import DBlanks from "./DBlanks";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

import DJournals from "./DJournals";
import DBooks from "./DBooks";
import DCalendars from "./DCalendars";
import DNotebooks from "./DNotebooks";
import DCertificates from "./DCertificates";
import DFolders from "./DFolders";

interface DisplayOrderProps {
    order: ordersModel | null
}

const DisplayOrder = (props:DisplayOrderProps) => {

    const {order} = props;

    let orderType = 'Бланки', dc;
    if(order) {
        dc = <DBlanks params={order ? JSON.parse(order.parameters) : null}/>;
        if (order.type === 'journals') {orderType = 'Журналы'; dc = <DJournals params={order ? JSON.parse(order.parameters) : null}/>}
        else if(order.type === 'books') {orderType = 'Книги'; dc = <DBooks params={order ? JSON.parse(order.parameters) : null} />}
        else if(order.type === 'calendars') {orderType = 'Календари'; dc = <DCalendars params={order ? JSON.parse(order.parameters) : null} />}
        else if(order.type === 'notebooks') {orderType = 'Блокноты'; dc = <DNotebooks params={order ? JSON.parse(order.parameters) : null} />}
        else if(order.type === 'certificates') {orderType = 'Удостоверения'; dc = <DCertificates params={order ? JSON.parse(order.parameters) : null} />}
        else if(order.type === 'folders') {orderType = 'Папки'; dc = <DFolders params={order ? JSON.parse(order.parameters) : null} />}
        // else if(order.type === 'store') {orderType = 'Товар со склада'; dc = <DBooks params={order ? JSON.parse(order.parameters) : null} />}
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1, margin: "10px 0" }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {
                            order
                                ? <Paper elevation={2} className={`paper total`}>
                                    <Typography variant={`h6`}>{order?.total}</Typography>
                                    <em>Тираж</em>
                                </Paper> : <Skeleton height={70}/>
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            order
                                ? <Paper elevation={2} className={`paper ${order?.total === order.ready ? 'ready' : null}`}>
                                    <Typography variant={`h6`}>{order?.ready}</Typography>
                                    <em>Готово</em>
                                </Paper> : <Skeleton height={70} />
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            order
                                ? <Paper elevation={2} className={`paper ${order?.total === order.delivered ? 'ready' : null}`}>
                                    <Typography variant={`h6`}>{order?.delivered}</Typography>
                                    <em>Отгружено</em>
                                </Paper> : <Skeleton height={70} />
                        }
                    </Grid>
                </Grid>
            </Box>
            {
                order ? dc : 'null'
            }
        </div>
    )

}

export default DisplayOrder;