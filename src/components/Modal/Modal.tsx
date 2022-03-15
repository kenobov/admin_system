import React from 'react';
import events from "../../core/events";

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import {AiOutlineClose} from "react-icons/ai";
import NoData from "../NoData/NoData";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

export type ModalSettingsType = {
    maxwidth?: 'sm' | 'md' | 'lg' | 'xl'
    modalTitle?: React.Component | JSX.Element | string | null,
    modalContent?: React.Component | JSX.Element | string | null,
    slide?: boolean,
    fullwidth?: boolean,
    fullscreen?: boolean,
    scroll?: DialogProps['scroll']
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction={'up'} ref={ref} {...props} />;
});

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <AiOutlineClose/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

const Modal = () => {
    const [open, setOpen] = React.useState(false);
    const [settings, setSettings] = React.useState<ModalSettingsType>({});

    React.useEffect(() => {
        events.addListener('modalOpen', handleClickOpen);
        events.addListener('modalClose', handleClose);

        return () => {
            events.removeListener('modalOpen', handleClickOpen);
            events.removeListener('modalClose', handleClose);
        }
    }, [])

    const handleClickOpen = (params: ModalSettingsType) => {
        setSettings(params);
        setOpen(true);
    };
    const handleClose = (callback?:any) => {
        setOpen(false);
        if(callback && typeof callback === 'function'){
            callback();
        }
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            fullScreen={settings.fullscreen ?? false}
            fullWidth={settings.fullwidth ?? false}
            maxWidth={settings.maxwidth ?? 'md'}
            TransitionComponent={Transition}
            scroll={settings.scroll ?? 'paper'}
        >
            {
                settings.modalTitle !== null
                    ?<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {settings.modalTitle ?? "Модальное окно"}
                    </BootstrapDialogTitle> : null
            }
            {
                settings.modalContent ?? <DialogContent dividers><NoData/></DialogContent>
            }
        </Dialog>
    )

}

export default Modal;