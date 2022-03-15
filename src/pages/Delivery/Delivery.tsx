import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {connect, useDispatch} from "react-redux";

import events from "../../core/events";
import {limits} from "../../core/config/api.config";
import {getDeliveries} from "../../core/store/actions/deliveries/actions";

import {RootStateType} from "../../core/store/reducers";
import {deliveryModel} from "../../core/models/delivery.model";
import {clientsModel} from "../../core/models/clients.model";
import {userModel} from "../../core/models/user.model";

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Pagination from "@mui/material/Pagination";
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import {BsFillRecordCircleFill} from "react-icons/bs";
import {FiRefreshCw} from "react-icons/fi";
import {FcPlus} from "react-icons/fc";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import "moment/locale/ru";

import './Delivery.scss';
import useSessionStorage from "../../core/hooks/useSessionStorage";
import NoData from "../../components/NoData/NoData";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {MdOutlineCancel} from "react-icons/md";
import ClientsModal from "../../components/Clients/ClientsModal/ClientsModal";
import DeliveryTable from "../../components/Delivery/DeliveryTable/DeliveryTable";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ApiAuthService from "../../core/services/ApiAuthService";

const mapStateToProps = (state: RootStateType) => ({
    // @ts-ignore
    deliveries: state.deliveries.deliveries,
    // @ts-ignore
    count: state.deliveries.count,
    // @ts-ignore
    loading: state.app.loading
})

type DeliveryProps = {
    deliveries: deliveryModel[],
    count: number,
    loading: boolean,
    message?: string | null
}

type DeliveryStatus = 'all' | 'transfer' | 'receive' | 'ship' | 'shipped' ;

interface DeliveryState {
    page: number,
    status: DeliveryStatus,
    date: string | null,
    client: number,
    courier: any
}

const Delivery = (props: DeliveryProps) => {

    const dispatch = useDispatch();
    const [session, setSession] = useSessionStorage({
        page: 1,
        status: 0,
        date: null,
        client: 0,
        courier: 0
    }, "delivery");

    const [state, setState] = React.useState<DeliveryState>({
        page: session.page ?? 1,
        status: session.status ?? 0,
        date: session.date ?? null,
        client: session.client ?? 0,
        courier: session.courier ?? 0
    });

    const [name, setName] = React.useState<string>('Организация')
    const [users, setUsers] = React.useState<userModel[]>([])

    const {status, page, date, client, courier} = state;
    const {deliveries, count, loading} = props;
    const pageCount = Math.ceil(count/limits.delivery);

    const params = useParams();

    React.useEffect(() => {
        if(params) events.emit('modalClose');
        events.addListener('dataRefresh', refreshDeliveries);
        return () => {
            events.removeListener('dataRefresh', refreshDeliveries);
        }
    },[]);

    React.useEffect(() => {
        refreshDeliveries();
        getUsers();
    }, [state]);

    const refreshDeliveries = () => {
        dispatch(getDeliveries());
    }

    const getUsers = () => {
        ApiAuthService.getUsers()
            .then((response) => {
                setUsers(response.data.result);
            })
    }

    const changeCourierHandler = (e: SelectChangeEvent) => {
        setSession({...session, courier: +e.target.value, page: 1});
        setState({...state, courier: +e.target.value, page: 1});
    }

    const changeStatusHandler = (status: DeliveryStatus) => {
        setSession({...session, status, page: 1});
        setState({...state, status, page: 1});
    }

    const changePageHandler = (event: React.ChangeEvent<unknown>, p: number) => {
        setSession({...session, page: p});
        setState({...state, page: p});
    }

    const changeDateHandler = (date: string | null) => {
        setSession({...session, date});
        setState({...state, page: 1, date});
    }

    const changeClientHandler = (id: number, name?: string | null) => {
        setSession({...session, page: 1, client: id});
        setState({...state, page: 1, client: id});
        setName(name ?? '');
    }

    const clientModalCallback = (client:clientsModel) => {
        changeClientHandler(client.id, client.name);
        events.emit('modalClose');
    }

    const clientsInModal = () => {
        events.emit('modalOpen', {
            fullwidth: true,
            maxwidth: 'md',
            modalTitle: 'Фильтр по организации',
            modalContent: <ClientsModal callback={clientModalCallback} order={'delivery'} />
        })
    }

    const skeleton = [];
    for (let i = 0; i < 10; i++) {
        skeleton.push(<Skeleton variant="text" height={80} sx={{transform: "scale(1, 0.80)"}} key={'skel'+i}/>)
    }

    return (
        <div className={`ordersContainer`}>
            <Stack direction="row" spacing={2} className={`ordersHeader`}>
                <h1>
                    Отгрузки
                </h1>

                <Stack direction="row" spacing={2}>
                    <Link to={`/delivery/new`}>
                        <IconButton aria-label="new"
                                    size="large">
                            <FcPlus />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="refresh"
                                onClick={refreshDeliveries}
                                size="large">
                        <FiRefreshCw />
                    </IconButton>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={2} className={`ordersFilters`}>
                <FormControl variant="outlined">
                    <InputLabel>Организация</InputLabel>
                    <OutlinedInput id="organization" name="organization"
                                   type={'text'}
                                   disabled
                                   value={name}
                                   onClick={clientsInModal}
                                   endAdornment={
                                       client
                                           ? <InputAdornment position="end">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={(e) => {
                                                       e.stopPropagation();
                                                       changeClientHandler(0)
                                                   }}
                                                   onMouseDown={(e => e.preventDefault())}
                                                   edge="end"
                                               >
                                                   <MdOutlineCancel />
                                               </IconButton>
                                           </InputAdornment> : null
                                   }
                                   label="Password"
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <Select value={courier} onChange={changeCourierHandler}>
                        <MenuItem value={0}>
                            <em>Вся курьеры</em>
                        </MenuItem>
                        {
                            users.map(user => {
                                return <MenuItem value={user.id} key={`courier_${user.id}`}>
                                    {user.name}
                                </MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            label="Выберите дату"
                            value={date}
                            inputFormat={"dd.MM.yyyy"}
                            onChange={changeDateHandler}
                            renderInput={(params) => (
                                <TextField {...params} InputProps={{
                                    endAdornment: (
                                        <>
                                            {
                                                date
                                                    ? <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                changeDateHandler(null)
                                                            }}
                                                            onMouseDown={(e => e.preventDefault())}
                                                            edge="end"
                                                        >
                                                            <MdOutlineCancel />
                                                        </IconButton>
                                                    </InputAdornment> : null
                                            }
                                        </>
                                    ),
                                }}/>
                            )}
                        />
                    </LocalizationProvider>
                </FormControl>
            </Stack>

            <Stack direction="row" spacing={2} className={'statusContainer'}>
                <Button variant="outlined"
                        disabled={status === 'all'}
                        onClick={() => changeStatusHandler('all')}>
                    Все
                </Button>
                <Button variant='outlined' disabled={status === 'transfer'}
                        onClick={() => changeStatusHandler('transfer')} >
                    <BsFillRecordCircleFill className={`statusColor danger`}/>
                    На отгрузку
                </Button>
                <Button variant='outlined' disabled={status === 'receive'}
                        onClick={() => changeStatusHandler('receive')} >
                    <BsFillRecordCircleFill className={`statusColor warning`}/>
                    На доставку
                </Button>
                <Button variant='outlined' disabled={status === 'ship'}
                        onClick={() => changeStatusHandler('ship')} >
                    <BsFillRecordCircleFill className={`statusColor info`}/>
                    В пути
                </Button>
                <Button variant='outlined' disabled={status === 'shipped'}
                        onClick={() => changeStatusHandler('shipped')} >
                    <BsFillRecordCircleFill className={`statusColor success`}/>
                    Отгруженные
                </Button>
            </Stack>


            {
                deliveries.length > 0
                    ? <>
                        <div className={`ordersTable`}>
                            {
                                loading
                                    ? <>
                                        <Stack spacing={0}>
                                            {skeleton}
                                        </Stack>
                                        <Stack spacing={0}>
                                            {skeleton}
                                        </Stack>
                                    </>
                                    : deliveries.map((delivery: deliveryModel) => {
                                        return <DeliveryTable delivery={delivery}
                                                              preOpen={params.id ? +params.id : null}
                                                              key={'delivery_' + delivery.id}/>
                                    })
                            }
                        </div>
                        {
                            pageCount > 1
                                ? <Stack spacing={2} className={'pagination'}>
                                    <Pagination
                                        page={+page}
                                        count={pageCount}
                                        onChange={changePageHandler}
                                        size={'large'}
                                    />
                                </Stack> : null
                        }
                    </>
                    : <NoData/>
            }

        </div>
    )

}

export default connect(mapStateToProps)(Delivery);