import React from 'react';
import events from "../../core/events";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import {AiOutlineClose} from "react-icons/ai";
import NoData from "../NoData/NoData";

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

export type ModalSettingsType = {
    fullwidth?: boolean,
    maxwidth?: 'sm' | 'md' | 'lg' | 'xl'
    modalTitle?: string | null,
    modalContent?: React.Component | JSX.Element | string | null
}

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
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            fullWidth={settings.fullwidth ?? false}
            maxWidth={settings.maxwidth ?? 'md'}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {settings.modalTitle ?? "Модальное окно"}
            </BootstrapDialogTitle>
            {
                settings.modalContent ?? <DialogContent dividers><NoData/></DialogContent>
            }
        </Dialog>
    )

}

export default Modal;