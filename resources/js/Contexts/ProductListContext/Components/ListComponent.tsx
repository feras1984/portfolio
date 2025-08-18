import React from 'react';
import {useProductListContext} from "@/Contexts/ProductListContext/ProductListContext";
import {Box, Stack} from "@mui/material";
import ProductCard from "@/Components/Site/Products/ProductCard";

const ListComponent = () => {
    const {products} = useProductListContext();
    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{flexWrap: "wrap"}}
        >
            {
                products.map((product, key) => {
                    return <Box key={key}>
                        <ProductCard product={product} ></ProductCard>
                    </Box>
                })
            }
        </Stack>
    );
};

export default ListComponent;
