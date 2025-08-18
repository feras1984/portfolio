import React from 'react';
import {Typography} from "@mui/material";
import {useCounterContext} from "../Context/CounterContext";

const Counter = () => {
    const {value} = useCounterContext();
    return (
        <Typography component={'p'} variant={'body2'} align="center" sx={{width: '50px'}}>{value}</Typography>
    );
};

export default Counter;
