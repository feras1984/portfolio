import React from 'react';
import LocaleProduct from "@/models/product/LocaleProduct";
import StarRateIcon from "@mui/icons-material/StarRate";
import {Box} from "@mui/material";

const ProductRateAverage: React.FC<{product: LocaleProduct}> = ({product}) => {
    return (
        <Box className="flex justify-start items-center gap-1 px-[3px]" sx={{bgcolor: 'rgba(0,0,0,0.5)', color: 'background.default'}}>
            <StarRateIcon sx={{color: '#faaf00'}}/> {product.average}
        </Box>
    );
};

export default ProductRateAverage;
