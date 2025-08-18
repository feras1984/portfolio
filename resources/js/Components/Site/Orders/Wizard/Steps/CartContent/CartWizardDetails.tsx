import React from 'react';
import {ICartProduct} from "@/Interfaces/Site/Product/Cart";
import {
    Avatar,
    Box, CardHeader,
    Stack, Typography,
} from "@mui/material";
import {grey} from "@mui/material/colors";
import CommonService from "@/Services/CommonService/CommonService";
import ProductService from "@/Services/ProductService/ProductService";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import styles from "./styles.module.scss";

const CartWizardDetails: React.FC<{item: ICartProduct}> = ({item}) => {
    const commonService = ServiceContainer.get(CommonService);
    const productService = ServiceContainer.get(ProductService);
    return (
        <Box className="relative max-w-[500px]">
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Box className="basis-[200px]">
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ bgcolor: grey[500] }}
                                aria-label="recipe"
                                alt={item.product.name}
                                src={`/file/products/${item.product.images[0].url}`}
                            >
                            </Avatar>
                        }
                        classes={{
                            title: styles.titleStyle
                        }}
                        title={item.product.name}
                        subheader={commonService.currencyFormat(productService.getPrice(item.product))}
                    />
                </Box>

                <Box className="basis-[65px]">
                    <Typography variant="body2" color="text.secondary">{`${item.quantity} item${item.quantity > 1 ? 's' : ''}`}</Typography>
                </Box>

                <Box className="basis-[85px]">
                    <Typography variant="body2" color="text.secondary">{commonService.currencyFormatWithoutUnit(item.quantity * productService.getPrice(item.product))}</Typography>
                </Box>

            </Stack>
        </Box>
    );
};

export default CartWizardDetails;
