import React from 'react';

import TCmodel from "../../../../core/models/TC.model";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {FaBook, FaBookOpen, FaBookMedical} from "react-icons/fa";
import {IoMdBook} from "react-icons/io";

import DBooksFlyleaf from "./Books/DBooksFlyleaf";
import DJournalsBack from "./Journals/DJournalsBack";
import DNotebooksCover from "./Notebooks/DNotebooksCover";
import DNotebooksBlock from "./Notebooks/DNotebooksBlock";

interface DNotebooksProps {
    params: {
        face: typeof TCmodel,
        back: typeof TCmodel,
        block: typeof TCmodel,
        hard: typeof TCmodel,
        flyleaf: typeof TCmodel
    }
}

const DNotebooks = (props: DNotebooksProps) => {

    const [tab, setTab] = React.useState<string>('face');

    const changeTab = (event: React.SyntheticEvent, newTab:string) => {
        setTab(newTab);
    }

    const {face, block, back, hard, flyleaf} = props.params ? props.params : {
        face: TCmodel,
        back: TCmodel,
        block: TCmodel,
        hard: TCmodel,
        flyleaf: TCmodel
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
                            {info.orientation === 'portrait' ? "Книжная" : "Альбомная"}
                        </Typography>
                        <span>Ориентация</span>
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
                <Tab label="ОБЛОЖКА" value="face" icon={<FaBook />} iconPosition="start" />
                <Tab label="БЛОК" value="block" icon={<FaBookOpen />} iconPosition="start" />

                {
                    info.cover === 'soft'
                        ? <Tab label="ПОДЛОЖКА" icon={<IoMdBook />} iconPosition="start" value="back"/>
                        : <Tab label="ФОРЗАЦ" icon={<IoMdBook />} iconPosition="start" value="flyleaf"/>
                }
            </Tabs>

            {
                tab === 'face' ?
                    <>
                        <DNotebooksCover face={face} hard={hard}/>
                    </> : ''
            }

            {
                tab === 'back' ?
                    <>
                        <DJournalsBack back={back} hard={hard}/>
                    </> : ''
            }

            {
                tab === 'block' ?
                    <>
                        <DNotebooksBlock block={block} hard={hard}/>
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

export default DNotebooks;
