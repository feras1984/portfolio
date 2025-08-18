import React, {useMemo} from 'react';
import LocaleProduct from "@/models/product/LocaleProduct";
import ProductCard from "@/Components/Site/Products/ProductCard";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import ProductService from "@/Services/ProductService/ProductService";

import {Stack, Box, Skeleton, Typography} from "@mui/material";
import {usePage} from "@inertiajs/react";
import {ProductListProvider} from "@/Contexts/ProductListContext/ProductListContext";
import LoadingComponent from "@/Contexts/ProductListContext/Components/LoadingComponent";
import ListComponent from "@/Contexts/ProductListContext/Components/ListComponent";

const ProductList: React.FC<{count: number, categoryId?: number}> = ({count, categoryId}) => {
    const productService = ServiceContainer.get(ProductService);
    const [products, setProducts] = React.useState<LocaleProduct []>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [offset, setOffset] = React.useState<number>(0);
    const [scrollY, setScrollY] = React.useState<number>(window.scrollY);
    const lang = usePage().props.lang;
    const [args, setArgs] = React.useState<{key: string, value: any} []>(
        [{
            key: 'limit', value: 3,
        },
            {
                key: 'offset', value: offset,
            }]
    );



    useMemo(() => {
        if (categoryId) {
            setArgs([...args, {key: 'categoryId', value: categoryId}]);
        }
    }, [categoryId])

    const fetchProducts = () => {
        if (products.length < count) {
            productService.getLocaleProducts(lang, ...args
            ).then(response => {
                setLoading(false);
                setOffset(offset + 3);
                setArgs([...args, {key: 'offset', value: offset + 3}])
                setProducts([...products, ...response.data]);
            });
        } else {
            setLoading(false);
        }
    }

    const handleScroll = React.useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.scrollHeight - 200 &&
            !loading
        ) {

            setTimeout(() => {
                if (scrollY < window.scrollY) {
                    setLoading(true);
                    setScrollY(window.scrollY);
                    fetchProducts();
                }
            }, 50);

        }
    }, [loading]);

    React.useEffect(() => {
        if (!loading && products.length < count) {
            setTimeout(() => {
                window.addEventListener("scroll", handleScroll);
            })
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [loading]);

    React.useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <Box>
            {
                loading && <Box className="pt-[16px]">
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        sx={{flexWrap: "wrap"}}
                    >
                        {
                            [1, 2, 3, 4, 5, 6].map((item, index) => (
                                <Box key={index}>
                                    <Skeleton variant="rectangular" width={350} height={194} />
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                </Box>
                            ))
                        }

                    </Stack>
                </Box>
            }

            {
                <Box>
                    {
                        products.length === 0 ?
                            <Box className="p-[16px]">
                                <Typography variant="h5" component="h5" align="center">No Products Found</Typography>
                            </Box>
                            :
                            <ProductListProvider value={{loading, products}}>
                                <LoadingComponent />
                                <ListComponent />
                            </ProductListProvider>
                    }
                </Box>
            }

            {/*{loading ?*/}
            {/*    <Box className="pt-[16px]">*/}
            {/*        <Stack*/}
            {/*            direction="row"*/}
            {/*            spacing={2}*/}
            {/*            justifyContent="center"*/}
            {/*            alignItems="center"*/}
            {/*            sx={{flexWrap: "wrap"}}*/}
            {/*        >*/}
            {/*            {*/}
            {/*                [1, 2, 3, 4, 5, 6].map((item, index) => (*/}
            {/*                    <Box key={index}>*/}
            {/*                        <Skeleton variant="rectangular" width={350} height={194} />*/}
            {/*                        <Skeleton variant="circular" width={40} height={40} />*/}
            {/*                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />*/}
            {/*                    </Box>*/}
            {/*                ))*/}
            {/*            }*/}

            {/*        </Stack>*/}
            {/*    </Box>*/}
            {/*    :*/}
            {/*    <Box>*/}
            {/*        {*/}
            {/*            products.length === 0 ?*/}
            {/*                <Typography variant="body2" component="p" align="center">No Products Found</Typography>*/}
            {/*                :*/}
            {/*                <ProductListProvider value={{loading, products}}>*/}
            {/*                    <LoadingComponent />*/}
            {/*                    <ListComponent />*/}
            {/*                </ProductListProvider>*/}
            {/*        }*/}
            {/*    </Box>*/}


            {/*}*/}
        </Box>

    );
};

export default ProductList;
