import React, {PropsWithChildren} from 'react';

interface ICounter {
    increment: () => void;
    decrement: () => void;
    value: number;
}

const initialValue: ICounter = {
    increment: () => {},
    decrement: () => {},
    value: 0,
}

const CounterContext = React.createContext(initialValue);

const CounterProvider: React.FC<PropsWithChildren<{ value: ICounter }>> = ({value, children}) => (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
)

const useCounterContext = () => {
    const context = React.useContext(CounterContext);
    if (context === undefined) {
        throw new Error('The context should be used inside the provider!');
    }

    return context;
}

export {useCounterContext, CounterProvider};
