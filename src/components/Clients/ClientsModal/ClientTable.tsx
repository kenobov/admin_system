import React from 'react';
import {clientsModel} from "../../../core/models/clients.model";

import Skeleton from "@mui/material/Skeleton";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import {AiOutlineUnorderedList} from "react-icons/ai";

interface ClientTableProps {
    client: clientsModel,
    callback: (client:clientsModel) => void
}

const ClientTable = (props:ClientTableProps) => {

    const {client, callback} = props;

    return (
        <React.StrictMode>
            <div className={'text-center'}>
                <strong>
                    {client.id}
                </strong>
            </div>
            <div>
                {client.name}
            </div>
            <div>
                <Chip
                    label={client.orders}
                    deleteIcon={<AiOutlineUnorderedList />}
                />
            </div>
            <div>
                <Button variant="outlined"
                        onClick={() => callback(client)}>
                    Выбрать
                </Button>
            </div>
        </React.StrictMode>
    )

}

interface ClientTableSkeletonProps {
    fraction: number
}

export const ClientTableSkeleton = (props:ClientTableSkeletonProps) => {

    const skeleton = [];
    for(let i=0; i<props.fraction; i++){
        skeleton.push(
            <Skeleton variant="text" height={30} key={'clientSkel'+i}/>
        )
    }

    return <>{skeleton}</>;

}

export default ClientTable;