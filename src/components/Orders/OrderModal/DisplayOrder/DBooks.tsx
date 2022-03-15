import React from 'react';

import TCmodel from "../../../../core/models/TC.model";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {FaBook, FaBookOpen, FaBookMedical} from "react-icons/fa";
import {IoMdBook} from "react-icons/io";

import DBooksCover from "./Books/DBooksCover";
import DBooksFlyleaf from "./Books/DBooksFlyleaf";
import DBooksBlock from "./Books/DBooksBlock";

interface DBooksProps {
    params: {
        cover: typeof TCmodel,
        block: typeof TCmodel,
        insert: typeof TCmodel,
        hard: typeof TCmodel,
        flyleaf: typeof TCmodel
    } | null
}

const DBooks = (props: DBooksProps) => {

    const [tab, setTab] = React.useState<string>('cover');

    const changeTab = (event: React.SyntheticEvent, newTab:string) => {
        setTab(newTab);
    }

    const {cover, block, insert, hard, flyleaf} = props.params ? props.params : {
        cover:TCmodel,
        block:TCmodel,
        insert:TCmodel,
        hard:TCmodel,
        flyleaf:TCmodel
    };

    const {
        info
    } = hard;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper className={`paper dark`}>
                        <Typography variant={`h6`}>
                            {info.cover === 'soft' ? "Мягкий" : "Твердый"}
                        </Typography>
                        <span>ПЕРЕПЛЕТ</span>
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
                <Grid item xs={4}>
                    <Paper className={`paper dark`}>
                        <Typography variant={`h6`}>
                            {insert.material.paper.id ? "Со вставкой" : "Без вставки"}
                        </Typography>
                        <span>Вставка</span>
                    </Paper>
                </Grid>
            </Grid>

            <hr className="bg-white mt-3 mb-3"/>

            <Tabs value={tab}
                  centered
                  onChange={changeTab}>
                <Tab label="ОБЛОЖКА" value="cover" icon={<FaBook />} iconPosition="start" />
                <Tab label="БЛОК" value="block" icon={<FaBookOpen />} iconPosition="start" />

                {
                    info.cover !== 'soft'
                        ? <Tab label="ФОРЗАЦ" icon={<IoMdBook />} iconPosition="start" value="flyleaf"/>
                        : null
                }
            </Tabs>

            {
                tab === 'cover' ?
                    <>
                        <DBooksCover cover={cover} hard={hard} />
                    </> : ''
            }

            {
                tab === 'block' ?
                    <>
                        <DBooksBlock block={block} insert={insert} />
                    </> : ''
            }

            {
                tab === 'flyleaf' ?
                    <>
                        <DBooksFlyleaf flyleaf={flyleaf} />
                    </> : ''
            }


        </>
    )

}

export default DBooks;
