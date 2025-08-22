
import MenuLink from "@/models/Link/MenuLink";
import Language from "@/models/language/Language";
import React, {ReactNode} from "react";
import SiteAppRoot from "@/SiteAppRoot";
import {useAppSelector} from "@/Redux/Store/hook";
import {Box, IconButton} from "@mui/material";
import {usePage} from "@inertiajs/react";
import {useTranslation} from "react-i18next";

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
            </Box>
        </SiteAppRoot>
    );
}

export default HeaderLayout;
