import React from 'react';
import {orderPackDataModel} from "../../../../core/models/orderPack.model";
import OrderPacksTableSingle from "./OrderPacksTableSingle";

import IconButton from "@mui/material/Button";
import Stack from "@mui/material/Stack";


interface OrderPacksTableProps {
    packs: orderPackDataModel[],
    callback: (data:orderPackDataModel[]) => void
}

const OrderPacksTable = (props:OrderPacksTableProps) => {

    const {packs, callback} = props;

    const addHandler = () => {
        const maxId = Math.max(...packs.map(i=>i.id)) + 1;
        callback([
                ...packs,
                {
                    id: maxId,
                    qa: 0,
                    p: 'pack',
                    qp: 0
                }
            ]
        )
    }

    const changeHandler = (data: orderPackDataModel) => {
        callback(
            packs.map(pack => {
                return pack.id === data.id ? data : pack
            })
        )
    }

    const removeHandler = (id:number) => {
        let newArray = packs.filter(i => i.id !== id), newPacks = [];
        for(let i = 0; i < newArray.length; i++){
            newPacks.push({
                ...newArray[i],
                id: i+1
            })
        }
        callback(newPacks);
    }

    return (
        <React.StrictMode>
            {
                packs.map(pack => {
                    return <OrderPacksTableSingle pack={pack}
                                                  onChange={changeHandler}
                                                  onRemove={removeHandler}
                                                  isRemovable={packs.length > 1}
                                                  key={`packTable${pack.id}`}
                    />
                })
            }


            <IconButton color={"info"}
                        variant="outlined"
                        size={"large"}
                        type={"button"}
                        onClick={addHandler}
            >
                +
            </IconButton>
        </React.StrictMode>
    )

}

export default OrderPacksTable;