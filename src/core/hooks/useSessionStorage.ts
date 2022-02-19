import React from 'react';

type useSessionStorageType = (initialValue: any, key: string) => [any, (value:any) => void]

const useSessionStorage:useSessionStorageType = (initialState, key) => {
    const getValue = () => {
        const storage = sessionStorage.getItem(key);

        if(storage) return JSON.parse(storage);
        return initialState;
    }

    const [value, setValue] = React.useState(getValue);

    React.useEffect(() => {
        value
         ? sessionStorage.setItem(key, JSON.stringify(value))
         : sessionStorage.removeItem(key)
    }, [value]);

    return [value, setValue];
}

export default useSessionStorage;