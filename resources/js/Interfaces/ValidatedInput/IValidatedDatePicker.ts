import {DatePickerProps, DatePickerSlotsComponentsProps} from "@mui/x-date-pickers/DatePicker/DatePicker.types";
import {FieldValues, UseFormReturn} from "react-hook-form";

interface IValidatedDatePicker<T extends FieldValues> extends DatePickerProps<T>{
    methods: UseFormReturn<T, any>,
    controlName: string;
    label: string,
    color?: string,
}

export default IValidatedDatePicker;
