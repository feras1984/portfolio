import React, { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import PaymentService from "@/Services/PaymentService/PaymentService";
import CommonService from "@/Services/CommonService/CommonService";
import {WizardControls} from "@/Components/Site/Orders/Wizard/Steps";
import {
    Box, FormHelperText
} from "@mui/material";
import {useOrderWizardContext} from "@/Components/Site/Orders/Context/OrderWizardContext";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

enum PaymentType {
    CASH = 'cash',
    STRIPE = 'stripe',
}
export const CheckoutForm: React.FC<
    {price: number, currency: string}
> = (
    {price, currency}
) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentType, setPaymentType] = React.useState<string>(PaymentType.CASH);
    const [errorMessage, setErrorMessage] = useState('');
    const paymentService = ServiceContainer.get(PaymentService);
    const commonService = ServiceContainer.get(CommonService);
    const {onPaymentInfoChange, sendOrder} = useOrderWizardContext();

    const handleSubmit = async () => {
        if (elements == null || stripe == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError?.message) {
            // Show error to your customer
            setErrorMessage(submitError.message);
            return;
        }

        const formData = new FormData();
        formData.append('payment_type', PaymentType.STRIPE);
        formData.append('amount', String(Math.round(price)));
        formData.append('currency', currency);

        const res = await paymentService.getIntent(formData);

        const {clientSecret} = res.data;



        const { paymentIntent, error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret,

            confirmParams: {
                return_url: `${window.location.origin}/profile`,
            },

            redirect: 'if_required',
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error?.message || '');
        } else {
            // ============================================================================== //
            // ==============Dispatch Payment Intent to payment method======================= //
            onPaymentInfoChange({
                isPaid: true,
                currency,
                transactionNumber: paymentIntent?.id,
                referenceToken: paymentIntent?.client_secret || '',
                completed: true,
            });

            return paymentIntent;
            // ============================================================================== //
        }
    };

    const handlePaymentMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentType(event.target.value)
    }

    const getPaymentLabel = (label: string) => {
       switch (label) {
           case PaymentType.STRIPE:
               return 'Pay with a Credit Card';

           default:
               return 'Cash on Delivery';
       }
    }

    const onSubmit = () => {
        switch (paymentType) {
            case PaymentType.STRIPE:
                handleSubmit()
                    .then((response) => {

                    })
                    .catch(error => console.log(error));
                break;

            default:
                onPaymentInfoChange({
                    isPaid: false,
                    currency,
                    transactionNumber: 'cash-trn-' + commonService.randomString(16, 'aA#'),
                    referenceToken: 'cash-tkn-' + commonService.randomString(16, 'aA#'),
                    completed: true,
                });
                break;
        }

    }

    return (
        <Box className="w-full">

            <FormControl>
                <FormLabel id="payment-method">Payment Method</FormLabel>
                <RadioGroup
                    aria-labelledby="payment-method"
                    name="payment-method"
                    value={paymentType}
                    onChange={handlePaymentMethod}
                >
                    {/*<FormControlLabel value={} control={<Radio />} label="Female" />*/}
                    {/*<FormControlLabel value="male" control={<Radio />} label="Male" />*/}
                    {
                        Object.keys(PaymentType).map((payment, key) => (
                            <FormControlLabel
                                key={key}
                                value={PaymentType[payment]}
                                control={<Radio color="secondary" />}
                                label={getPaymentLabel(PaymentType[payment])} />
                        ))
                    }
                </RadioGroup>
            </FormControl>

            {paymentType === PaymentType.STRIPE && <PaymentElement/>}
            <WizardControls nextAction={onSubmit}/>
            {
                errorMessage &&
                <FormHelperText
                    sx={{
                        color: 'error.main',
                        marginLeft: '8px',
                        marginRight: '8px',
                    }}
                >
                    {errorMessage}
                </FormHelperText>
            }
        </Box>
    );
};
