import React from 'react';
import {Link} from 'react-router-dom';
import {connect, useDispatch} from "react-redux";
import {RootStateType} from "../../../core/store/reducers";
import {deliveryModel} from "../../../core/models/delivery.model";
import {getDelivery} from "../../../core/store/actions/delivery/actions";
import moment from "moment";
import events from "../../../core/events";

import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";

import './DeliveryModal.scss';
import ApiClientService from "../../../core/services/ApiClientService";
import {clientsModel} from "../../../core/models/clients.model";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";
import {orderPackDataModel, orderPackModel} from "../../../core/models/orderPack.model";
import ApiOrderService from "../../../core/services/ApiOrderService";
import Button from "@mui/material/Button";
import ApiDeliveryService from "../../../core/services/ApiDeliveryService";
import NoData from "../../NoData/NoData";


interface DeliveryModalProps {
    id: number,
    loading: boolean,
    delivery: deliveryModel | null
}

const mapStateToProps = (state: RootStateType) => {
    return {
        // @ts-ignore
        delivery: state.delivery.delivery,
        // @ts-ignore
        loading: state.delivery.loading
    }
}

const DeliveryModal = (props: DeliveryModalProps) => {

    const dispatch = useDispatch();
    const {id, loading, delivery} = props;

    const [client, setClient] = React.useState<clientsModel | null>(null);
    const [packs, setPacks] = React.useState<orderPackModel[]>([]);

    React.useEffect(() => {
        getApiDelivery();
    }, [])

    const getApiDelivery = () => {
        dispatch(getDelivery(id))
    }

    React.useEffect(() => {
        if (delivery && delivery.client_id > 0) {
            ApiClientService.getClient(delivery.client_id)
                .then(response => {
                    setClient(response.data);
                })
        }
        if (delivery && delivery.id > 0) {
            ApiOrderService.getOrderPacks(null, `&delivery_id=${delivery.id}`)
                .then(response => {
                    setPacks(response.data.result);
                })
        }
    }, [delivery?.client_id, delivery?.id])


    const changeDeliveryStatus = (action: string) => {
        const data = new FormData();
        data.append('_action', action);
        ApiDeliveryService.saveDeliveryStatus(data, delivery?.id)
            .then(data => {
                console.log(data)
            })
            .catch((e) => {
                console.log('error')
            })
            .finally(() => {
                getApiDelivery();
                events.emit('dataRefresh');
            })
    }

    let q_pack = 0, q_box = 0, q_package = 0;

    return (
        <React.StrictMode>
            <DialogContent dividers className={`DeliveryModal`}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {
                            delivery?.transferred
                                ? <Paper className={`paper ${!delivery?.transferred ? 'error' : 'done'}`}>
                                    <Typography variant={`h6`}>
                                        {
                                            moment(delivery?.transferred).format("DD.MM.YYYY в HH:mm")
                                        }
                                    </Typography>
                                    <em>Передан</em>
                                </Paper>
                                : <Button variant="outlined"
                                          fullWidth sx={{height: "100%"}}
                                          onClick={() => changeDeliveryStatus('transfer')}
                                          type={"button"}>
                                    Передать
                                </Button>
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            delivery?.transferred && !delivery?.received
                                ? <Button variant="outlined" color={'error'}
                                          fullWidth sx={{height: "100%"}}
                                          onClick={() => changeDeliveryStatus('return')}
                                          type={"button"}>
                                    Вернуть на склад
                                </Button>
                                : <Paper className={`paper ${!delivery?.received ? 'error' : 'done'}`}>
                                    <Typography variant={`h6`}>
                                        {
                                            delivery?.received
                                                ? moment(delivery?.received).format("DD.MM.YYYY в HH:mm")
                                                : '-'
                                        }
                                    </Typography>
                                    <em>Принят</em>
                                </Paper>
                        }

                    </Grid>
                    <Grid item xs={4}>
                        {
                            !delivery?.transferred
                                ? <Button to={`/delivery/edit/${delivery?.id}`} variant="outlined" color={'warning'}
                                          fullWidth sx={{height: "100%"}}
                                          component={Link}>
                                    Редактировать
                                </Button>
                                : <Paper className={`paper ${!delivery?.shipped ? 'error' : 'done'}`}>
                                    <Typography variant={`h6`}>
                                        {
                                            delivery?.shipped
                                                ? moment(delivery?.shipped).format("DD.MM.YYYY в HH:mm")
                                                : '-'
                                        }
                                    </Typography>
                                    <em>Отгружен</em>
                                </Paper>
                        }
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogContent className={`DeliveryModal`}>
                <Typography variant={`h6`}>
                    {
                        client && client.name && !loading
                            ? <>
                                {client.name}
                                <Chip label={client.id}
                                      variant={'outlined'}
                                      size={'small'}
                                      style={{marginLeft: "5px"}}/>
                            </>
                            : <Skeleton/>
                    }
                </Typography>
                <Stack direction="row" spacing={2} sx={{marginTop: "10px"}}>
                    {
                        delivery && delivery.address && !loading
                            ? <Chip label={delivery.address}
                                    size={'small'}
                            />
                            : <Skeleton width={'100%'}/>
                    }
                </Stack>
                {
                    delivery && delivery.comment && !loading
                        ? <Paper className={`paper`} style={{textAlign: "left", marginTop: "10px"}}>
                            <Typography variant={'body2'}>
                                {delivery.comment}
                            </Typography>
                        </Paper>
                        : null
                }
                <Grid container spacing={2} style={{marginTop: "5px"}}>
                    <Grid item xs={4}>
                        {
                            delivery?.date
                                ? <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {
                                            moment(delivery?.date).format("DD.MM.YYYY")
                                        }
                                    </Typography>
                                    <em>Дата доставки</em>
                                </Paper>
                                : <Skeleton width={'100%'} height={'80px'}/>
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            delivery?.day
                                ? <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {
                                            delivery?.day === 1 ? 'Первая' : 'Вторая'
                                        }
                                    </Typography>
                                    <em>Смена</em>
                                </Paper>
                                : <Skeleton width={'100%'} height={'80px'}/>
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            delivery?.production
                                ? <Paper className={`paper`}>
                                    <Typography variant={`h6`}>
                                        {
                                            delivery.production === 'delivery' ? 'Доставка' : 'Самовывоз'
                                        }
                                    </Typography>
                                    <em>Тип</em>
                                </Paper>
                                : <Skeleton width={'100%'} height={'80px'}/>
                        }
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogContent dividers className={`DeliveryModal`}>
                <Typography variant={`body2`}>
                    Содержание отгрузки
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontSize: "12px"}}>#</TableCell>
                                <TableCell sx={{fontSize: "12px"}}>Наименование</TableCell>
                                <TableCell sx={{fontSize: "12px"}}>Кол</TableCell>
                                <TableCell sx={{fontSize: "12px"}}>Заказ</TableCell>
                                <TableCell sx={{fontSize: "12px"}}>Счет</TableCell>
                                <TableCell sx={{fontSize: "12px"}}>Детали</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                packs.length > 0
                                    ? packs.map((item, index) => {
                                        const q: orderPackDataModel[] = JSON.parse(item.data);
                                        return <TableRow key={"delivery_pack+" + item.id}>
                                            <TableCell sx={{fontSize: "10px"}}>{index + 1}</TableCell>
                                            <TableCell sx={{fontSize: "10px"}}>{item.nomenclature_name}</TableCell>
                                            <TableCell sx={{fontSize: "10px"}}>{item.quantity}</TableCell>
                                            <TableCell sx={{fontSize: "10px"}}>
                                                Заказ №{item.order_number}
                                            </TableCell>
                                            <TableCell sx={{fontSize: "10px"}}>
                                                Счет №{item.invoice_number}
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction={'column'} spacing={1}>
                                                    {
                                                        q.map((i, ind: number) => {
                                                            let packName = 'упаковок';
                                                            if (i.p === 'pack') q_pack += +i.qa;
                                                            if (i.p === 'box') {
                                                                q_box += +i.qa;
                                                                packName = 'коробок';
                                                            }
                                                            if (i.p === 'package') {
                                                                q_package += +i.qa;
                                                                packName = 'пакетов';
                                                            }

                                                            return <div key={"pack" + index + ind}>
                                                                <Chip color={"info"} size={'small'}
                                                                      sx={{fontSize: "10px"}}
                                                                      label={`${i.qa} ${packName} по ${i.qp} шт`}
                                                                />
                                                            </div>
                                                        })
                                                    }
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    })
                                    : <TableRow>
                                        <TableCell colSpan={6}>
                                            <NoData/>
                                        </TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    packs.length > 0 ?
                        <Stack direction={'row'} spacing={2} sx={{marginTop:"10px"}}>
                            <Typography variant={'body2'}>
                                Итого:
                            </Typography>
                            {
                                q_pack
                                    ? <Chip color={"info"} size={'small'}
                                            label={`${q_pack} упаковок`}
                                    /> : null
                            }
                            {
                                q_box
                                    ? <Chip color={"info"} size={'small'}
                                            label={`${q_box} коробок`}/> : null
                            }
                            {
                                q_package
                                    ? <Chip color={"info"} size={'small'}
                                            label={`${q_package} пакетов`}/> : null
                            }
                        </Stack>
                        : null
                }
            </DialogContent>
        </React.StrictMode>
    )

}


export default connect(mapStateToProps)(DeliveryModal);