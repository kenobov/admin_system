import React from 'react';

type useWindowSizeType = () => boolean;

const useWindowSize:useWindowSizeType = () => {

    const [isTablet, setIsTablet] = React.useState(false);

    const handleResize = () => {
        if (window.innerWidth < 992) {
            setIsTablet(true)
        } else {
            setIsTablet(false)
        }
    }

    React.useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })

    return isTablet;
}

export default useWindowSize;