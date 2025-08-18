import React from 'react';
import styles from "./styles.module.scss"
import LocaleProduct from "@/models/product/LocaleProduct";
import File from "@/models/files/File";
import {Link, usePage} from "@inertiajs/react";
import {
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import CommonService from "@/Services/CommonService/CommonService";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {addToCart} from "@/Redux/Reducers/CartSlice/CartSlice";
import ProductRating from "./ProductRating";
import ProductLike from "./ProductLike";
import ProductBookmark from "./ProductBookmark";
import ProductPrice from "./ProductPrice";
import OfferBadge from "@/Components/Site/Products/OfferBadge/OfferBadge";
import ProductService from "@/Services/ProductService/ProductService";
import {useSwiperContext} from "@/Pages/Site/Home/Swiper/SwiperContext";
import ProductRateAverage from "@/Components/Site/Products/ProductRateAverage";

const ProductCard: React.FC<{ product: LocaleProduct }> =
    ({product}) => {
    const commonService = ServiceContainer.get(CommonService);
    const productService = ServiceContainer.get(ProductService);
    const [coverImage, setCoverImage] = React.useState<File>(new File({}))
    // const coverImage = (product as LocaleProduct).images
    //     .find(img => img.isCover = true) || new File({});
    const dispatch = useAppDispatch();
    const {lang} = usePage().props;

    const {handleProduct} = useSwiperContext();

    React.useMemo(() => {
        setCoverImage(product.images.find(img => img.isCover = true) ||
            new File({}))
    }, [product])

    const handleAddToCart = React.useCallback(() => {
        dispatch(addToCart({quantity: 1, product, price: productService.getPrice(product)}));
    }, []);

    return (
        <Box className="p-[16px]">
            <Card sx={{ maxWidth: 300 }} className={styles.cardBoxShadow}>
                {/*<Link href={`/${lang}/product/${product.id}`}>*/}
                {/*    <Box className="relative">*/}
                {/*        <CardMedia*/}
                {/*            sx={{ width: 300, height: 194 }}*/}
                {/*            image={`/file/products/${coverImage.url}`}*/}
                {/*            title="green iguana"*/}
                {/*        />*/}
                {/*        {product.offer && <OfferBadge offer={product.offer}></OfferBadge>}*/}
                {/*        /!*<Box component="div" className={styles.shadowLayer}></Box>*!/*/}
                {/*    </Box>*/}

                {/*</Link>*/}
                <Box className="relative">
                    <CardMedia
                        sx={{ width: 300, height: 194 }}
                        image={`/file/products/${coverImage.url}`}
                        title="green iguana"
                    />
                    {product.offer && <OfferBadge offer={product.offer}></OfferBadge>}
                    {product.average > 2 && <Box className="p-0 m-0 absolute left-0 bottom-0">
                        <ProductRateAverage product={product}/>
                    </Box>}
                    {/*<Box component="div" className={styles.shadowLayer}></Box>*/}
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" noWrap className={styles.fontWeightBold}>
                        {product.name}
                    </Typography>
                    {/*<Typography variant="body2" color="text.secondary"*/}
                    {/*            dangerouslySetInnerHTML={{__html: product.description}}>*/}
                    {/*</Typography>*/}
                    <ProductPrice product={product}></ProductPrice>
                    <Box className="flex justify-start items-center">
                        <Box className="basis-full">
                            <Box className="my-[16px]">
                                {/*<p className="font-bold">{commonService.currencyFormat(product.sellPrice, 'AED')}</p>*/}

                                <ProductRating product={product}></ProductRating>
                            </Box>
                        </Box>

                        <Box>
                            <ProductLike product={product}></ProductLike>
                        </Box>
                        <Box>
                            <ProductBookmark product={product}></ProductBookmark>
                        </Box>
                    </Box>

                </CardContent>
                <CardActions>
                    <Link href={`/product/${product.id}`}>
                        <Button
                            size="small"
                            color="secondary"
                        >More Details</Button>
                    </Link>

                    <Button
                        size="small"
                        color="secondary"
                        onClick={handleAddToCart}
                    >Add To Cart</Button>
                </CardActions>
            </Card>
        </Box>

    );
};

export default ProductCard;
