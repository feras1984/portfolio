import React from 'react';
import {Box, Rating} from "@mui/material";

import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import ProductService from "@/Services/ProductService/ProductService";
import {usePage} from "@inertiajs/react";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import LocaleProduct from "@/models/product/LocaleProduct";

const ProductRating: React.FC<{product: LocaleProduct}> = ({product}) => {
    const productService = ServiceContainer.get(ProductService);
    const user = usePage().props.auth.user;
    const [ratingValue, setRatingValue] = React.useState<number | null>(
        // (user &&
        //     user.ratings &&
        //     user.ratings.find(rat => rat.productId === productId)?.rate || 0
        // ) || 0
        (user && product.ratings.find(rate => rate.userId === user.id)?.rate) || 0
    );

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const handleRatingChange = (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        setRatingValue(newValue);
        if (user && user.id > 0) {
            const formData = new FormData;
            formData.append('user_id', String(user.id));
            formData.append('product_id', String(product.id));
            formData.append('rate', String(newValue)); //Like value sent to DB before changing its value!.
            productService.rate(formData)
                .then(response => {
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: 'Your rate has been stored!', severity: "success" })
                    );
                setRatingValue(newValue);
            })
                .catch((error) => {
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: 'Error Happened while storing your rate!', severity: "error" })
                    );
                });
        }
    }
    return (
        <Box>
            <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={handleRatingChange}
                precision={0.5}
            />

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>

    );
};

export default ProductRating;
