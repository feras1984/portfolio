import React from "react";
import {Increase, Decrease, Counter} from "./Components";
import {CounterProvider} from "./Context/CounterContext";
import {Box} from "@mui/material";
import {grey} from "@mui/material/colors";

const CounterContainer: React.FC<{max: number, onChange: (value: number) => void, quantity: number}> = ({max, onChange, quantity}) => {
    const increment = () => {
        onChange(quantity < max ? quantity + 1 : quantity);

    }

    const decrement = () => {
        onChange(quantity > 1 ? quantity -1 : quantity);
    }

    return (
        <CounterProvider value={{increment, decrement, value: quantity}}>
            <Box className="flex justify-center items-center rounded" sx={{backgroundColor: grey[200]}}>
                <Decrease disabled={quantity <= 0} />
                <Counter />
                <Increase disabled={quantity > max} />
            </Box>
        </CounterProvider>
    );
}

export default CounterContainer;
