import React from "react";
import styles from "./styles.module.scss";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField
} from "@mui/material";
import {z} from "zod";
import {AccountCircle, EmailRounded, LockRounded, Visibility, VisibilityOff} from "@mui/icons-material";
import Input from "@mui/material/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, SubmitHandler, Controller, FormProvider} from "react-hook-form";
import {Link, usePage} from "@inertiajs/react";
import {useForm as formHandler} from "@inertiajs/react";
import { router } from '@inertiajs/react';
import EmailValidationService from "@/Services/EmailValidationService/EmailValidationService";
import {Container} from "typedi";
import "reflect-metadata";
import {useAppDispatch} from "@/Redux/Store/hook";
import {setSpinner} from "@/Redux/Reducers/SpinnerSlice/SpinnerSlice";
import {LoadingButton} from "@mui/lab";

const CustomerRegistration = () => {

    // const dispatch = useAppDispatch();
    // dispatch(setSpinner(false));

    const lang = usePage().props.lang;

    const emailValidationService = Container.get(EmailValidationService);

    const CustomerSchema = z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        // lastName: z.string().min(3, 'Last name must be at least 3 characters'),
        email: z.string()
            .email('Invalid Email Address')
            .refine(async (value) => {
                const res = await emailValidationService.validateEmail(value);
                if (res.data.status) return false;
                else return value;
            }, {
                message: "Email is already taken!",
            }),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        password_confirmation: z.string().min(8),
        type: z.string(),
    }).superRefine(({password, password_confirmation}, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: 'custom',
                message: "The passwords didn't match",
                path: ['password_confirmation'],
            });
        }
    });

    type CustomerSchemaType = z.infer<typeof CustomerSchema>;

    const methods = useForm<CustomerSchemaType>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(CustomerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            type: "normal",
        },
    });

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = formHandler<CustomerSchemaType>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: "normal",
    });

    React.useMemo(() => {
        setData('type', 'normal');
    }, [])

    const [showPassword, setShowPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickConfirmPassword = () => setConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit: SubmitHandler<CustomerSchemaType> = (formData) => {
        // router.post(`/${lang}/register`, formData);
        post(`/${lang}/register`);
    }

    return(
        <FormProvider {...methods}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div>

                    <Controller
                        name="name"
                        control={methods.control}
                        render={({
                                     field: { value, onChange, onBlur, ref },
                                     fieldState: { error },
                                 }) => (
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl
                                    variant="standard"
                                    sx={{flexGrow: 1}}
                                >
                                    <InputLabel htmlFor="name">
                                        Name
                                    </InputLabel>
                                    <Input
                                        placeholder="John Doe"
                                        name="name"
                                        color="secondary"
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            setData('name', e.target.value)
                                        }}
                                        onBlur={onBlur}
                                        error={Boolean(error)}
                                    />
                                    <FormHelperText
                                        sx={{
                                            color: 'error.main',
                                        }}
                                    >
                                        {error?.message ?? ''}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                        )}
                    />

                    <Controller
                        name="email"
                        control={methods.control}
                        render={({
                                     field: { value, onChange, onBlur, ref },
                                     fieldState: { error },
                                 }) => (
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                                <EmailRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl
                                    variant="standard"
                                    sx={{flexGrow: 1}}
                                >
                                    <InputLabel htmlFor="email">
                                        Email
                                    </InputLabel>
                                    <Input
                                        placeholder="example@email.com"
                                        name="email"
                                        color="secondary"
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            setData('email', e.target.value)
                                        }}
                                        onBlur={onBlur}
                                        error={Boolean(error)}
                                    />
                                    <FormHelperText
                                        sx={{
                                            color: 'error.main',
                                        }}
                                    >
                                        {error?.message ?? ''}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                        )}
                    />

                    <Controller
                        name="password"
                        control={methods.control}
                        render={({
                                     field: { value, onChange, onBlur, ref },
                                     fieldState: { error },
                                 }) => (
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                                <LockRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl
                                    variant="standard"
                                    sx={{flexGrow: 1}}
                                >
                                    <InputLabel htmlFor="password">
                                        Password
                                    </InputLabel>
                                    <Input
                                        placeholder="Password"
                                        name="password"
                                        color="secondary"
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            setData('password', e.target.value)
                                        }}
                                        onBlur={onBlur}
                                        error={Boolean(error)}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText
                                        sx={{
                                            color: 'error.main',
                                        }}
                                    >
                                        {error?.message ?? ''}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                        )}
                    />

                    <Controller
                        name="password_confirmation"
                        control={methods.control}
                        render={({
                                     field: { value, onChange, onBlur, ref },
                                     fieldState: { error },
                                 }) => (
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                                <LockRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl
                                    variant="standard"
                                    sx={{flexGrow: 1}}
                                >
                                    <InputLabel htmlFor="password_confirmation">
                                        Confirm Password
                                    </InputLabel>
                                    <Input
                                        placeholder="Confirm Password"
                                        name="password_confirmation"
                                        color="secondary"
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            setData('password_confirmation', e.target.value)
                                        }}
                                        onBlur={onBlur}
                                        error={Boolean(error)}
                                        type={confirmPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickConfirmPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                >
                                                    {confirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText
                                        sx={{
                                            color: 'error.main',
                                        }}
                                    >
                                        {error?.message ?? ''}
                                    </FormHelperText>
                                </FormControl>

                            </Box>
                        )}
                    />
                </div>

                <div className="flex justify-between items-center mt-3">
                    <Link
                        href={route('login')}
                        className="underline mx-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none"
                    >
                        Already registered?
                    </Link>
                    <LoadingButton
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        loading={processing}
                    >Register</LoadingButton>
                </div>

            </Box>
        </FormProvider>
    );
}

export default CustomerRegistration;
