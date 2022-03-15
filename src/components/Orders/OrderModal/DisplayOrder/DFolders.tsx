import React from 'react';

import TCmodel from "../../../../core/models/TC.model";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {FaBook, FaBookOpen, FaBookMedical} from "react-icons/fa";
import {IoMdBook} from "react-icons/io";

import DFoldersCover from "./Folders/DFoldersCover";
import DFoldersInsert from "./Folders/DFoldersInsert";

interface DFoldersProps {
    params: {
        cover: typeof TCmodel,
        insert: typeof TCmodel,
        hard: typeof TCmodel
    }
}

const DFolders = (props: DFoldersProps) => {

    const [tab, setTab] = React.useState<string>('cover');

    const changeTab = (event: React.SyntheticEvent, newTab:string) => {
        setTab(newTab);
    }

    const {cover, insert, hard} = props.params ? props.params : {
        cover: TCmodel,
        insert: TCmodel,
        hard: TCmodel
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
                <Tab label="ОБЛОЖКА" value="cover" icon={<FaBook />} iconPosition="start" />
                <Tab label="ВЫКЛЕЙКА" value="insert" icon={<FaBookOpen />} iconPosition="start" />
            </Tabs>

            {
                tab === 'cover' ?
                    <>
                        <DFoldersCover cover={cover} hard={hard}/>
                    </> : ''
            }

            {
                tab === 'insert' ?
                    <>
                        <DFoldersInsert insert={insert} hard={hard}/>
                    </> : ''
            }

        </>
    )

}

export default DFolders;
