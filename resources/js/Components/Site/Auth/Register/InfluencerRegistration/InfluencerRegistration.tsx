import React, {useEffect, useState} from "react";
import styles from "styles.module.scss";
import {Box, Button, FormControl, InputLabel, FormHelperText, InputAdornment, IconButton} from "@mui/material";
import {z} from "zod";
import {useForm, SubmitHandler, Controller, FormProvider} from "react-hook-form";
import {AccountCircle, Visibility, VisibilityOff, EmailRounded, LockRounded} from "@mui/icons-material";
import Input from '@mui/material/Input';
import { zodResolver } from "@hookform/resolvers/zod";
import {Link} from "@inertiajs/react";
import {useForm as formHandler} from "@inertiajs/react";
import { router } from '@inertiajs/react'
import axios from "axios";

import EmailValidationService from "@/Services/EmailValidationService/EmailValidationService";
import "reflect-metadata";
import {Container} from "typedi";


const InfluencerRegistration = () => {
    const emailValidationService = Container.get(EmailValidationService);

    const InfluencerSchema = z.object({
        firstName: z.string().min(3, 'First name must be at least 3 characters'),
        lastName: z.string().min(3, 'Last name must be at least 3 characters'),
        email: z.string().email('Invalid Email Address').refine(async (value) => {
            const res = await emailValidationService.validateEmail(value);
            if (res.data.status) {
                return false;
            } return value;
        }, {
            message: "Email is already taken!"
        }),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        passwordConfirmation: z.string().min(8),
        type: z.string(),
    }).superRefine(({password, passwordConfirmation}, ctx) => {
        if (password !== passwordConfirmation) {
            ctx.addIssue({
                code: 'custom',
                message: "The passwords didn't match",
                path: ['passwordConfirmation'],
            });
        }
    });

    type InfluencerSchemaType = z.infer<typeof InfluencerSchema>;

    const methods = useForm<InfluencerSchemaType>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(InfluencerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            type: "influencer",
        },
    });

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = formHandler<InfluencerSchemaType>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        type: "",
    });

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

    const onSubmit: SubmitHandler<InfluencerSchemaType> = ( formData) => {
        router.post('register', formData);
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
                        name="firstName"
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
                                    <InputLabel htmlFor="firstName">
                                        First Name
                                    </InputLabel>
                                    <Input
                                        placeholder="John"
                                        name="firstName"
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={onChange}
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
                        name="lastName"
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
                                    <InputLabel htmlFor="lastName">
                                        Last Name
                                    </InputLabel>
                                    <Input
                                        placeholder="Doe"
                                        name="lastName"
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={onChange}
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
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={onChange}
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
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={onChange}
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
                        name="passwordConfirmation"
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
                                    <InputLabel htmlFor="passwordConfirmation">
                                        Confirm Password
                                    </InputLabel>
                                    <Input
                                        placeholder="Confirm Password"
                                        name="passwordConfirmation"
                                        required
                                        inputRef={ref}
                                        value={value}
                                        onChange={onChange}
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
                    <Button type="submit" variant="outlined" disabled={processing}>Register</Button>
                </div>

            </Box>
        </FormProvider>


    );
}

export default InfluencerRegistration;
