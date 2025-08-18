import React from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {Box, IconButton, Tooltip} from "@mui/material";

import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import ProductService from "@/Services/ProductService/ProductService";
import {usePage} from "@inertiajs/react";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import LocaleProduct from "@/models/product/LocaleProduct";

const ProductBookmark: React.FC<{product: LocaleProduct}> = ({product}) => {
    const productService = ServiceContainer.get(ProductService);
    const user = usePage().props.auth.user;
    const [bookmarkValue, setBookmarkValue] = React.useState<boolean>(
        // (user &&
        //     user.favorites &&
        //     user.favorites
        //         .filter(fav => fav.favorite)
        //         .map(fav => fav.productId)
        //         .includes(productId) || false)
        (
            user &&
            product.favorites
                .filter(fav => fav.favorite)
                .map(fav => fav.userId)
                .includes(user.id)
        ) || false
    );

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const handleBookmark = () => {
        if (user && user.id > 0) {
            const formData = new FormData;
            formData.append('user_id', String(user.id));
            formData.append('product_id', String(product.id));
            formData.append('favorite', bookmarkValue ? '0' : '1'); //Like value sent to DB before changing its value!.
            productService.favorite(formData)
                .then(response => {
                    const message = bookmarkValue ? 'The product removed from your bookmark!' : 'The product added to your bookmark!';
                    setSnackbar(snackbarState =>
                        ({ ...snackbarState, open: true,
                            message,
                            severity: "success" })
                    );
                setBookmarkValue((prevState) => !prevState);
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
            <Tooltip title="Add to Favorite?">
                <IconButton onClick={handleBookmark}>
                    {
                        bookmarkValue ?
                            <BookmarkIcon sx={{color: '#00796b'}}/>
                            :
                            <BookmarkBorderIcon />
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

export default ProductBookmark;
