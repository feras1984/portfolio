import React from 'react';
import styles from "./styles.module.scss";
import {ICartProduct} from "@/Interfaces/Site/Product/Cart";
import CommonService from "@/Services/CommonService/CommonService";
import ProductService from "@/Services/ProductService/ProductService";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import {
    Box,
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Typography,
    Stack,
    Divider,
    IconButton,

} from "@mui/material";
import {grey, red} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import CounterContainer from "@/Components/Site/Products/Counter/CounterContainer";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {addToCart, replaceQuantity, removeFromCart} from "@/Redux/Reducers/CartSlice/CartSlice";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";

const CartDetails: React.FC<{item: ICartProduct}> = ({item}) => {
    const commonService = ServiceContainer.get(CommonService);
    const productService = ServiceContainer.get(ProductService);
    const dispatch = useAppDispatch();

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const handleCounterChange = (qnt: number) => {
        if (item && (item.quantity === qnt || qnt === 0)) return;
        dispatch(replaceQuantity({
            quantity: qnt,
            product: item.product,
            price: productService.getPrice(item.product),
        }));
        setSnackbar(snackbarState =>
            ({ ...snackbarState, open: true, message: `${item.product.name} has been changed!`, severity: "success" })
        );
    }

    const handleRemoveCart = () => {
        dispatch(removeFromCart(item.product.id));
        setSnackbar(snackbarState =>
            ({ ...snackbarState, open: true, message: `${item.product.name} has been removed!`, severity: "success" })
        );
    }

    return (
        <Box className="relative">
            <IconButton
                className={styles.deleteButton}
                onClick={handleRemoveCart}
            >
                <DeleteIcon sx={{color: red[400]}}/>
            </IconButton>
            <CardHeader
                classes={{
                    title: styles.titleStyle
                }}
                avatar={
                    <Avatar
                        sx={{ bgcolor: grey[500] }}
                        aria-label="recipe"
                        alt={item.product.name}
                        src={`/file/products/${item.product.images[0].url}`}
                    >
                    </Avatar>
                }
                title={item.product.name}
                subheader={commonService.currencyFormat(item.price)}
            />
            <CardContent>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={2}
                >
                    <CounterContainer
                        max={item.product.count}
                        onChange={handleCounterChange}
                        quantity={item.quantity}
                    ></CounterContainer>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="body2" color="text.secondary">
                            <strong>Quantity </strong>
                        </Typography>

                        <Typography variant="body2" color="text.secondary">{`${item.quantity} item${item.quantity > 1 ? 's' : ''}`}</Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="body2" color="text.secondary">
                            <strong>Price </strong>
                        </Typography>

                        <Typography variant="body2" color="text.secondary">{commonService.currencyFormat(item.quantity * item.price)}</Typography>
                    </Stack>
                </Stack>
            </CardContent>

            <Divider variant="middle"></Divider>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>

    );
};

export default CartDetails;
