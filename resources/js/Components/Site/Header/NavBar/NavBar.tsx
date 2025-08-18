import React, {useState} from "react";
import HeaderProps from "@/Interfaces/Site/HeaderProps";
import NavbarMenu from "@/Components/Site/Header/NavbarMenu/NavbarMenu";
import { usePage } from '@inertiajs/react'
import {Button} from "@mui/material";
import styles from './styles.module.scss';
import {
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    Box,
    Container,
    Stack,
    ListItemButton,
    ListItemText
} from "@mui/material";
import SocialIcon from "@/Components/Site/SocialIcon/SocialIcon";
import LanguageMenu from "@/Components/Site/LanguageMenu/LanguageMenu";
import LogoImg from "@/StyledComponents/LogoImg";
import {Link} from "@inertiajs/react";
import Icon from "@/Components/Icon/Icon";
import {useAppSelector} from "@/Redux/Store/hook";
import SiteSearch from "@/Components/Search/SiteSearch";
import LogoSection from "@/Components/Site/LogoSection/LogoSection";
import AnchorTag from "@/Components/AnchorTag/AnchorTag";

//THIS COMPONENT FOR COMPUTER DEVICES ONLY.
const NavBar: React.FC<HeaderProps> = ({
       mainLinks,
       socialLinks,
       contactLinks,
       logo,
       languages,
        handleTheme,
   }) => {
    const dark = useAppSelector(state => state.siteTheme.dark);
    const lang = usePage().props.lang;
    return (
        <AppBar component="nav" className={`${styles.navbarBgColor}`} sx={{padding: 0,}}>
            <Toolbar className={`${styles.padding0}`}>
                <LogoSection />

                <Container maxWidth="xl" component="nav" className={`${styles.padding0}`} sx={{height: 90}}>
                    <Box component="div">
                        <Stack
                            dir={document.dir}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            className="w-full"
                        >
                            {/*<Box className={`basis-1/2 ${styles.marginAuto}`}>*/}
                            {/*    <SiteSearch customColor />*/}
                            {/*</Box>*/}

                            <Stack
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                {contactLinks.map((link, index) =>(
                                    <a className={`${styles.socialLink} text-xs uppercase font-bold mx-2`}
                                       key={index}
                                       href={link.url}
                                        // target={link.target}
                                        // rel="noopener"
                                    >
                                        <div className="flex items-center gap-1">
                                            <SocialIcon name={link.image}></SocialIcon>
                                            <div dir="ltr">{link.url.split(':')[1]}</div>
                                        </div>

                                    </a>
                                ))}
                            </Stack>

                            <LanguageMenu languages={languages}></LanguageMenu>
                            {/*{*/}
                            {/*    dark ?*/}
                            {/*        <IconButton onClick={handleTheme} className="iconColor">*/}
                            {/*            <Icon name="light-mode"></Icon>*/}
                            {/*        </IconButton>*/}
                            {/*        :*/}
                            {/*        <IconButton onClick={handleTheme} className="iconColor">*/}
                            {/*            <Icon name="dark-mode"></Icon>*/}
                            {/*        </IconButton>*/}
                            {/*}*/}
                        </Stack>
                    </Box>
                    <Box component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>

                        <Stack
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            className="mx-auto"
                        >
                            {socialLinks.map((link, index) =>(
                                <a className={`${styles.socialLink} text-xs uppercase font-bold mx-2`}
                                   key={index}
                                   href={link.url}
                                   target={link.target}
                                   rel="noopener"
                                >
                                    <SocialIcon name={link.image}></SocialIcon>
                                </a>
                            ))}
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >

                            {mainLinks.map((link, i) => (

                                <Box key={i}>
                                    {link.children.length <= 0 ?

                                        <AnchorTag link={link.url} linkType={link.type}>
                                            <ListItemButton className={ lang === 'ar' ? styles.arLinkStyle : styles.enLinkStyle}>
                                                <ListItemText sx={{fontWeight: 600}}>
                                                    <Typography sx={{
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase',
                                                        fontSize: '0.75rem'
                                                    }}>
                                                        {link.name}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </AnchorTag>
                                        :
                                        <NavbarMenu menuLink={link}/>
                                    }
                                </Box>

                            ))}
                        </Stack>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
