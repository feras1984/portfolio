import React from "react";
import LocaleProduct from "@/models/product/LocaleProduct";

const initialState = {
    loading: false,
    products: [] as LocaleProduct [],
}

const ProductListContext = React.createContext(initialState);

const ProductListProvider: React.FC<React.PropsWithChildren<{value: typeof initialState}>> = ({children, value}) => {
    return <ProductListContext.Provider value={value}>{children}</ProductListContext.Provider>
}

const useProductListContext = () => {
    const context = React.useContext(ProductListContext);
    if (context === undefined) {
        throw new Error('The context must be used inside the provider!');
    }

    return context;
}
export {useProductListContext, ProductListProvider}
