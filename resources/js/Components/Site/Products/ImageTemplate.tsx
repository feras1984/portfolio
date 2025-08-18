import React from 'react';
import Product from "@/models/product/Product";
import styles from "@/Components/Site/Products/Cart/styles.module.scss";
import {Avatar, CardHeader} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import ProductService from "@/Services/ProductService/ProductService";
import CommonService from "@/Services/CommonService/CommonService";

const ImageTemplate: React.FC<{product: Product}> = ({product}) => {
    const commonService = ServiceContainer.get(CommonService);
    const productService = ServiceContainer.get(ProductService);
    return (
        <CardHeader
            classes={{
                title: styles.titleStyle
            }}
            avatar={
                <Avatar
                    sx={{ bgcolor: grey[500] }}
                    aria-label="recipe"
                    alt={productService.getProductName(product)}
                    src={`/file/products/${product.images[0].url}`}
                >
                </Avatar>
            }
            title={productService.getProductName(product)}
            subheader={commonService.currencyFormat(product.sellPrice)}
        />
    );
};

export default ImageTemplate;
