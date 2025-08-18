import React from 'react';
import {useProductListContext} from "@/Contexts/ProductListContext/ProductListContext";
import styles from "./styles.module.scss";
import {
    Box,
    CircularProgress,
    Backdrop,
} from "@mui/material";

const LoadingComponent = () => {
    const {loading} = useProductListContext();
    return (
        <Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
        </Box>
    );
};

export default LoadingComponent;
