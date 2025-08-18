import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@mui/material";
import {useCounterContext} from "../Context/CounterContext";
import {IconButtonOwnProps} from "@mui/material/IconButton/IconButton";

const Increase: React.FC<IconButtonOwnProps> = ({...props}) => {
    const {increment} = useCounterContext();
    return (
        <IconButton
            {...props}
            onClick={increment}
        >
            <AddIcon />
        </IconButton>
    );
};

export default Increase;
