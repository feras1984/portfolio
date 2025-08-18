import React, {FormEventHandler, useEffect} from "react";
import {
    Box,
    Button, Checkbox,
    FormControl, FormControlLabel,
    FormHelperText, IconButton, InputAdornment,
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {z} from "zod";
import {AccountCircle, EmailRounded, LockRounded, Visibility, VisibilityOff} from "@mui/icons-material";
import Input from "@mui/material/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, SubmitHandler, Controller, FormProvider} from "react-hook-form";
import {Link, router, usePage} from "@inertiajs/react";
import {useForm as formHandler} from "@inertiajs/react";
import "reflect-metadata";

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const ResetPwForm: React.FC<{email: string, token: string}> = ({email, token}) => {
    const { data, setData, post, processing, errors, reset } = formHandler({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const lang = usePage().props.lang;

    const ResetPWSchema = z.object({
        token: z.string(),
        email: z.string().email('Invalid Email Address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        password_confirmation: z.string().min(8),
    }).superRefine(({password, password_confirmation}, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: 'custom',
                message: "The passwords didn't match",
                path: ['password_confirmation'],
            });
        }
    });

    type ResetPWSchemaType = z.infer<typeof ResetPWSchema>;

    const methods = useForm<ResetPWSchemaType>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(ResetPWSchema),
        defaultValues: {
            token: token,
            email: email,
            password: "",
            password_confirmation: "",
        },
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

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

    const onSubmit: SubmitHandler<ResetPWSchemaType> = (formData) => {

        // post(route('password.store'));
        // router.post(`/${lang}/reset-password`, formData);
        post(`/${lang}/reset-password`);
    };

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);



    return (
        // <form onSubmit={submit}>
        //     <div>
        //         <InputLabel htmlFor="email" value="Email" />
        //
        //         <TextInput
        //             id="email"
        //             type="email"
        //             name="email"
        //             value={email}
        //             className="mt-1 block w-full"
        //             autoComplete="username"
        //             onChange={(e) => setData('email', e.target.value)}
        //         />
        //
        //         <InputError message={errors.email} className="mt-2" />
        //     </div>
        //
        //     <div className="mt-4">
        //         <InputLabel htmlFor="password" value="Password" />
        //
        //         <TextInput
        //             id="password"
        //             type="password"
        //             name="password"
        //             value={data.password}
        //             className="mt-1 block w-full"
        //             autoComplete="new-password"
        //             isFocused={true}
        //             onChange={(e) => setData('password', e.target.value)}
        //         />
        //
        //         <InputError message={errors.password} className="mt-2" />
        //     </div>
        //
        //     <div className="mt-4">
        //         <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
        //
        //         <TextInput
        //             type="password"
        //             name="password_confirmation"
        //             value={data.password_confirmation}
        //             className="mt-1 block w-full"
        //             autoComplete="new-password"
        //             onChange={(e) => setData('password_confirmation', e.target.value)}
        //         />
        //
        //         <InputError message={errors.password_confirmation} className="mt-2" />
        //     </div>
        //
        //     <div className="flex items-center justify-end mt-4">
        //         <PrimaryButton className="ml-4" disabled={processing}>
        //             Reset Password
        //         </PrimaryButton>
        //     </div>
        // </form>

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

                    <input type="hidden" {...methods.register('token')}/>

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
                                        // onChange={onChange}
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
                    >Reset Password</LoadingButton>
                </div>

            </Box>
        </FormProvider>
    );
};

export default ResetPwForm;
