import React from 'react';
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {resetCart, setOpenCart} from "@/Redux/Reducers/CartSlice/CartSlice";
import CommonService from "@/Services/CommonService/CommonService";
import ProductService from "@/Services/ProductService/ProductService";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata"
import {
    Box,
    Typography,
    Stack, Divider,
    CardContent,
    Button,
    Tooltip,
} from "@mui/material";
import {grey, red} from "@mui/material/colors";
import CartDetails from "@/Components/Site/Products/Cart/CartDetails";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import {Link, router, usePage} from "@inertiajs/react";
import PriceInfo from "@/Components/Site/Products/Cart/PriceInfo";
import CouponForm from "@/Components/Site/Products/Cart/CouponForm";
import {clearCoupon} from "@/Redux/Reducers/CouponSlice/CouponSlice";

const CartList = () => {
    const commonService = ServiceContainer.get(CommonService);
    const productService = ServiceContainer.get(ProductService);

    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.cart.cart);
    const openCart = useAppSelector(state => state.cart.openCart);
    const lang = usePage().props.lang;
    const totalPrice = items.reduce((acc, item) =>
        acc + item.quantity * item.price, 0);
    const totalNumber = items.reduce((acc, items) => acc + items.quantity, 0);
    const handleClearCart = () => {
        dispatch(resetCart());
        dispatch(clearCoupon());
        setSnackbar(snackbarState =>
            ({ ...snackbarState, open: true, message: `Cart is empty right now!`, severity: "success" })
        );
    }

    const user = usePage().props.auth.user;

    const handleProceed = () => {
        dispatch(setOpenCart(false));
        router.get(`/${lang}/order`);
    }

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    return (
        <Box>
            <Box className="flex justify-between items-start pb-[16px] gap-2">
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Typography component="h5" variant="body1"><strong>List of Items </strong></Typography>
                    <Typography color={grey[500]} variant="body2">{totalNumber} items</Typography>
                </Stack>

                {/*<Typography variant="body2">{totalNumber} items</Typography>*/}
                {
                    user !== null
                        ?
                        <Box>
                            <Button
                                variant="text"
                                sx={{color: red[400]}}
                                onClick={handleClearCart}
                                disabled={items.length <= 0}
                            >
                                Clear
                            </Button>

                            <Button
                                variant="text"
                                sx={{color: '#00796b'}}
                                disabled={items.length <= 0}
                                onClick={handleProceed}
                            >
                                Proceed
                            </Button>
                        </Box>
                        :

                        <a href={`/${lang}/login`} className="flex items-center">
                            <Tooltip title="You need to login before proceeding">
                                <Button
                                    variant="text"
                                    sx={{color: '#00796b'}}
                                >
                                    Login
                                </Button>
                            </Tooltip>
                        </a>
                }

            </Box>
            <CouponForm />
            <PriceInfo totalPrice={totalPrice}></PriceInfo>
            <Divider></Divider>

            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
            >
                {items.map((item, key) => (
                    <CartDetails item={item} key={'cart-'+key}/>
                ))}
            </Stack>

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>
    );
};

export default CartList;
