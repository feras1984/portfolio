import React from 'react';
import {useOrderWizardContext} from "../../Context/OrderWizardContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
const WizardControls: React.FC<{
    nextAction: () => void,
    disabled?: boolean,
    needsLoading?: boolean,

}> = ({nextAction, disabled = false, needsLoading = true}) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const {
        steps,
        activeStep,
        isStepOptional,
        isStepSkipped,
        skipped,
        handleSkip,
        handleReset,
        handleNext,
        handleBack,
    } = useOrderWizardContext();

    const onClickNextBtn = () => {
        setLoading(true);
        // handleNext();
        if (nextAction !== undefined) nextAction();
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, maxWidth: '500px', margin: 'auto' }}>
            <Button
                color="info"
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional && isStepOptional(activeStep) && (
                <Button color="info" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                </Button>
            )}
            <LoadingButton
                loading={needsLoading ? loading : false}
                onClick={onClickNextBtn}
                color="secondary"
                variant="contained"
                disabled={disabled}
            >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </LoadingButton>
        </Box>
    );
};

export default WizardControls;
