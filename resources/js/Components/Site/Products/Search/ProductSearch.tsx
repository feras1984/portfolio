import React from 'react';
import styles from "./styles.module.scss";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import {Container as ServiceContainer} from "typedi";
import ProductService from "@/Services/ProductService/ProductService";
import CommonService from "@/Services/CommonService/CommonService";
import "reflect-metadata";
import LocaleProduct from "@/models/product/LocaleProduct";
import File from "@/models/files/File";
import {Link} from "@inertiajs/react";

interface Film {
    title: string;
    year: number;
}

function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

const ProductSearch = () => {
    const productService = ServiceContainer.get(ProductService);
    const commonService = ServiceContainer.get(CommonService);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly LocaleProduct []>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        await sleep(0.5e3);
        let active = true;

        if (event.target.value) {
            productService.searchProductByName(event.target.value).then((response) => {
                if (active) {
                    setOptions([...response.data]);
                }
            })
        }

        return () => {
            active = false;
        };
    }

    return (
        <Autocomplete
            id="search-product-component"
            className="basis-full py-0"
            sx={{ width: 250 }}
            size="small"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    sx={{padding: '0'}}
                    color="secondary"
                    {...params}
                    label="Search Product"
                    onChange={handleChange}
                    InputProps={{
                        sx: {padding: '0'},
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}

            renderOption={(props, option) => {
                const coverImg = option.images.find(img => img.isCover = true)
                    || new File({})
                return (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <Link href={`/product/${option.id}`}>
                            <CardHeader
                                sx={{padding: '0'}}
                                avatar={
                                    <Avatar
                                        sx={{ bgcolor: grey[500] }} aria-label={`prod-${option.id}`}
                                        alt={option.name}
                                        src={`/file/products/${coverImg.url}`}
                                    ></Avatar>
                                }
                                title={option.name}
                                subheader={commonService.currencyFormat(option.sellPrice)}
                            />
                        </Link>
                    </Box>
                );
            }
        }
        />
    );
};

export default ProductSearch;
