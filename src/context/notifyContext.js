import {createContext, useContext, useState} from 'react';
import Loader from "../Components/others/Loader"

const NotifyContext = createContext({});

const NotifyContextProvider = ({children}) => {
    const [notify, setNotify] = useState({open: false, type: undefined, msg: "" });
    const [loader, setLoader] = useState(false);
    const set_notify = (newData) => {
        setNotify(newData);
    }
    const set_loader = (newDataForLoader) => {
        setLoader(newDataForLoader);
    }
    return (
        <NotifyContext.Provider value={{notify,set_notify,loader,set_loader}}>
            {children}
            {loader && <Loader type="fixed" />}
        </NotifyContext.Provider>
    );
};

export const useNotifyContext = () => useContext(NotifyContext);

export default NotifyContextProvider;