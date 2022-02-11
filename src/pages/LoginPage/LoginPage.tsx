import React, {ChangeEvent, FormEvent} from 'react';
import { useDispatch, connect } from "react-redux";
import { Container, Box, Form, Button } from 'react-bulma-components';
import { AiOutlineBarChart } from "react-icons/ai";

import {authLogin} from "../../core/store/actions/auth/actions";
import {RootStateType} from "../../core/store/reducers";

export interface ILoginPageState {
    username: string,
    password: string
}
export interface ILoginPageProps {
    isLoggedIn: boolean,
    message: string | null
}

const mapStateToProps = (state:RootStateType) => ({
    isLoggedIn: state.auth.isLoggedIn,
    message: state.auth.message
})

const LoginPage: React.FC<ILoginPageProps> = (props: ILoginPageProps) => {

    const dispatch = useDispatch();

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

        dispatch(authLogin(username, password))
            .then(data=>console.log(data));
    }

    return (
        <Container className="container-flex" style={{flexDirection: 'column'}}>

            <div className={"system-name"}>
                <AiOutlineBarChart />
                Система управления заказами
            </div>
            <Box style={{ width: 400 }}>
                <form onSubmit={submitHandler}>
                    <Form.Field>
                        <Form.Label>Логин</Form.Label>
                        <Form.Control>
                            <Form.Input
                                type="text"
                                name="username"
                                value={username}
                                onChange={changeHandler}
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control>
                            <Form.Input type="password"
                                        name="password"
                                        value={password}
                                        onChange={changeHandler}
                                        placeholder="********"
                            />
                        </Form.Control>
                    </Form.Field>
                    <Button.Group>
                        <Button color="info" className="mb-0" type="submit">
                            Войти
                        </Button>
                    </Button.Group>
                </form>
            </Box>
        </Container>
    )

}

export default connect(mapStateToProps)(LoginPage);