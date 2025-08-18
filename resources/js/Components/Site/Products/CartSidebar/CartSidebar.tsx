import React from 'react';
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import styles from "./styles.module.scss";
import {setOpenCart} from "@/Redux/Reducers/CartSlice/CartSlice";
import {styled} from "@mui/material/styles";
import {Backdrop, Box, Divider, IconButton} from "@mui/material";
import Icon from "@/Components/Icon/Icon";
import CartList from "@/Components/Site/Products/Cart/CartList";

const CartSidebar = () => {
    const dispatch = useAppDispatch();
    const open = useAppSelector(state => state.cart.openCart);

    const handleClose = () => dispatch(setOpenCart(false));

    return (
        <Box component="section" className={`${styles.cartContainer} ${open ? styles.openCart : styles.closeCart}`}>
            <Box className={styles.closeButton}>
                <IconButton
                    onClick={handleClose}
                >
                    <Icon name="close"></Icon>
                </IconButton>
            </Box>
            <Box className="mt-[52px]">
                <Divider variant="middle" />
            </Box>

            <Box className="p-[16px]">
                <CartList />
            </Box>


            <Backdrop
                className={styles.backdrop}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
            </Backdrop>

        </Box>
    );
};

export default CartSidebar;
