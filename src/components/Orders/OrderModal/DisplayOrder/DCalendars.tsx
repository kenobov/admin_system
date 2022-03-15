import React from 'react';

import TCmodel from "../../../../core/models/TC.model";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {AiTwotoneCalendar, AiOutlineCalendar, AiFillCalendar} from "react-icons/ai";
import {MdCalendarViewMonth} from "react-icons/md";

import DCalendarsCover from "./Calendars/DCalendarsCover";
import DCalendarsSubstrate from "./Calendars/DCalendarsSubstrate";
import DCalendarsGrid from "./Calendars/DCalendarsGrid";
import DCalendarsBottom from "./Calendars/DCalendarsBottom";

interface DCalendarsProps {
    params: {
        cover: typeof TCmodel,
        substrate: typeof TCmodel,
        grid: typeof TCmodel,
        bottom: typeof TCmodel
    }
}

const DCalendars = (props: DCalendarsProps) => {

    const [tab, setTab] = React.useState<string>('cover');

    const changeTab = (event: React.SyntheticEvent, newTab:string) => {
        setTab(newTab);
    }

    const {cover, substrate, grid, bottom} = props.params ? props.params : {
        cover: TCmodel,
        substrate: TCmodel,
        grid: TCmodel,
        bottom: TCmodel
    };

    return (
        <>

            <Tabs value={tab}
                  centered
                  onChange={changeTab}>
                <Tab label="ШАПКА" value="cover" icon={<AiFillCalendar />} iconPosition="start" />
                <Tab label="ПОДЛОЖКА" value="substrate" icon={<AiTwotoneCalendar />} iconPosition="start" />
                <Tab label="СЕТКА" value="grid" icon={<MdCalendarViewMonth />} iconPosition="start" />
                <Tab label="РЕКЛАМНОЕ ПОЛЕ" value="bottom" icon={<AiOutlineCalendar />} iconPosition="start" />
            </Tabs>

            {
                tab === 'cover' ?
                    <>
                        <DCalendarsCover cover={cover}/>
                    </> : ''
            }

            {
                tab === 'substrate' ?
                    <>
                        <DCalendarsSubstrate substrate={substrate}/>
                    </> : ''
            }

            {
                tab === 'grid' ?
                    <>
                        <DCalendarsGrid grid={grid}/>
                    </> : ''
            }

            {
                tab === 'bottom' ?
                    <>
                        <DCalendarsBottom bottom={bottom} />
                    </> : ''
            }


        </>
    )

}

export default DCalendars;
