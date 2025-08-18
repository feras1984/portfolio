import React from "react";
import {useAppDispatch} from "@/Redux/Store/hook";
import {restoreCart} from "@/Redux/Reducers/CartSlice/CartSlice";

const CartHandlerContext = React.createContext({});
const CartHandlerProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(restoreCart());
    }, []);
    return <CartHandlerContext.Provider value={{}}>{children}</CartHandlerContext.Provider>
}

export {CartHandlerProvider};
