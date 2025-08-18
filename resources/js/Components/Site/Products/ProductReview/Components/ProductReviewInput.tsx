import React from 'react';
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, FormProvider} from "react-hook-form";
import "reflect-metadata";
import {Container} from "typedi";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
import {Box, Stack} from "@mui/material";
import CustomButton from "@/Components/Button/CustomButton";

import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import ProductService from "@/Services/ProductService/ProductService";
import {usePage} from "@inertiajs/react";
import Review from "@/models/product/Review";
import {useProductReviewContext} from "@/Components/Site/Products/ProductReview/Context/ProductReviewContext";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import Typography from "@mui/material/Typography";

const ProductReviewInput: React.FC<{productId: number, review?: string}> = ({productId, review = ''}) => {
    const user = usePage().props.auth.user;
    const {reviewChanged} = useProductReviewContext();
    const productService = ServiceContainer.get(ProductService);
    const [loading, setLoading] = React.useState<boolean>(false);

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================
    const reviewSchema = z.object({
        review: z
            .string()
            .min(10, {message: "Description shouldn't be less than 10 characters!"})
            .max(160, {message: "Description shouldn't exceed 160 characters!"})
    });

    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            review,
        }
    });

    const onSubmit = () => {
        console.log(methods.getValues('review'));
        const formData = new FormData;
        formData.append('product_id', String(productId));
        formData.append('user_id', String(user.id));
        formData.append('review', methods.getValues('review'));
        setLoading(true);
        productService.review(formData)
            .then((response) => {
                reviewChanged(response.data);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Your comment is under review!', severity: "success" })
                );
            // setCurrentReview(methods.getValues('review'));
            setLoading(false);
        })
            .catch(() => {
                setLoading(false);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while storing review', severity: "error" })
                );
            });
    }

    return (
        <Box>
            {user === null &&
                <Typography variant="body2" sx={{color: 'deactivate.main'}}>Please login to add your review!</Typography>}
            <FormProvider {...methods}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <ValidatedInput
                        name={'review'}
                        controlName={'review'}
                        id={'1'}
                        label="What do you think about this product?"
                        multiline={true}
                        rows={4}>
                    </ValidatedInput>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                        className="m-[8px]"
                    >
                        <CustomButton
                            task="add"
                            text="review"
                            disabled={loading || user === null}
                        ></CustomButton>
                    </Stack>
                </Box>
            </FormProvider>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>
    );
};

export default ProductReviewInput;
