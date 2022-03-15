import React, {ChangeEvent, FormEvent} from 'react';
import { useDispatch, connect } from "react-redux";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { AiOutlineBarChart } from "react-icons/ai";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import {authLogin} from "../../core/store/actions/auth/actions";
import {RootStateType} from "../../core/store/reducers";
import {APP_LOADING_FINISH, APP_LOADING_START} from "../../core/store/actions/types";

export interface ILoginPageState {
    username: string,
    password: string
}
export interface ILoginPageProps {
    isLoggedIn: boolean,
    message: string | null
}

const mapStateToProps = (state:RootStateType) => ({
    // @ts-ignore
    isLoggedIn: state.auth.isLoggedIn,
    // @ts-ignore
    message: state.auth.message
})

const LoginPage: React.FC<ILoginPageProps> = (props: ILoginPageProps) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({
            type: APP_LOADING_FINISH
        })
    },[])

    const [showPassword, toggleShowPassword] = React.useState<boolean>(false);
    const [loginData, setLoginData] = React.useState<ILoginPageState>({
        username: '',
        password: ''
    });

    const {username, password} = loginData;

    const changeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e:FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        dispatch(authLogin(username, password));
    }

    return (
        <div className="container-flex" style={{flexDirection: 'column'}}>

            <div className={"system-name"}>
                <AiOutlineBarChart />
                Система управления заказами
            </div>
            <Paper elevation={10} sx={{
                padding: 5
            }}>
                <Stack
                    component="form"
                    spacing={3}
                    sx={{
                        width: 400,
                        backgroundColor: 'white'
                    }}
                    noValidate
                    onSubmit={submitHandler}
                >
                    <TextField
                        label="Логин"
                        variant="outlined"
                        type="text"
                        value={username}
                        name={"username"}
                        onChange={changeHandler}
                        required
                    />

                    <FormControl variant="outlined">
                        <InputLabel>Пароль</InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={changeHandler}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => toggleShowPassword(!showPassword)}
                                        onMouseDown={(e => e.preventDefault())}
                                        edge="end"
                                    >
                                        {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <Button color={"primary"}
                            variant="outlined"
                            type={"submit"}
                            size={"large"}
                    >
                        Войти
                    </Button>

                </Stack>
            </Paper>
            {
                props.message
            }
        </div>
    )

}

export default connect(mapStateToProps)(LoginPage);