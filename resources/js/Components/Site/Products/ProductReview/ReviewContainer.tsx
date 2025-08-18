import React from 'react';
import Review from "@/models/product/Review";
import {ProductReviewProvider} from "@/Components/Site/Products/ProductReview/Context/ProductReviewContext";
import {ProductReview, ProductReviewInput} from "./Components";

import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import ProductService from "@/Services/ProductService/ProductService";
import {usePage} from "@inertiajs/react";

const ReviewContainer: React.FC<{reviews: Review [], productId: number}> = ({reviews, productId}) => {
    const productService = ServiceContainer.get(ProductService);
    const user = usePage().props.auth.user;
    const [currentReviews, setCurrentReviews] = React.useState<Review []>(reviews);
    const [currentReview, setCurrentReview] = React.useState<string>(
        (
            user &&
            user.reviews &&
            user.reviews
                // .filter(review => review.isActive)
                .find(review => review.productId === productId)?.review || ''
        ) || ''
    );

    const reviewChanged = (review: Review) => {
        // If we want to add/change changed review in the reviews list:
        // if (currentReviews.map(review => review.id).includes(review.id)) {
        //     setCurrentReviews((reviews) => {
        //         return reviews.map(r => {
        //             if (r.id === review.id) return review;
        //             else return r;
        //         })
        //     })
        // } else setCurrentReviews((reviews) => [review, ...reviews]);

        // If we want to filter the changed response!
        setCurrentReviews((reviews) => reviews.filter(r => r.id !== review.id));
    }

    return (
        <ProductReviewProvider value={{reviews, productId, reviewChanged}}>
            <ProductReviewInput productId={productId} review={currentReview}></ProductReviewInput>
            {
                currentReviews.map((review, key) => (
                    review.isActive && <ProductReview productId={productId} review={review} key={key}></ProductReview>
                ))
            }
        </ProductReviewProvider>
    );
};

export default ReviewContainer;
