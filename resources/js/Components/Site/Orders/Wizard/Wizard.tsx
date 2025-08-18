import React from 'react';
import styles from "./styles.module.scss";
import {CartContent, BillingInfo, PaymentMethod} from "./Steps";
import Box from '@mui/material/Box';
import Stepper, {StepperProps} from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {OrderWizardProvider} from "../Context/OrderWizardContext";
import IOrderInfo, {IBillingInfo, IPaymentInfo} from "@/Interfaces/Site/Order/IOrderInfo";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {resetCart} from "@/Redux/Reducers/CartSlice/CartSlice";
import {styled} from "@mui/material/styles";
import {grey} from "@mui/material/colors";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import OrderService from "@/Services/OrderService/OrderService";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import {router, usePage} from "@inertiajs/react";

const steps = ['View Shopping Cart', 'Billing Information', 'Payment Methods'];


const Wizard = () => {
    const orderService = ServiceContainer.get(OrderService);
    const map = useAppSelector(state => state.map);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart.cart);
    const coupon = useAppSelector(state => state.coupon);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const lang = usePage().props.lang;

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const isStepOptional = (step: number) => {
        // return step === 1;
        return false;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // =============================================================================================
    // ================================== Stepper Theme ============================================
    const StepperStyle = styled(Stepper)<StepperProps>(({theme}) => (
        {
            "& .MuiSvgIcon-root.MuiStepIcon-root.Mui-active": { color: theme.palette.secondary.main },
            "& .MuiSvgIcon-root.MuiStepIcon-root.Mui-completed": { color: theme.palette.secondary.dark },
            "& .Mui-disabled .MuiStepIcon-root": { color: grey[500] }
        }
    ))
    // =============================================================================================

    // =============================================================================================
    // ================================== Order Business Logic Section =============================

    const items = useAppSelector(state => state.cart.cart);
    const [billingData, setBillingData] = React.useState<IBillingInfo>({
        name: '',
        email: '',
        mobile: '',
        addressDetails: '',
        buildingName: '',
        floorNumber: '',
        completed: false,
    });

    const [paymentData, setPaymentData] = React.useState<IPaymentInfo>({
        isPaid: false,
        currency: '',
        transactionNumber: '',
        referenceToken: '',
        completed: false,
    })

    const handleBillingChanges = (billingData: IBillingInfo) => {
        setBillingData({...billingData});
    }

    const handlePaymentChanges = (paymentData: IPaymentInfo) => {
        setPaymentData({...paymentData});
    }

    const sendOrder = () => {
        const formData = new FormData();
        formData.append('items', JSON.stringify(
            cart.map(item => (
                {productId: item.product.id, quantity: item.quantity, unitPrice: item.product.sellPrice,
                    currency: paymentData.currency, price: item.price, offer: item.product.offer}
            ))
        ));
        formData.append('billing', JSON.stringify(
            {...billingData, longitude: map.coordinates?.lng, latitude: map.coordinates?.lat}
        ));
        formData.append('payment', JSON.stringify(paymentData));

        formData.append('totalPrice', String(
            cart.reduce((acc, item) => acc + item.quantity * item.price , 0)
        ));
        // Check coupon:
        if (coupon.amount > 0) {
            formData.append('coupon', JSON.stringify(coupon));
        }

        orderService.storeOrder(formData).then((response) => {
            router.get(`/${lang}/profile`);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true,
                    message: 'Your order has been stored',
                    severity: "success" })
            );
            dispatch(resetCart());
        }).catch((error) => {
            console.log(error);
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while storing order!', severity: "error" })
            );
        });
    }

    // When Payment Data chenged (which is the last step, send the order!).
    React.useMemo(() => {
        if (billingData.completed && paymentData.completed && cart.length > 0) {
            sendOrder();
        }
    }, [paymentData])

    const WizardContent = () => {
        let WizardComponent: React.FC;
        switch (activeStep) {
            case 0:
                WizardComponent = CartContent;
                break;
            case 1:
                WizardComponent = BillingInfo;
                break;
            default:
                WizardComponent = PaymentMethod;
                break;
        }

        return (
            <Box className={styles.wizardContent}>
                <WizardComponent />
            </Box>
        );
    }

    // =============================================================================================

    return (
        <OrderWizardProvider value={{
            steps,
            billing: billingData,
            payment: paymentData,
            onBillingInfoChange: handleBillingChanges,
            onPaymentInfoChange: handlePaymentChanges,
            activeStep,
            skipped,
            isStepOptional,
            isStepSkipped,
            handleNext,
            handleBack,
            handleSkip,
            handleReset,
            sendOrder,
        }}>
            <Box sx={{ width: '100%' }}>
                <StepperStyle activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </StepperStyle>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <WizardContent />
                    </React.Fragment>
                )}
            </Box>

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </OrderWizardProvider>

    );
};

export default Wizard;
