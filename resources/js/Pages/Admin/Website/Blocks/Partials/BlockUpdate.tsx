import React from 'react';
import CommonService from "@/Services/CommonService/CommonService";
import {Container} from "typedi";
import "reflect-metadata";
import {PageProps} from "@/types";
import {Head, Link} from "@inertiajs/react";

import AdminLayout from "@/Layouts/Admin/AdminLayout";
import {Block} from "@/models/block/Block";
import BlockCategories from "@/Enums/BlockCategories";
import AboutUpdate from "@/Pages/Admin/Website/Blocks/About/AboutUpdate";
import TechnologyUpdate from "@/Pages/Admin/Website/Blocks/Technology/TechnologyUpdate";
import SkillUpdate from "@/Pages/Admin/Website/Blocks/Skills/SkillUpdate";
import LibraryUpdate from "@/Pages/Admin/Website/Blocks/Libraries/LibraryUpdate";
import ProjectUpdate from "@/Pages/Admin/Website/Blocks/Projects/ProjectUpdate";


const BlockUpdate = ({category, block}: PageProps<{category: string, block: Block}>) => {
    const commonService = Container.get(CommonService);
    const categories = Object.values(BlockCategories);
    let UpdateComponent;

    switch (commonService.toTitleCase(category)) {

        case BlockCategories.ABOUT: {
            UpdateComponent = () => <AboutUpdate block={block} category={category}></AboutUpdate>;
            break;
        }

        case BlockCategories.TECHNOLOGY: {
            UpdateComponent = () => <TechnologyUpdate block={block} category={category}></TechnologyUpdate>;
            break;
        }

        case BlockCategories.SKILLS: {
            UpdateComponent = () => <SkillUpdate block={block} category={category}></SkillUpdate>;
            break;
        }

        case BlockCategories.LIBRARIES: {
            UpdateComponent = () => <LibraryUpdate block={block} category={category}></LibraryUpdate>;
            break;
        }

        case BlockCategories.PROJECTS: {
            UpdateComponent = () => <ProjectUpdate block={block} category={category}></ProjectUpdate>;
            break;
        }


        default: {
            UpdateComponent = () => <ProjectUpdate block={block} category={category}></ProjectUpdate>
        }
    }

    const getTitle = () => {
        return commonService.toTitleCase(category);
    }
    return (
        <AdminLayout>
            <Head title={'Update ' + getTitle()}></Head>
            <UpdateComponent></UpdateComponent>
        </AdminLayout>
    );
}

export default BlockUpdate;
