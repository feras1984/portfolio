import React from 'react';
import {
    Box, ListItemButton, ListItemText,
    Paper,
    Stack, Typography,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import HeaderProps from "@/Interfaces/Site/HeaderProps";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import LineDivider from "@/Components/Site/Divider/LineDivider";
import styles from "./styles.module.scss";
import AnchorTag from "@/Components/AnchorTag/AnchorTag";
import LogoSection from "@/Components/Site/Footer/FooterLogo";
import SocialList from "@/Components/Site/Footer/SocialList";

const FooterV1 :React.FC<HeaderProps> = ({
                                            mainLinks,
                                            socialLinks,
                                            contactLinks,
                                            logo,
                                            languages,
                                        }) => {
    const { t } = useTranslation();
    return (
        <Box className={styles.footerContainer} dir="ltr">
            <Box className={styles.bgImage}>
                {/*<SectionTitle title={t('asas')}></SectionTitle>*/}
                <Box
                    className="p-[16px]"
                >
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{ fontWeight: 'bold', color: '#E02027', fontSize:{xs: '1.5rem', md: '1.75rem'} }}
                        // className={styles.textColor}
                    >{t('asas')}</Typography>
                </Box>
                <LineDivider />
                <Box className="m-[32px]"></Box>
                <Stack
                    direction={{xs: "column", md: "row"}}
                    justifyContent={{xs: 'center', md: "space-evenly"}}
                    alignItems="center"
                    spacing={3}
                    flexWrap="wrap"
                    sx={{ position: 'relative', zIndex: 1, }}
                >
                    {
                        mainLinks.map((link, key) =>
                            <AnchorTag link={link.url} linkType={link.type} key={key}>
                                <Box className="p-[8px]">
                                    <Typography
                                        sx={{ fontWeight: 600, fontSize: {xs: '0.8rem', md: '1rem'} }}
                                        className="uppercase"
                                        variant="body1"
                                        component="h5"
                                        align="center"
                                    >
                                        {link.name}
                                    </Typography>
                                </Box>
                            </AnchorTag>
                        )
                    }
                </Stack>

                <Box className="flex">
                    <Stack
                        direction={{xs: 'column-reverse', md: 'row'}}
                        flexWrap="wrap"
                        justifyContent={{xs: 'center', md: 'space-between'}}
                        alignItems={{xs: 'center', md: "flex-end"}}
                        sx={{width: '100%', position: 'relative', zIndex: 1, }}
                    >
                        <Box>
                            <LogoSection />
                        </Box>

                        <Box className="flex flex-wrap justify-center">
                            <SocialList links={socialLinks}></SocialList>
                            <SocialList links={contactLinks} displayName></SocialList>
                        </Box>

                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default FooterV1;
