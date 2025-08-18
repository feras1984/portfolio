import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import {IconButton} from "@mui/material";
import {useCounterContext} from "../Context/CounterContext";
import {IconButtonOwnProps} from "@mui/material/IconButton/IconButton";
const Decrease: React.FC<IconButtonOwnProps> = ({...props}) => {
    const {decrement} = useCounterContext();
    // const handleDecrement = () => decrement();
    return (
        <IconButton
            {...props}
            onClick={decrement}
        >
            <RemoveIcon />
        </IconButton>
    );
};

export default Decrease;
