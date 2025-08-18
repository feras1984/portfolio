import React, {FormEventHandler, useEffect} from "react";
import styles from "./styles.module.scss";
import {
    Box,
    Button, Checkbox,
    FormControl, FormControlLabel,
    FormHelperText,
    InputLabel,
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {z} from "zod";
import {EmailRounded, LockRounded, Visibility, VisibilityOff} from "@mui/icons-material";
import Input from "@mui/material/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, SubmitHandler, Controller, FormProvider} from "react-hook-form";
import {Link, router, usePage} from "@inertiajs/react";
import {useForm as formHandler} from "@inertiajs/react";
import "reflect-metadata";

const LoginForm = ({ status, canResetPassword }: { status?: string, canResetPassword: boolean}) => {
    const {data, setData, post, processing, errors, reset} = formHandler({
        email: '',
        password: '',
        remember: false,
    });

    const lang = usePage().props.lang;

    // const emailInput = document.getElementById('email');
    // if (emailInput) {
    //     emailInput.addEventListener('change', (e: any) => {
    //         errors.email = '';
    //         setData('email', e.target.value)
    //     });
    // }
    //
    // const passwordInput = document.getElementById('password');
    // if (passwordInput) {
    //     errors.password = '';
    //     passwordInput.addEventListener('change', (e: any) => {
    //         setData('password', e.target.value)
    //     });
    // }
    //
    // const rememberInput = document.getElementById('remember');
    // if (rememberInput) {
    //     rememberInput.addEventListener('change', (e: any) => {
    //         setData('remember', e.target.value)
    //     });
    // }

    // document.addEventListener('change', )

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        remember: z.boolean(),
    });

    type LoginSchemaType = z.infer<typeof loginSchema>;

    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        }
    });
    const onSubmit:  SubmitHandler<LoginSchemaType> = async (formData) => {
        await post(`/${lang}/login`);
    }

    useEffect(() => {
        return () => {
            reset('password');
            methods.reset({
                password: "",
            })
        };
    }, []);

    React.useMemo(() => {
        setData({...data,
            email: methods.getValues('email'),
            password: methods.getValues('password'),
            remember: methods.getValues('remember'),
        })
    }, [methods])

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
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
                                <InputLabel htmlFor="email" color="secondary">
                                    Email
                                </InputLabel>
                                <Input
                                    color="secondary"
                                    id="email"
                                    placeholder="example@email.com"
                                    name="email"
                                    inputProps={{
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }}
                                    autoComplete="new-password"
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
                                    {(errors.email || error?.message) ?? ''}
                                </FormHelperText>
                                {/*<InputError message={errors.email} className="mt-2" />*/}
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
                                <InputLabel htmlFor="password" color="secondary">
                                    Password
                                </InputLabel>
                                <Input
                                    color="secondary"
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    inputProps={{
                                        form: {
                                            autocomplete: 'off',
                                        },
                                    }}
                                    autoComplete="new-password"
                                    required
                                    inputRef={ref}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        setData('password', e.target.value)
                                    }}
                                    onBlur={onBlur}
                                    error={Boolean(error)}
                                    type="password"
                                />
                                <FormHelperText
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {(errors.password || error?.message)?? ''}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                    )}
                />

                <Controller
                    name="remember"

                    control={methods.control}
                    render={({
                                 field: { value, onChange, onBlur, ref },
                                 fieldState: { error },
                             }) => (
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                            <FormControlLabel
                                required
                                control={
                                    <Checkbox
                                        name="remember"
                                        id="remember"
                                        color="secondary"
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={(e) => {
                                            onChange(e);
                                            setData('remember', e.target.checked)
                                        }}
                                        onBlur={onBlur}
                                />}
                                label="Remember me" />
                        </Box>
                    )}
                />

                <div className="flex content-start items-center mt-3">
                    {canResetPassword && <Link
                        href={route('password.request')}
                        className="underline mx-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none"
                    >
                        Forgot your password?
                    </Link>}
                </div>

                <div className="flex justify-between items-center mt-3">
                    <Link
                        href={route('register')}
                        className="underline mx-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none"
                    >
                        Create new Account!
                    </Link>

                    <LoadingButton
                        type="submit"
                        variant="outlined"
                        // disabled={processing}
                        color="secondary"
                        loading={processing}
                    >Login</LoadingButton>
                </div>
            </Box>
        </FormProvider>

    );
}

export default LoginForm;
