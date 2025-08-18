import React from 'react';
import LinkListProps from "@/Interfaces/Site/LinkListProps";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {PageProps} from "@/types";
import {Container} from "typedi";
import "reflect-metadata";
import CommonService from "@/Services/CommonService/CommonService";
import BlockCategories from "@/Enums/BlockCategories";
import {Head} from "@inertiajs/react";
import {Box} from "@mui/material";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import AboutUsDetails from "@/Pages/Site/Blocks/AboutUs/Partials/AboutUsDetails";
import ClientDetails from "@/Pages/Site/Blocks/Clients/ClientDetails";
import GalleryDetails from "@/Pages/Site/Blocks/Gallery/GalleryDetails";
import ServicesDetails from "@/Pages/Site/Blocks/Services/ServicesDetails";
import {useAppDispatch} from "@/Redux/Store/hook";
import {setSpinner} from "@/Redux/Reducers/SpinnerSlice/SpinnerSlice";
import ServiceCard from "@/Pages/Site/Blocks/Services/ServiceCard";
import IndustryCard from "@/Pages/Site/Blocks/Industries/IndustryCard";
import ArticleCard from "@/Pages/Site/Blocks/Articles/ArticleCard";
import NewsCard from "@/Pages/Site/Blocks/News/NewsCard";

interface HubProps extends LinkListProps {
    block: BlockProps;
    category: string;
}

const HubList: React.FC<HubProps> = (
    {
        mainLinks,
        socialLinks,
        footerLinks,
        contactLinks,
        logo,
        languages,
        block,
        category
    }
) => {
    const commonService = Container.get(CommonService);
    let AddComponent;

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        // if (mainLinks.length > 0) {
        //     dispatch(setSpinner(false));
        // }
        setTimeout(() => {
            dispatch(setSpinner(false));
        }, 3000)
    }, [])

    switch (commonService.toTitleCase(category)) {
        case BlockCategories.ABOUT: {
            AddComponent = () => <AboutUsDetails about={block}></AboutUsDetails>;
            break;
        }

        case BlockCategories.CLIENTS: {
            AddComponent = () => <ClientDetails client={block}></ClientDetails>;
            break;
        }

        case BlockCategories.GALLERY: {
            AddComponent = () => <GalleryDetails gallery={block}></GalleryDetails>
            break;
        }

        case BlockCategories.SERVICES: {
            AddComponent = () => <ServiceCard service={block}></ServiceCard>
            break;
        }

        case BlockCategories.INDUSTRIES: {
            AddComponent = () => <IndustryCard service={block}></IndustryCard>
            break;
        }

        case BlockCategories.ARTICLES: {
            AddComponent = () => <ArticleCard service={block}></ArticleCard>
            break;
        }

        case BlockCategories.NEWS: {
            AddComponent = () => <NewsCard service={block}></NewsCard>
            break;
        }
    }


    return (
        <HeaderLayout
            mainLinks={mainLinks}
            socialLinks={socialLinks}
            contactLinks={contactLinks}
            footerLinks={footerLinks}
            logo={logo}
            languages={languages}
        >
            <Head title={commonService.toTitleCase(category)}></Head>
            <Box className="relative mt-[90px]">
                <AddComponent></AddComponent>
            </Box>
        </HeaderLayout>
    );
};

export default HubList;
