import React, {ChangeEvent} from 'react';
import {connect, useDispatch} from "react-redux";

import events from "../../core/events";
import {limits} from "../../core/config/api.config";
import {getInvoices} from "../../core/store/actions/invoices/actions";
import {RootStateType} from "../../core/store/reducers";
import {clientsModel} from "../../core/models/clients.model";
import {invoicesModel} from "../../core/models/invoices.model";
import orderStatus, {orderStatusType} from "../../core/config/orderStatus.config";
import orderTypes, {orderTypesType} from "../../core/config/orderTypes.config";

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Pagination from "@mui/material/Pagination";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {BsFillRecordCircleFill} from "react-icons/bs";
import {FiRefreshCw} from "react-icons/fi";

import './Invoices.scss';
import useSessionStorage from "../../core/hooks/useSessionStorage";
import OrderTable from "../../components/Orders/OrderTable/OrderTable";
import NoData from "../../components/NoData/NoData";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {MdOutlineCancel} from "react-icons/md";
import ClientsModal from "../../components/Clients/ClientsModal/ClientsModal";

const mapStateToProps = (state: RootStateType) => ({
    // @ts-ignore
    invoices: state.invoices.invoices,
    // @ts-ignore
    count: state.invoices.count,
    // @ts-ignore
    loading: state.app.loading
})

type InvoicesProps = {
    invoices: invoicesModel[],
    count: number,
    loading: boolean,
    message?: string | null
}

interface InvoicesState {
    page: number,
    status: number | 'all',
    type: string,
    client: number
}

const Invoices = (props: InvoicesProps) => {

    const dispatch = useDispatch();
    const [session, setSession] = useSessionStorage({
        page: 1,
        status: 'all',
        type: 'all',
        client: 0
    }, "invoices");

    const [state, setState] = React.useState<InvoicesState>({
        page: session.page ?? 1,
        status: session.status ?? 0,
        type: session.type ?? 'all',
        client: session.client ?? 0
    });

    const [name, setName] = React.useState<string>('Организация')

    const {status, page, type, client} = state;
    const {invoices, count, loading} = props;
    const pageCount = Math.ceil(count/limits.invoices);

    React.useEffect(() => {
        refreshInvoices();
    }, [state]);

    React.useEffect(() => {
        events.addListener('dataRefresh', refreshInvoices);
        return () => {
            events.removeListener('dataRefresh', refreshInvoices);
        }
    },[]);

    const refreshInvoices = () => {
        dispatch(getInvoices())
    }

    const changeStatusHandler = (id: number | 'all') => {
        setSession({...session, status: id, page: 1});
        setState({...state, status: id, page: 1});
    }

    const changePageHandler = (event: React.ChangeEvent<unknown>, p: number) => {
        setSession({...session, page: p});
        setState({...state, page: p});
    }

    const changeTypeHandler = (e:SelectChangeEvent) => {
        setSession({...session, type: e.target.value});
        setState({...state, page: 1, type: e.target.value});
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
            modalContent: <ClientsModal callback={clientModalCallback} order={'orders'} />
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
                    Счета
                </h1>

                <IconButton aria-label="refresh"
                            onClick={() => refreshInvoices()}
                            size="large">
                    <FiRefreshCw />
                </IconButton>
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
                    <Select value={type} onChange={changeTypeHandler}>
                        <MenuItem value={'all'}>
                            <em>Вся продукция</em>
                        </MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            <Stack direction="row" spacing={2} className={'statusContainer'}>
                <Button variant="outlined"
                        disabled={status === 'all'}
                        onClick={() => changeStatusHandler('all')}>
                    Все
                </Button>
            </Stack>




        </div>
    )

}

export default connect(mapStateToProps)(Invoices);