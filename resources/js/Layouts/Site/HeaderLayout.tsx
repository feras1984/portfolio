import Header from "@/Components/Site/Header/Header";
import MenuLink from "@/models/Link/MenuLink";
import Language from "@/models/language/Language";
import React, {ReactNode} from "react";
import SiteAppRoot from "@/SiteAppRoot";
import {useAppSelector} from "@/Redux/Store/hook";
import {Box, IconButton} from "@mui/material";
import {usePage} from "@inertiajs/react";
import {useTranslation} from "react-i18next";
import ClockSpinner from "@/Components/Spinner/ClockSpinner";
import Footer from "@/Components/Site/Footer/Footer";
import styles from "./styles.module.scss";
import FooterV1 from "@/Components/Site/Footer/FooterV1";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface HeaderLayoutProps {
    children: ReactNode,
    mainLinks: MenuLink[],
    socialLinks: MenuLink[],
    contactLinks: MenuLink[],
    footerLinks: MenuLink[],
    logo: {logo: string},
    languages: Language[],
}
const HeaderLayout:React.FC<HeaderLayoutProps> =(
    {
        children,
        mainLinks,
        socialLinks,
        contactLinks,
        footerLinks,
        logo,
        languages
    }) =>
{
    const dark = useAppSelector(state => state.siteTheme.dark);
    const lang = usePage().props.lang;
    const spinner = useAppSelector(state => state.spinner.spinner);
    const { t, i18n: {changeLanguage, language} } = useTranslation();
    React.useEffect(() => {
        changeLanguage(lang);
    }, [lang]);

    // React.useEffect(() => {
    // }, [spinner]);

    return(
        <SiteAppRoot lang={lang}>
            <Box className={`${dark ? 'site-dark' : 'site-light'}`}>
                <Header
                    mainLinks={mainLinks}
                    socialLinks={socialLinks}
                    contactLinks={contactLinks}
                    logo={logo}
                    languages={languages}></Header>
                <div className={`${styles.minHeight} ${styles.marginTop}`}>{children}</div>
                <div className={styles.whatsIcon}>
                    <div className="flex justify-center align-middle gap-2">
                        <a href="https://wa.me/971558399642?text=I'm%20interested%20" target="_blank">
                            <IconButton color="success" size="large" sx={{bgcolor: '#fff'}}>
                                <WhatsAppIcon sx={{fontSize: '32px'}}></WhatsAppIcon>
                            </IconButton>
                        </a>

                        <a href="https://wa.me/971543414809?text=I'm%20interested%20" target="_blank">
                            <IconButton color="success" size="large" sx={{bgcolor: '#fff'}}>
                                <WhatsAppIcon sx={{fontSize: '32px'}}></WhatsAppIcon>
                            </IconButton>
                        </a>
                    </div>
                </div>




                {/*Footer Goes here*/}
                <FooterV1 mainLinks={footerLinks}
                        socialLinks={socialLinks}
                        contactLinks={contactLinks}
                        logo={logo}
                        languages={languages} />

                {/*    Spinner Goes here*/}
                {/*{spinner && <ClockSpinner></ClockSpinner>}*/}
            </Box>
        </SiteAppRoot>
    );
}

export default HeaderLayout;
