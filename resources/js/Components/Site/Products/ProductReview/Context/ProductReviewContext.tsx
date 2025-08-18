import React, {PropsWithChildren} from "react";
import Review from "@/models/product/Review";

interface IProductReview {
    productId: number;
    reviews: Review [];
    reviewChanged: (review: Review) => void;
    // review: Review;
}

const initValue: IProductReview = {
    productId: 0,
    reviews: [] as Review [],
    reviewChanged: (review: Review) => {},
    // review: new Review({}),
}

const ProductReviewContext = React.createContext<IProductReview>(initValue);

const ProductReviewProvider: React.FC<PropsWithChildren<{value: IProductReview}>> = ({value, children}) => {
    return <ProductReviewContext.Provider value={value}>{children}</ProductReviewContext.Provider>
}

const useProductReviewContext = () => {
    const context = React.useContext(ProductReviewContext);
    if (context === undefined) {
        throw new Error('The Context must be used inside the provider');
    }

    return context;
}

export {useProductReviewContext, ProductReviewProvider};
