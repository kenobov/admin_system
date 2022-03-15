import React from 'react';
import moment from "moment";
import events from "../../../core/events";
import { red, orange, green, grey } from '@mui/material/colors';

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import {GiCardPickup} from "react-icons/gi";
import {BsBoxSeam, BsTruck, BsCheck2Square} from "react-icons/bs";
import {MdOutlineCancel} from "react-icons/md";
import {AiOutlineClockCircle} from "react-icons/ai";
import {FcComments} from "react-icons/fc";

import './DeliveryTable.scss';
import {deliveryModel} from "../../../core/models/delivery.model";
import DeliveryModal from "../DeliveryModal/DeliveryModal";
import Skeleton from "@mui/material/Skeleton";

interface DeliveryTableProps {
    delivery: deliveryModel
    preOpen: number | null
}

const DeliveryTable = (props: DeliveryTableProps) => {

    const {delivery, preOpen} = props;

    const overdue = moment().toDate() > moment(delivery.date).toDate();

    React.useEffect(() => {
        if(preOpen) clickDliveryHandler(preOpen)
    },[])

    let step = null;
    if(delivery.shipped) {
        step = <BsCheck2Square className={'step'} style={{color: green[500]}} />
    }else{
        if(delivery.received) {
            step = <BsTruck className={'step'} style={{color: orange[500]}} />
        }else{
            if(delivery.transferred) {
                step = <BsBoxSeam className={'step'} style={{color: red[500]}}/>
            }else{
                step = <MdOutlineCancel className={'step'} style={{color: grey[500]}}/>
            }
        }
    }

    const clickDliveryHandler = (id: number) => {
        events.emit('modalOpen', {
            fullscreen: true,
            scroll: 'body',
            modalTitle: <>
                Доставка
                {
                    delivery && delivery.courier
                        ? <Chip label={delivery.courier}
                                variant={'outlined'}
                                color={'info'}
                                size={'small'}
                                sx={{marginLeft:"10px"}}
                        />
                        : <Skeleton width={'150px'}/>
                }
            </>,
            modalContent: <DeliveryModal id={id} />
        });
    }

    return (
        <div className={`orderTable delivery ${overdue ? 'overdue' : null}`}
             onClick={() => clickDliveryHandler(delivery.id)}
             key={delivery.id}>
            <div className={`marks`}> </div>
            <div className={`order_number`}>
                {step}
            </div>
            <div className={`order_content`}>
                <h3 className={'sm'}>

                    <Chip icon={delivery.production === 'delivery' ? <BsTruck/> : <GiCardPickup/>}
                          size="small"
                          color={delivery.production === 'delivery' ? "warning" : 'info'}
                          label={delivery.production === 'delivery' ? "Доставка" : 'Самовывоз'}
                          style={{marginRight: "5px"}}
                    />
                    {delivery.address}
                </h3>
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                    <Chip icon={<AiOutlineClockCircle/>}
                          variant="outlined"
                          label={moment(delivery.date).format("DD.MM.YYYY")}
                          size="small"/>

                    <Chip label={delivery.courier}
                          size="small"/>

                    {delivery.comment ? <FcComments/> : null}

                    <div className={'client'}>
                        {delivery.display_name}
                    </div>
                </Stack>
            </div>
        </div>
    )

}

export default DeliveryTable;