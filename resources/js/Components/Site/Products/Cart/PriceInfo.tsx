import React from 'react';
import {Box, Typography} from "@mui/material";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import CommonService from "@/Services/CommonService/CommonService";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";

const PriceInfo: React.FC<{totalPrice: number}> = ({totalPrice}) => {
    const commonService = ServiceContainer.get(CommonService);
    const coupon = useAppSelector(state => state.coupon);
    const [discount, setDiscount] = React.useState<number>(0);
    React.useMemo(() => {
        setDiscount(coupon.isPercent ? totalPrice * coupon.amount / 100 : coupon.amount);
    }, [coupon]);
    return (
        <Box className="w-full">
            <Box className="flex justify-between items-center">
                <Typography component="h5" variant="body1" sx={{width: 100, fontWeight: 700}}>Net Price</Typography>
                <Typography component="p" variant="body1" className="basis-full text-end" >
                    {commonService.currencyFormat(totalPrice)}
                </Typography>
            </Box>

            <Box className="flex justify-between items-center">
                <Typography component="h5" variant="body1" sx={{width: 100, fontWeight: 700}}>Discount</Typography>
                <Typography component="p" variant="body1" className="basis-full text-end" >
                    {commonService.currencyFormat(discount)}
                </Typography>
            </Box>

            <Box className="flex justify-between items-center">
                <Typography component="h5" variant="body1" sx={{width: 100, fontWeight: 700}}>Total</Typography>
                <Typography component="p" variant="body1" className="basis-full text-end" >
                    {commonService.currencyFormat(totalPrice - discount)}
                </Typography>
            </Box>
        </Box>
    );
};

export default PriceInfo;
