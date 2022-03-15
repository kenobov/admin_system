import React from 'react';
import {connect} from 'react-redux';
import {Link, useParams} from "react-router-dom";
import {RootStateType} from '../../../core/store/reducers';
import {appLoadingFinish, appLoadingStart} from "../../../core/store/actions/actions";
import events from "../../../core/events";
import moment from 'moment';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ApiAuthService from "../../../core/services/ApiAuthService";
import TextField from "@mui/material/TextField";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import "moment/locale/ru";

import {clientsModel} from "../../../core/models/clients.model";
import {userModel} from "../../../core/models/user.model";
import {deliveryModel} from "../../../core/models/delivery.model";
import {orderPackModel} from "../../../core/models/orderPack.model";

import {MdOutlineCancel} from "react-icons/md";
import {BsBackspace} from "react-icons/bs";

import ClientsModal from "../../Clients/ClientsModal/ClientsModal";
import DeliveryFormPacks from "./DeliveryFormPacks/DeliveryFormPacks";
import ApiDeliveryService from "../../../core/services/ApiDeliveryService";
import ApiClientService from "../../../core/services/ApiClientService";

const mapStateToProps = (state: RootStateType) => ({
    // @ts-ignore
    loading: state.app.loading
})

const mapDispatchToProps = {
    appLoadingStart, appLoadingFinish
}

interface DeliveryFormProps {
    loading: boolean,
    appLoadingStart: () => void,
    appLoadingFinish: () => void
}

const DeliveryForm = (props: DeliveryFormProps) => {

    const params = useParams();

    const [state, setState] = React.useState<deliveryModel>({
        id: params.id ? +params.id : 0,
        address: '',
        production: 'delivery',
        date: moment().format("YYYY-MM-DD"),
        day: 1,
        comment: '',
        transferred: '',
        received: '',
        shipped: '',
        courier_id: 0,
        client_id: 0
    });

    React.useEffect(() => {
        if(state.id > 0){
            ApiDeliveryService.getDelivery(state.id)
                .then(response => {
                    setState(response.data)
                    setPacks(response.data.packs.map((pack:orderPackModel) => pack.id))
                    ApiClientService.getClient(response.data.client_id)
                        .then(response => {
                            setName(response.data.name);
                        })
                })
        }
        getUsers();
        props.appLoadingFinish();
    }, [])

    const [packs, setPacks] = React.useState<number[]>([]);

    const [name, setName] = React.useState<string>('Организация');
    const [users, setUsers] = React.useState<userModel[]>([]);

    const [msg, setMsg] = React.useState<string | React.ReactElement>('');

    const getUsers = () => {
        ApiAuthService.getUsers()
            .then((response) => {
                setUsers(response.data.result);
            })
    }

    const clientModalCallback = (client: clientsModel | { id: number, name: string }) => {
        changeHandler('client_id', client.id);
        setName(client.name);
        events.emit('modalClose');
    }

    const clientsInModal = () => {
        events.emit('modalOpen', {
            fullwidth: true,
            maxwidth: 'md',
            modalTitle: 'Фильтр по организации',
            modalContent: <ClientsModal callback={clientModalCallback} order={'orders'}/>
        })
    }

    const changeHandler = <P extends keyof deliveryModel>(prop: P, value: deliveryModel[P]) => {
        setState({
            ...state,
            [prop]: value
        })
    }

    const onSubmit = () => {

        let formData = new FormData();
        Object.entries(state).map(([key,value]) => {
            if(key === 'courier_id'){
                formData.append('courier', value)
            }else{
                formData.append(key, String(value === null ? '' : value));
            }
        });
        formData.append('packs', JSON.stringify(packs));

        ApiDeliveryService.saveDelivery(formData, state.id)
            .then(response => {
                setMsg(<Typography color={'success'}>Успешно сохранено!</Typography>)
            })
            .catch(e => {
                setMsg(<Typography color={'error'}>Произошла ошибка</Typography>)
            })
            .finally(() => {
                setTimeout(() => {
                    setMsg('')
                },3000)
            })
    }

    return (
        <div className={`ordersContainer`}>
            <Stack direction="row" spacing={2}>
                <Link to={`/delivery`}>
                    <IconButton aria-label="new" color={'error'}
                                size="large">
                        <BsBackspace/>
                    </IconButton>
                </Link>
                <h1 style={{marginTop: "7px"}}>
                    {
                        state.id > 0
                            ? 'Редактирование отгрузки'
                            : 'Новая отгрузка'
                    }
                </h1>
            </Stack>

            <Grid container spacing={2}>
                <Grid item md={6} sm={12}>
                    <Paper sx={{p: 2, mt: 2}} elevation={2}>
                        <Stack direction={'column'} spacing={2}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Организация</InputLabel>
                                <OutlinedInput id="organization" name="organization"
                                               type={'text'}
                                               disabled
                                               value={name}
                                               onClick={clientsInModal}
                                               endAdornment={
                                                   state.client_id
                                                       ? <InputAdornment position="end">
                                                           <IconButton
                                                               aria-label="toggle password visibility"
                                                               onClick={(e) => {
                                                                   e.stopPropagation();
                                                                   clientModalCallback({id: 0, name: 'Организация'})
                                                               }}
                                                               onMouseDown={(e => e.preventDefault())}
                                                               edge="end"
                                                           >
                                                               <MdOutlineCancel/>
                                                           </IconButton>
                                                       </InputAdornment> : null
                                               }
                                               label="Password"
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <Select value={state.production}
                                        onChange={e => {
                                    // @ts-ignore
                                    changeHandler('production', e.target.value)
                                }}>
                                    <MenuItem value={'delivery'}>
                                        Доставка
                                    </MenuItem>
                                    <MenuItem value={'pickup'}>
                                        Самовывоз
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                            {
                                state.production === 'delivery'
                                    ?
                                        <TextField
                                            label="Адрес"
                                            variant="outlined"
                                            type="text"
                                            value={state.address}
                                            multiline rows={2}
                                            onChange={e => changeHandler('address', e.target.value)}
                                            required
                                        />
                                    : <Select value={state.address}
                                             onChange={e => {
                                                 // @ts-ignore
                                                 changeHandler('address', e.target.value)
                                             }}>
                                        <MenuItem value={'г. Минск, ул. Скорины 14'}>
                                            Минск, Сокрины 14
                                        </MenuItem>
                                    </Select>
                            }
                            </FormControl>

                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                        label="Дата отгрузки"
                                        value={state.date}
                                        onChange={(newValue) => {
                                            changeHandler('date',moment(newValue).format("YYYY-MM-DD"));
                                        }}
                                        inputFormat={"dd.MM.yyyy"}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>

                            <FormControl fullWidth>
                                <Select value={state.day}
                                        onChange={e => {
                                            // @ts-ignore
                                            changeHandler('day', +e.target.value)
                                        }}>
                                    <MenuItem value={1}>
                                        Певрая смена
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        Вторая смена
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <Select value={+state.courier_id} onChange={e => {
                                    changeHandler('courier_id', +e.target.value)
                                }}>
                                    <MenuItem value={0}>
                                        <em>Вся курьеры</em>
                                    </MenuItem>
                                    {
                                        users.map(user => {
                                            return <MenuItem value={+user.id} key={`courier_${user.id}`}>
                                                {user.name}
                                            </MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <TextField
                                    label="Комментарий"
                                    variant="outlined"
                                    type="text"
                                    value={state.comment ? state.comment : ''}
                                    multiline rows={4}
                                    onChange={e => changeHandler('comment', e.target.value)}
                                    required
                                />
                            </FormControl>

                        </Stack>
                    </Paper>
                </Grid>

                <Grid item md={6} sm={12}>
                    <Paper sx={{p: 2, mt: 2}} elevation={2}>
                        <DeliveryFormPacks packIds={packs}
                                           client_id={state.client_id}
                                           setPackIds={setPacks} />
                    </Paper>
                </Grid>


                {
                    state.client_id > 0 && packs.length > 0
                        ? <Grid item md={6} sm={12}>
                            {
                                msg ? <Box sx={{textAlign:"center",p:2}}>
                                    {msg}
                                </Box> : null
                            }
                            <Button fullWidth onClick={onSubmit}
                                    color={'info'}
                                    variant={'contained'}
                                    sx={{mt:3, mb:3}}>
                                Сохранить
                            </Button>
                        </Grid> : null
                }
            </Grid>
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryForm);