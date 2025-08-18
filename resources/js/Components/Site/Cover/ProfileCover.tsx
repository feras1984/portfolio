import React, {useRef, useEffect, useState} from 'react';
import {
    styled,
    Badge,
    Container,
    CardMedia,
    Box,
    Stack,
    IconButton,
} from "@mui/material";
import styles from "./styles.module.scss";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import UploadImage from "@/Components/UploadImage/UploadImage";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import FileService from "@/Services/FileService/FileService";
import ProfileService from "@/Services/ProfileService/ProfileService";
import {usePage} from "@inertiajs/react";
import {PageProps, User} from "@/types";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {getUser} from "@/Redux/Reducers/UserSlice/UserSlice";

const ProfileCover = () => {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    // const pageProps = usePage().props as PageProps;

    const coverRef = useRef<HTMLInputElement | null>(null);
    const photoRef = useRef<HTMLInputElement | null>(null);

    // const user = useAppSelector(state => state.user.user);

    // const user = usePage<PageProps>().props.auth.user as Influencer;
    const user = usePage<PageProps>().props.auth.user;
    const dispatch = useAppDispatch();

    // const [coverImage, setCoverImage] = useState<string | ArrayBuffer | null>(user.cover);
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(user.avatar);
    const [currentUser, setCurrentUser] = useState<User>(user);


    const fileService = ServiceContainer.get(FileService);
    const profileService = ServiceContainer.get(ProfileService);
    const clickCover = () => {
        coverRef.current?.click();
    }

    const clickPhoto = () => {
        photoRef.current?.click();
    }

    const getCover = (e: any) => {
        // fileService.convertBase64(e.target.files[0]).then(data => setCoverImage(data));
        const formData = new FormData();
        formData.append('cover', e.target.files[0]);
        // profileService.uploadCover(formData).then(data => {
        //     setCoverImage(data.data);
        //
        // })
    }

    const getAvatar = (e: any) => {
        // fileService.convertBase64(e.target.files[0]).then(data => setCoverImage(data));
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);
        profileService.uploadProfile(formData).then(data => {
            setProfileImage(data.data);
            setCurrentUser({...currentUser, avatar: data.data as string});
        })
    }

    useEffect(() => {
        dispatch(getUser(currentUser));
    }, [profileImage]);

    return(
        <Container
            maxWidth="xl"
            component="div"
            sx={{position: 'relative'}}
            className={styles.container}
        >
            {/*<CardMedia*/}
            {/*    classes={{*/}
            {/*        img: styles.mediaImg,*/}
            {/*    }}*/}
            {/*    component="img"*/}
            {/*    image="/images/users/cover-2.jpg"*/}
            {/*    alt="cover"*/}
            {/*/>*/}

            {/*<UploadImage image={coverImage as string} classes={styles.mediaImg}/>*/}

            {/*<Box className="absolute right-10 bottom-10 bg-white rounded-full cursor-pointer">*/}
            {/*    <IconButton onClick={clickCover}>*/}
            {/*        <EditIcon />*/}
            {/*    </IconButton>*/}

            {/*</Box>*/}

            {/*<input type="file" className="hidden" ref={coverRef} onChange={getCover}/>*/}

            <Box className={styles.logo}>
                <Box className="relative w-full h-full">
                    {/*<CardMedia*/}
                    {/*    component="img"*/}
                    {/*    image="/images/users/img.jpg"*/}
                    {/*    alt="photo"*/}
                    {/*    className="absolute"*/}
                    {/*/>*/}
                    <UploadImage image={profileImage as string} className="absolute" />

                    <Box className="absolute bottom-0 right-0">
                        <IconButton onClick={clickPhoto}>
                            <CameraAltIcon className={styles.cameraBadge}/>
                        </IconButton>
                    </Box>

                    <input type="file" className="hidden" ref={photoRef} onChange={getAvatar}/>
                </Box>
            </Box>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >

            </Stack>
        </Container>
    );
}

export default ProfileCover;
