import React from 'react';
import {ImSpinner9} from 'react-icons/im';
import './loader.scss';

type LoaderProps = {
    active: boolean
}

const Loader = ({active = true}:LoaderProps) => {

    return (
        <div className={`loaderComponent ${active && 'active'}`}>
            <ImSpinner9 />
        </div>
    )

}

export default Loader;