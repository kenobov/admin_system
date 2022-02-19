import React from 'react';
import {connect, useDispatch} from "react-redux";
import {limits} from "../../../core/config/api.config";
import {RootStateType} from "../../../core/store/reducers";
import {clientsGetSuccess, getClients} from "../../../core/store/actions/clients/actions";
import {clientsModel} from "../../../core/models/clients.model";
import useSessionStorage from "../../../core/hooks/useSessionStorage";

import './ClientsModal.scss';

import ClientTable, {ClientTableSkeleton} from "./ClientTable";

import Pagination from "@mui/material/Pagination";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import debounce from "@mui/material/utils/debounce";
import NoData from "../../NoData/NoData";


interface ClientsModalProps {
    callback:(...params:any) => void,
    clients: clientsModel[],
    count: number,
    loading: boolean
}

const mapStateToProps = (state: RootStateType) => ({
    // @ts-ignore
    clients: state.clients.clients,
    // @ts-ignore
    count: state.clients.count,
    // @ts-ignore
    loading: state.clients.loading
})

const ClientsModal = (props:ClientsModalProps) => {

    const [session, setSession] = useSessionStorage({
        page: 1,
        search: ''
    }, "clients");

    const [page, setPage] = React.useState<number>(session.page ?? 1);
    const [search, setSearch] = React.useState<string>(session.search ?? '');

    const dispatch = useDispatch();
    const searchInput = React.useRef<HTMLInputElement>();
    const {callback, clients, count, loading} = props;
    const pageCount = Math.ceil(count/limits.clients);

    React.useEffect(() => {
        return () => {
            setSession(null)
        }
    },[]);

    console.log(pageCount)

    React.useEffect(() => {
        dispatch(getClients())
    },[page, search]);


    const changePageHandler = (event: React.ChangeEvent<unknown>, p: number) => {
        setSession({...session, page: p});
        setPage(p);
    }

    const changeSearchHandler = () => {
        const value = searchInput && searchInput.current ? searchInput.current.value : ''
        setSession({...session, search: value, page: 1});
        setSearch(value);
    }

    const delayedQuery = React.useCallback(debounce(changeSearchHandler, 600),[search])

    return (
        <React.StrictMode>
            <DialogActions className={`clientsSearch`} sx={{padding: '5px 15px 10px'}}>
                <TextField fullWidth inputRef={searchInput}
                           onChange={delayedQuery}
                           defaultValue={search}
                           label="Поиск по названию"
                           variant="standard" />
            </DialogActions>
            <DialogContent className={`clientsTable ${clients.length < 1 ? 'noScroll' : null}`}>
                {
                    loading
                        ? <ClientTableSkeleton fraction={50} />
                        : clients.length > 0
                            ? clients.map(client => {
                                return <ClientTable client={client} callback={callback} key={`clientModal${client.id}`} />
                            })
                            : <div style={{gridColumnStart:1, gridColumnEnd:5}}>
                                <NoData />
                            </div>
                }
            </DialogContent>
            {
                pageCount > 1
                    ? <DialogActions>
                        <Stack spacing={2} sx={{margin:'0 auto'}}>
                            <Pagination
                                page={+page}
                                count={pageCount}
                                onChange={changePageHandler}
                                size={'large'}
                            />
                        </Stack>
                    </DialogActions> : null
            }

        </React.StrictMode>
    )

}

export default connect(mapStateToProps)(ClientsModal);