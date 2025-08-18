import React from 'react';
import styles from "./styles.module.scss";
import {
    Container,
    Grid,
    Stack,
} from "@mui/material";
import HeaderProps from "@/Interfaces/Site/HeaderProps";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import MainList from "@/Components/Site/Footer/MainList";
import SocialList from "@/Components/Site/Footer/SocialList";
import LogoSection from "@/Components/Site/Footer/FooterLogo";
import {useTranslation} from "react-i18next";

const Footer:React.FC<HeaderProps> = ({
                                          mainLinks,
                                          socialLinks,
                                          contactLinks,
                                          logo,
                                          languages,
                                      }) => {
    const { t } = useTranslation();
    return (
        <Container>
            <SectionTitle title={t('tera')}></SectionTitle>
            <Grid
                container
                direction={{xs: 'column', md: 'row'}}
                justifyContent={{xs: 'flex-start', md: 'flex-start'}}
                alignItems={{xs: 'stretch', md: 'stretch'}}
            >
                <Grid
                    item
                    md={8}
                >
                    <MainList links={mainLinks}></MainList>

                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        justifyContent="center"
                    >
                        <SocialList links={socialLinks}></SocialList>
                        <SocialList links={contactLinks}></SocialList>
                    </Stack>
                </Grid>
                <Grid
                    item
                    md={4}
                    alignSelf={{xs: 'center', md: 'end'}}
                >
                    <LogoSection />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;
