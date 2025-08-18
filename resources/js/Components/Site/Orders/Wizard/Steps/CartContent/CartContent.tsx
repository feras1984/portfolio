import React from 'react';
import styles from "../styles.module.scss";
import {useOrderWizardContext} from "@/Components/Site/Orders/Context/OrderWizardContext";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {replaceQuantity, removeFromCart} from "@/Redux/Reducers/CartSlice/CartSlice";
import CartDetails from "@/Components/Site/Products/Cart/CartDetails";
import {Box, Stack, Typography, Divider} from "@mui/material";
import CartWizardDetails from "@/Components/Site/Orders/Wizard/Steps/CartContent/CartWizardDetails";
import CommonService from "@/Services/CommonService/CommonService";
import ProductService from "@/Services/ProductService/ProductService";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import {WizardControls} from "@/Components/Site/Orders/Wizard/Steps";

import {router} from "@inertiajs/react";
import PriceInfo from "@/Components/Site/Products/Cart/PriceInfo";
import CouponForm from "@/Components/Site/Products/Cart/CouponForm";

const CartContent = () => {
    const commonService = ServiceContainer.get(CommonService);
    const productService = ServiceContainer.get(ProductService);
    const items = useAppSelector(state => state.cart.cart);
    const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const {handleNext} = useOrderWizardContext();
    return (
        <Box>
            <Box className="max-w-[500px] m-auto">
                <CouponForm />
            </Box>

        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            className="max-w-[500px] m-auto"
        >
            <Box>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Box className="basis-[200px] p-[16px]">
                        <Typography variant="body1" sx={{fontWeight: 700}} align="center">Item</Typography>
                    </Box>

                    <Box className="basis-[65px]">
                        <Typography variant="body1" sx={{fontWeight: 700}} align="center">Quantity</Typography>
                    </Box>

                    <Box className="basis-[85px]">
                        <Typography variant="body1" sx={{fontWeight: 700}} align="center">Price(AED)</Typography>
                    </Box>
                </Stack>

                <Divider variant="middle"></Divider>

            </Box>
            {items.map((item, key) => (
                <CartWizardDetails item={item} key={key}/>
            ))}
            <Divider variant="middle"></Divider>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                {/*<Box className="basis-[200px] p-[16px]">*/}
                {/*    <Typography variant="body1" sx={{fontWeight: 700}} align="center">Total</Typography>*/}
                {/*</Box>*/}
                <Box className="w-full max-w-[500px]">
                    <PriceInfo totalPrice={totalPrice}></PriceInfo>
                </Box>

                {/*<Box className="basis-[150px]">*/}
                {/*    <Typography variant="body1" sx={{fontWeight: 700}} align="center">{commonService.currencyFormat(totalPrice)}</Typography>*/}
                {/*</Box>*/}
            </Stack>
        </Stack>
            <WizardControls nextAction={handleNext} />
        </Box>
    );
};

export default CartContent;
