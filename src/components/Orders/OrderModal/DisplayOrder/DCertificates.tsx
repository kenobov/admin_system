import React from 'react';

import TCmodel from "../../../../core/models/TC.model";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {AiTwotoneCalendar, AiOutlineCalendar, AiFillCalendar} from "react-icons/ai";
import {MdCalendarViewMonth} from "react-icons/md";

import DCertificatesCover from "./Certificates/DCertificatesCover";
import DCertificatesInsert from "./Certificates/DCertificatesInsert";
import DCertificatesBlock from "./Certificates/DCertificatesBlock";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {FaBook, FaBookOpen} from "react-icons/fa";
import {BsBook} from "react-icons/bs";

interface DCertificatesProps {
    params: {
        cover: typeof TCmodel,
        insert: typeof TCmodel,
        hard: typeof TCmodel,
        block: typeof TCmodel
    }
}

const DCertificates = (props: DCertificatesProps) => {

    const [tab, setTab] = React.useState<string>('cover');

    const changeTab = (event: React.SyntheticEvent, newTab:string) => {
        setTab(newTab);
    }

    const {cover, insert, hard, block} = props.params ? props.params : {
        cover: TCmodel,
        insert: TCmodel,
        hard: TCmodel,
        block: TCmodel
    };

    const info = hard.info;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={`paper dark`}>
                        <Typography variant={`h6`}>
                            {hard.material.width} x {hard.material.height}
                        </Typography>
                        <span>Формат</span>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={`paper dark`}>
                        <Typography variant={`h6`}>
                            {info.middle === 'yes' ? "Со средником" : "Без средника"}
                        </Typography>
                        <span>Средник</span>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={`paper dark`}>
                        <Typography variant={`h6`}>
                            {info.material === 'paper' ? "Бумага" : "Бумвинил"}
                        </Typography>
                        <span>Материал</span>
                    </Paper>
                </Grid>
            </Grid>

            <hr className="bg-white mt-3 mb-3"/>

            <Tabs value={tab}
                  centered
                  onChange={changeTab}>
                <Tab label="КОРОЧКА" value="cover" icon={<FaBook />} iconPosition="start" />
                <Tab label="ВЫКЛЕЙКА" value="insert" icon={<FaBookOpen />} iconPosition="start" />
                <Tab label="ВСТАВКА" value="block" icon={<BsBook />} iconPosition="start" />
            </Tabs>

            {
                tab === 'cover' ?
                    <>
                        <DCertificatesCover cover={cover} hard={hard}/>
                    </> : ''
            }

            {
                tab === 'insert' ?
                    <>
                        <DCertificatesInsert insert={insert} hard={hard}/>
                    </> : ''
            }

            {
                tab === 'block' ?
                    <>
                        <DCertificatesBlock block={block} hard={hard}/>
                    </> : ''
            }

        </>
    )

}

export default DCertificates;
