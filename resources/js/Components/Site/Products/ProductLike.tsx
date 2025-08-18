import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
    Tooltip,
    IconButton,
    Box,
} from "@mui/material";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import ProductService from "@/Services/ProductService/ProductService";
import {usePage} from "@inertiajs/react";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import LocaleProduct from "@/models/product/LocaleProduct";

const ProductLike: React.FC<{product: LocaleProduct}> = ({product}) => {
    const user = usePage().props.auth.user;
    const [likeValue, setLikeValue] = React.useState<boolean>(
        // (user &&
        //     user.likes &&
        //     user.likes
        //         .filter(like => like.like)
        //         .map(like => like.productId)
        //         .includes(productId) || false)
        (user &&
            product.likes
                .filter(like => like.like)
                .map(like => like.userId)
                .includes(user.id)
        ) || false
    );
    const productService = ServiceContainer.get(ProductService);

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const handleLike = async () => {
        if (user && user.id > 0) {
            const formData = new FormData;
            formData.append('user_id', String(user.id));
            formData.append('product_id', String(product.id));
            formData.append('like', likeValue ? '0' : '1'); //Like value sent to DB before changing its value!.
            productService.like(formData)
                .then(response => {

                if (!likeValue) {
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: 'You liked this product!', severity: "success" })
                    );
                }

                setLikeValue((prevState) => !prevState);

            })
                .catch((error) => {
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true, message: 'Error Happened while storing reaction!', severity: "error" })
                    );
                });
        }
    }

    return (
        <Box>
            <Tooltip title="Like it?">
                <IconButton onClick={handleLike}>
                    {
                        likeValue ?
                            <FavoriteIcon sx={{color: '#DC0002'}}/>
                            :
                            <FavoriteBorderIcon />
                    }

                </IconButton>
            </Tooltip>

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>
    );
};

export default ProductLike;
