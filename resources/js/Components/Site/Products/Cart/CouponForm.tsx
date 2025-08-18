import React from 'react';
import {Box, FormHelperText, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {z} from "zod";
import {Container as ServiceContainer} from "typedi";
import CouponService from "@/Services/CouponService/CouponService";
import {AxiosError} from "axios";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {setCoupon, clearCoupon} from "@/Redux/Reducers/CouponSlice/CouponSlice";

const CouponForm = () => {
    const couponService = ServiceContainer.get(CouponService);
    const [code, setCode] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const ref = React.useRef<HTMLInputElement>(null);
    const coupon = useAppSelector(state => state.coupon);
    const dispatch = useAppDispatch();
    const handleCoupon = () => {

        const formData = new FormData();
        formData.append('code', ref.current?.value as string);
        couponService.checkCoupon(formData).then(response => {
            if (response.data) {
                dispatch(setCoupon(response.data));
            }
            setError('');
        }).catch((error: AxiosError) => {
            switch (error?.response?.status) {
                case 404:
                    setError('Coupon is not exist');
                    break;
                case 400:
                    setError('Coupon is expired!')
                    break;
                default:
                    setError('Error happened!')
                    break;
            }
        })
    }
    return (
        <Box>
            {coupon.amount === 0 &&
            <Box className="pb-[16px]">

                    <TextField
                        variant="standard"
                        color="secondary"
                        fullWidth
                        label="Enter your coupon"
                        id="coupon"
                        placeholder="Coupon"
                        name="coupon"
                        inputRef={ref}
                        size="small"
                        // multiline={multiline}
                        // rows={rows}
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
                        // }}
                        error={Boolean(error)}
                        onBlur={handleCoupon}
                        inputProps={{
                            form: {
                                autocomplete: 'off',
                            },
                        }}

                        required
                    />

                {error.length > 0 && <FormHelperText
                    sx={{
                        color: 'error.main',
                        marginLeft: '8px',
                        marginRight: '8px',
                    }}
                >
                    {error}
                </FormHelperText>}
            </Box>}
        </Box>
    );
};

export default CouponForm;
