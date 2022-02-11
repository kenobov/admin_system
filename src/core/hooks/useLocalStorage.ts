import React from 'react';

type useLocalStorageType = (initialValue: any, key: string) => [any, (value:any) => void]

const useLocalStorage:useLocalStorageType = (initialState, key) => {
    const getValue = () => {
        const storage = localStorage.getItem(key);

        if(storage) return JSON.parse(storage);
        return initialState;
    }

    const [value, setValue] = React.useState(getValue);

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

export default useLocalStorage;