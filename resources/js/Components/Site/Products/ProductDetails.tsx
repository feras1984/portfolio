import React from 'react';
import LocaleProduct from "@/models/product/LocaleProduct";
import styles from "./styles.module.scss";
import {
    Box,
    Card, CardContent, Typography,
    Container,
    Stack,
    Paper,
    Button,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ProductAlbum from "@/Components/Site/Products/ProductAlbum";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import CommonService from "@/Services/CommonService/CommonService";
import ProductService from "@/Services/ProductService/ProductService";
import ProductRating from "@/Components/Site/Products/ProductRating";
import ProductLike from "@/Components/Site/Products/ProductLike";
import ProductBookmark from "@/Components/Site/Products/ProductBookmark";
import ReviewContainer from "@/Components/Site/Products/ProductReview/ReviewContainer";
import CounterContainer from "@/Components/Site/Products/Counter/CounterContainer";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {addToCart, replaceQuantity} from "@/Redux/Reducers/CartSlice/CartSlice";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import {ICartProduct} from "@/Interfaces/Site/Product/Cart";
import ProductPrice from "@/Components/Site/Products/ProductPrice";
import OfferBadge from "@/Components/Site/Products/OfferBadge/OfferBadge";
import ProductRateAverage from "@/Components/Site/Products/ProductRateAverage";

const ProductDetails: React.FC<{product: LocaleProduct}> = ({product}) => {
    const commonService = ServiceContainer.get(CommonService);
    const productService = ServiceContainer.get(ProductService);
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.cart.cart);
    const [item, setItem] = React.useState<ICartProduct | null>(null);

    const [quantity, setQuantity] = React.useState(
        items.find(item => item.product.id === product.id)?.quantity || 0
    );

    const handleQuantityChange = (qnt: number) => {
        if (item && (item.quantity === qnt || qnt === 0)) return;
        setQuantity(qnt);
        dispatch(replaceQuantity({quantity: qnt, product, price: productService.getPrice(product)}));
        setSnackbar(snackbarState =>
            ({ ...snackbarState, open: true, message: `${product.name} has been added to cart!`, severity: "success" })
        );
    }

    React.useMemo(() => {
        const itm = items.find(item => item.product.id === product.id);
        setItem(itm || null);
        setQuantity(itm?.quantity || 0);
    }, [items]);

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    return (
        <Box className="p-[16px] flex justify-center">
            <Card
                sx={{maxWidth: '500px', minWidth: '315px', width: '75%', height: 'fit-content'}}
                  className={styles.cardBoxShadow}
            >
                <Box className="relative">
                    <ProductAlbum album={product.images} productName={product.name}></ProductAlbum>
                    {product.offer && <OfferBadge offer={product.offer}></OfferBadge>}
                    {product.average > 2 && <Box className="p-0 m-0 absolute left-0 bottom-0 z-50">
                        <ProductRateAverage product={product}/>
                    </Box>}
                </Box>

                <CardContent>
                    <Box className="flex justify-start items-center">

                        <Typography gutterBottom variant="h6" component="div" className="basis-full">
                            {product.name}
                        </Typography>
                        <Box>
                            <ProductLike product={product}></ProductLike>
                        </Box>
                        <Box>
                            <ProductBookmark product={product}></ProductBookmark>
                        </Box>
                    </Box>

                    {/*<Box className="my-[16px]">*/}
                    {/*    <p className="font-bold">{commonService.currencyFormat(product.sellPrice, 'AED')}</p>*/}
                    {/*    <ProductRating productId={product.id}></ProductRating>*/}
                    {/*</Box>*/}
                    <ProductPrice product={product}></ProductPrice>
                    <ProductRating product={product}></ProductRating>

                    <Paper elevation={4} className="p-[16px]">
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                        >
                            <CounterContainer
                                max={product.count}
                                onChange={handleQuantityChange}
                                quantity={quantity}
                            ></CounterContainer>
                            <Typography component='p' variant='body2'>
                                <strong>Total Price:&nbsp;</strong>
                                {commonService.currencyFormat(quantity * productService.getPrice(product))}
                            </Typography>
                            {/*<Button*/}
                            {/*    dir="ltr"*/}
                            {/*    className="my-[8px]"*/}
                            {/*    size="small"*/}
                            {/*    variant="contained"*/}
                            {/*    color="secondary"*/}
                            {/*    startIcon={<AddIcon/>}*/}
                            {/*    onClick={handleAddToCart}*/}
                            {/*    disabled={product.count <= 0}*/}
                            {/*>*/}
                            {/*    <Typography variant={'body2'}>Add To Cart</Typography>*/}
                            {/*</Button>*/}
                        </Stack>
                    </Paper>

                    <Box className="my-[16px]">
                        <Typography variant="body2" color="text.secondary"
                                    dangerouslySetInnerHTML={{__html: product.description}}>
                        </Typography>
                    </Box>

                    <Typography gutterBottom variant="h5" component="div" className="basis-full">
                        Reviews
                    </Typography>

                    <ReviewContainer productId={product.id} reviews={product.reviews} />

                </CardContent>
            </Card>

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </Box>

    );
};

export default ProductDetails;
