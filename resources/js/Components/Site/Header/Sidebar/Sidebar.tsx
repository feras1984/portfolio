import React from 'react';
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {setSiteSidebar} from "@/Redux/Reducers/SiteSidebar/SiteSidebarSlice";
import styles from "./styles.module.scss";
import {
    Container,
    Box,
    IconButton,
    Divider,
    Backdrop,
    Tooltip,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    Avatar,

} from "@mui/material";
import Icon from "@/Components/Icon/Icon";
import {usePage, router} from "@inertiajs/react";
import {styled} from "@mui/material/styles";
import LanguageMenu from "@/Components/Site/LanguageMenu/LanguageMenu";
import Language from "@/models/language/Language";
import LocaleCategory from "@/models/category/LocaleCategory";

const Sidebar: React.FC<{languages: Language [], extended: LocaleCategory []}> = ({languages, extended}) => {
    const lang = usePage().props.lang;
    const open = useAppSelector(state => state.siteSidebar.open);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setSiteSidebar(false));
    }

    const user = usePage().props.auth.user;

    // ======================================================================================
    // Close Sidebar:
    const CloseButton = styled(IconButton)(({theme}) => ({
        display: 'block !important',
        // position: 'absolute',
    }));
    // ======================================================================================
    // Profile:
    const handleProfile = () => {
        dispatch(setSiteSidebar(false));
        router.get(`/${lang}/profile`);
    }

    // ======================================================================================
    // Logout:

    const logout = () => router.post(`/${lang}/logout`);

    // ======================================================================================
    // Category:
    const handleCategory = (id: number) => {
        dispatch(setSiteSidebar(false));
        router.get(`/${lang}/category/${id}`);
    }
    // ======================================================================================

    return (
        <Box component="section" className={`${styles.sidebarContainer} ${open ? styles.openSideBar : styles.closeSideBar}`}>
            <Box className={styles.closeButton}>
                <IconButton
                    onClick={handleClose}
                >
                    <Icon name="close"></Icon>
                </IconButton>
            </Box>
            <Box className="mt-[52px]">
                <Divider variant="middle" />
            </Box>

            {/*<Box className="p-[16px] flex justify-start items-center">*/}
            {/*    <LanguageMenu languages={languages}></LanguageMenu>*/}
            {/*    <Tooltip title="Login">*/}
            {/*        <IconButton sx={{marginLeft: '0'}}>*/}
            {/*            <Icon name="account" size={32}></Icon>*/}
            {/*        </IconButton>*/}
            {/*    </Tooltip>*/}
            {/*</Box>*/}
            <List sx={{padding: 0}} dense>
                <ListItem>
                    <ListItemText
                        primary="Languages"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 900,
                        }}
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <LanguageMenu languages={languages}></LanguageMenu>
                </ListItem>
                <Divider variant="middle"></Divider>


                {user === null
                    ?
                    <Box>
                        <ListItem>
                            <ListItemText
                                primary="Authentication"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 900,
                                }}
                            ></ListItemText>
                        </ListItem>
                        <a href={`/${lang}/login`} className="flex items-center">
                            <ListItem>

                                <IconButton sx={{marginLeft: '0'}}>
                                    <Icon name="account" size={32}></Icon>
                                </IconButton>
                                Login

                            </ListItem>
                        </a>

                        <a href={`/${lang}/register`} className="flex items-center">
                            <ListItem>

                                <IconButton sx={{marginLeft: '0'}}>
                                    <Icon name="register" size={32}></Icon>
                                </IconButton>
                                Register

                            </ListItem>
                        </a>
                    </Box>
                    :
                    // To implement profile and logout
                    <Box>
                        <ListItem
                        >
                            <ListItemText
                                primary="Personal Inforamtion"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 900,
                                }}
                            ></ListItemText>
                        </ListItem>
                        <ListItem
                            onClick={handleProfile}
                            className="cursor-pointer"
                        >

                            <IconButton sx={{marginLeft: '0'}}>
                                {/*<Icon name="account" size={32}></Icon>*/}
                                <Avatar src={`/file/users/${user.avatar}`}></Avatar>
                            </IconButton>
                            Profile

                        </ListItem>
                        {/*<a href={`/${lang}/profile`} className="flex items-center">*/}
                        {/*    */}
                        {/*</a>*/}

                        <ListItem onClick={logout} className="cursor-pointer">

                            <IconButton sx={{marginLeft: '0'}}>
                                <Icon name="logout" size={32}></Icon>
                            </IconButton>
                            Logout

                        </ListItem>
                    </Box>
                }



                <Divider variant="middle"></Divider>

                <ListItem>
                    <ListItemText
                        primary="Extended Categories"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 900,
                        }}
                    ></ListItemText>

                </ListItem>

                {extended.map((cat, index) => (
                    <ListItem
                        key={index}
                        onClick={() => handleCategory(cat.id)}
                        className="cursor-pointer"
                    >
                        <ListItemText>
                            <IconButton sx={{marginLeft: '0'}}>
                                {/*<Icon name="account" size={32}></Icon>*/}
                                <Avatar src={`/file/categories/${cat.images[0].url}`}></Avatar>
                            </IconButton>
                            {cat.name}
                        </ListItemText>
                    </ListItem>
                ))}

            </List>

            <Backdrop
                className={styles.backdrop}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
            </Backdrop>

        </Box>
    );
};

export default Sidebar;
