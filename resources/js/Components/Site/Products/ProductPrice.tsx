import React from 'react';
import Product from "@/models/product/Product";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import CommonService from "@/Services/CommonService/CommonService";
import LocaleProduct from "@/models/product/LocaleProduct";
import {
    Box,
    Typography,
} from "@mui/material";
import styles from "@/Components/Site/Products/styles.module.scss";

const ProductPrice: React.FC<{product: LocaleProduct}> = ({product}) => {
    const commonService = ServiceContainer.get(CommonService);
    const calculateOfferPrice = () => {
        if (product.offer !== null) {
            if (product.offer.isPercent) return (product.sellPrice * (1 - product.offer.amount / 100));
            else return (product.sellPrice - product.offer.amount);
        } else return 0;
    }
    return (
        product.offer === null ?
            <Typography component="p" variant="body1">{commonService.currencyFormat(product.sellPrice, 'AED')}</Typography>
            :
            <Box className="flex justify-start items-center gap-2">
                <Typography className="line-through" component="p" variant="body2" sx={{color: '#DC0002'}}>
                    {commonService.currencyFormat(product.sellPrice, 'AED')}
                </Typography>
                <Typography component="p" variant="body1" className={styles.fontWeightBold}>
                    {commonService.currencyFormat(calculateOfferPrice(), 'AED')}
                </Typography>
            </Box>
    );
};

export default ProductPrice;
