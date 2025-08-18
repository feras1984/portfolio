import React, {PropsWithChildren} from "react";
import {number} from "zod";
import IOrderInfo, {IItemInfo, IBillingInfo, IPaymentInfo} from "@/Interfaces/Site/Order/IOrderInfo";

const initialValues: IOrderInfo = {
    steps: [] as string [],
    activeStep: 0,
    handleBack(): void {},
    handleNext(): void {},
    handleReset(): void {},
    handleSkip(): void {},
    isStepOptional(step: number): boolean { return false},
    isStepSkipped(step: number): boolean { return false},
    skipped: new Set<number>(),
    // items: [] as IItemInfo [],
    billing: {
        name: '',
        email: '',
        mobile: '',
        addressDetails: '',
        buildingName: '',
        floorNumber: '',
    } as IBillingInfo,
    payment: {
        isPaid: false,
        currency: '',
        transactionNumber: '',
        referenceToken: '',
    } as IPaymentInfo,

    onBillingInfoChange: (data: IBillingInfo) => {},
    onPaymentInfoChange: (data: IPaymentInfo) => {},

    sendOrder: () => {},
}

const OrderWizardContext = React.createContext(initialValues);

const OrderWizardProvider: React.FC<PropsWithChildren<{ value: IOrderInfo }>> = ({value, children}) => {
    return <OrderWizardContext.Provider value={value}>{children}</OrderWizardContext.Provider>
}

const useOrderWizardContext = () => {
    const context = React.useContext(OrderWizardContext);
    if (context === undefined) {
        throw new Error('The context must be inside the provider!');
    }

    return context;
}

export {useOrderWizardContext, OrderWizardProvider};
