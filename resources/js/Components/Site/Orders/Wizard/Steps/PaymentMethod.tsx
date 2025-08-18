import React, {useState} from 'react';
import styles from "./styles.module.scss";
import {WizardControls} from "@/Components/Site/Orders/Wizard/Steps/index";
import {
    Box,
} from "@mui/material";
import {Elements} from "@stripe/react-stripe-js";
import {useAppSelector} from "@/Redux/Store/hook";
import {usePage} from "@inertiajs/react";
import {StripeElementsOptions} from "@stripe/stripe-js/dist/stripe-js/elements-group";
import {loadStripe} from "@stripe/stripe-js";
import {CheckoutForm} from "@/Components/Payments/Stripe/CheckoutForm";

const PaymentMethod = () => {
    const cart = useAppSelector(state => state.cart.cart);
    const [price, setPrice] = React.useState<number>(0);
    // const [discount, setDiscount] = React.useState<number>(0);
    const coupon = useAppSelector(state => state.coupon);
    // const price = cart.reduce((acc, item) => {
    //     return acc + item.quantity *  item.price;
    // }, 0);
    React.useMemo(() => {
        const pr = cart.reduce((acc, item) => {
            return acc + item.quantity *  item.price;
        }, 0);

        setPrice(coupon.isPercent ? pr * (1 - coupon.amount / 100) : pr - coupon.amount);
    }, [cart, coupon]);

    // React.useMemo(() => {
    //     setDiscount(coupon.isPercent ? price * coupon.amount / 100 : coupon.amount);
    // }, [coupon]);

    // console.log(Math.round(price), discount);

    const options: StripeElementsOptions = {
        mode: 'payment',
        amount: Math.round(price),
        currency: 'aed',
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
    };

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

    return (
        //TODO: Add Network connection error in offline mode
        <Box className="p-[16px] max-w-[500px] m-auto">
            {price > 0 && <Box className='flex justify-center'>
                <Elements stripe={stripePromise} options={options}>
                    {/*<PaymentElement />*/}
                    <CheckoutForm price={price} currency={'aed'}/>
                </Elements>
            </Box>}
        </Box>
    );
}

export default PaymentMethod;
