import React from 'react';
import styles from "./styles.module.scss";
import {
    Box,
    FormHelperText,
    Stack,
    TextField
} from "@mui/material";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, Controller, FormProvider} from "react-hook-form";
import {Link, usePage} from "@inertiajs/react";
import "reflect-metadata";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import GoogleMap from "@/Components/Site/Map/GoogleMap";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import CustomButton from "@/Components/Button/CustomButton";
import {useOrderWizardContext} from "@/Components/Site/Orders/Context/OrderWizardContext";
import {WizardControls} from "@/Components/Site/Orders/Wizard/Steps/index";

const BillingInfo = () => {
    const user = usePage().props.auth.user;
    const {formatted_address} = useAppSelector(state => state.map.results[0]);

    const {onBillingInfoChange, handleNext, billing} = useOrderWizardContext();

    const CustomerSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email('Invalid Email'),
        mobile: z.string().min(9, 'Mobile is required'),
        addressDetails: z.string().min(9, 'Address Details Required!'),
        buildingName: z.string().min(3, 'Building Name Required!'),
        floorNumber: z.string().min(1, 'Floor Number Required!'),
    });

    type CustomerSchemaType = z.infer<typeof CustomerSchema>;

    const methods = useForm<CustomerSchemaType>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(CustomerSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            mobile: billing.mobile,
            addressDetails: formatted_address,
            buildingName: billing.buildingName,
            floorNumber: billing.floorNumber,
        },
    });

    const onSubmit = () => {
        onBillingInfoChange({
            name: methods.getValues('name'),
            email: methods.getValues('email'),
            mobile: methods.getValues('mobile'),
            addressDetails: methods.getValues('addressDetails'),
            buildingName: methods.getValues("buildingName"),
            floorNumber: methods.getValues("floorNumber"),
            completed: true,
        });
        handleNext();
    }

    return (
        //TODO: Add Network connection error in offline mode
        <Box className="p-[16px]">
            <GoogleMap></GoogleMap>
            <FormProvider {...methods}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    className="p-[16px] max-w-[500px] m-auto"
                    noValidate
                    autoComplete="off"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <ValidatedInput
                        controlName="name"
                        name="name"
                        id="name"
                        label="Name"
                        placeholder="John"
                        control={methods.control}
                        size="small"
                    />

                    <ValidatedInput
                        controlName="email"
                        name="email"
                        id="email"
                        label="Email"
                        placeholder="customer@example.com"
                        control={methods.control}
                        size="small"
                    />

                    <ValidatedInput
                        controlName="mobile"
                        name="mobile"
                        id="mobile"
                        label="Mobile Number"
                        placeholder="0505000000"
                        control={methods.control}
                        size="small"
                    />

                    <Controller
                        name="addressDetails"
                        control={methods?.control}
                        render={({
                                     field: { value, onChange, onBlur, ref },
                                     fieldState: { error },
                                 }) => (
                            <Box>
                                <TextField
                                    variant="filled"
                                    color="secondary"
                                    fullWidth
                                    label="addressDetails"
                                    id="addressDetails"
                                    placeholder="Address Details"
                                    name="addressDetails"
                                    inputProps={{
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }}

                                    required
                                    inputRef={ref}
                                    // defaultValue={value}
                                    value={formatted_address}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={Boolean(error)}
                                />

                                <FormHelperText
                                    sx={{
                                        color: 'error.main',
                                        marginLeft: '8px',
                                        marginRight: '8px',
                                    }}
                                >
                                    {(error?.message)}
                                </FormHelperText>
                            </Box>
                        )}
                    />

                    <ValidatedInput
                        controlName="buildingName"
                        name="buildingName"
                        id="buildingName"
                        label="Building Name"
                        placeholder="Durrah Building"
                        control={methods.control}
                        size="small"
                    />

                    <ValidatedInput
                        controlName="floorNumber"
                        name="floorNumber"
                        id="floorNumber"
                        label="Floor Number"
                        placeholder="504"
                        control={methods.control}
                        size="small"
                    />

                    {/*<Stack*/}
                    {/*    direction="row"*/}
                    {/*    justifyContent="flex-start"*/}
                    {/*    alignItems="center"*/}
                    {/*    spacing={2}*/}
                    {/*    className="m-[8px]"*/}
                    {/*>*/}
                    {/*    <CustomButton type="submit" task="add" text="Billing Info"></CustomButton>*/}
                    {/*    /!*<CustomButton task="delete" text="Coupon" onClick={handleOpenModal}></CustomButton>*!/*/}
                    {/*</Stack>*/}
                    <WizardControls nextAction={methods.handleSubmit(onSubmit)} needsLoading={false}/>

                </Box>
            </FormProvider>
        </Box>
    );
};

export default BillingInfo;
