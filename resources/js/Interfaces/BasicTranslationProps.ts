import {FieldValues, UseFormReturn} from "react-hook-form";

interface BasicTranslationProps<T extends FieldValues> {
    methods: UseFormReturn<T, undefined>,
    category: string,
    maxLength?: number,
}

export default BasicTranslationProps;
