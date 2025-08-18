import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements, PaymentElement,
} from '@stripe/react-stripe-js';
import {CheckoutForm} from "./CheckoutForm";
import {StripeElementsOptions} from "@stripe/stripe-js/dist/stripe-js/elements-group";
import {useAppSelector} from "@/Redux/Store/hook";
import {usePage} from "@inertiajs/react";
import {
    Box,
} from "@mui/material";

type Props = {}

const StripeCheckout = (props: Props) => {

    const cart = useAppSelector(state => state.cart.cart);
    const user = usePage().props.auth.user;

    const price = cart.reduce((acc, item) => {
        return acc + item.quantity * item.product.sellPrice;
    }, 0);

    const options: StripeElementsOptions = {
        mode: 'payment',
        amount: price,
        currency: 'aed',
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
    };

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

    return (
        <Box className='flex justify-center'>
            <Elements stripe={stripePromise} options={options}>
                <PaymentElement />
                {/*<CheckoutForm price={price} currency={'aed'} />*/}
            </Elements>
        </Box>
    )
}

export default StripeCheckout;
