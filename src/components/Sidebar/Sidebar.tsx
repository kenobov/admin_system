import React from 'react';
import {NavLink} from "react-router-dom";

import Tooltip from '@mui/material/Tooltip';
import Popper from '@mui/material/Popper';
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';

import { BsTruck, BsReceiptCutoff, BsColumnsGap, BsBoxSeam } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { BiCog } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import './Sidebar.scss';
import {useDispatch} from "react-redux";
import {authLogout} from "../../core/store/actions/auth/actions";
import useWindowSize from "../../core/hooks/useWindowSize";
import events from "../../core/events";

const Sidebar: React.FC = () => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(authLogout());
    }

    const clickModalHandler = () => {
        events.emit('modalOpen', {
            modalTitle: null,
            modalContent: <Paper>
                <List sx={{minWidth: 200}}>
                    <ListItem button onClick={onLogout}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: grey[300], color: grey[900] }}>
                                <MdOutlineLogout/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={"Выйти"}/>
                    </ListItem>
                </List>
            </Paper>
        });
    }


    return (
        <aside className="sidebar">
            <img src="https://printmall.by/public/images/logo-mini.svg" className="logo" alt="" />

            <div className="mainmenu">
                <Tooltip title="Заказы" placement="right" arrow>
                    <NavLink to={"/"} >
                        <BsColumnsGap />
                    </NavLink>
                </Tooltip>
                <Tooltip title="Отгрузки" placement="right" arrow>
                    <NavLink to={"/delivery"} >
                        <BsTruck />
                    </NavLink>
                </Tooltip>
                <Tooltip title="Счета" placement="right" arrow>
                    <NavLink to={"/invoices"} >
                        <BsReceiptCutoff />
                    </NavLink>
                </Tooltip>
                <Tooltip title="Сотрудники" placement="right" arrow>
                    <NavLink to={"/employees"} >
                        <AiOutlineUsergroupAdd />
                    </NavLink>
                </Tooltip>
                {/*<Tooltip title="Упаковки" placement="right" arrow>*/}
                {/*    <NavLink to={"/packs"} >*/}
                {/*        <BsBoxSeam />*/}
                {/*    </NavLink>*/}
                {/*</Tooltip>*/}
            </div>

            <div className={"avatar"} onClick={clickModalHandler}>
                <Avatar sx={{bgColor: grey[300], color: grey[800]}} >
                    <BiCog />
                </Avatar>
            </div>
        </aside>
    )

}

export default Sidebar;