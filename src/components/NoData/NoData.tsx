import React from 'react';
import './NoData.scss';
import {MdOutlineCancel} from "react-icons/md";

interface NoDataProps {
    message?: string | null
}

const NoData = ({message = null}:NoDataProps) => {

    return (
        <div className={`noData`}>
            <MdOutlineCancel/>
            <span>{
                message ? message : 'Нет данных по указанному запросу'
            }</span>
        </div>
    )

}

export default NoData;