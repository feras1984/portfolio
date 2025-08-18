import React from 'react';
import {PageProps} from "@/types";
import {Head, Link} from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import CommonService from "@/Services/CommonService/CommonService";
import {Container} from "typedi";
import "reflect-metadata";
import BlockCategories from "@/Enums/BlockCategories";
import AboutAdd from "@/Pages/Admin/Website/Blocks/About/AboutAdd";
import TechnologyAdd from "@/Pages/Admin/Website/Blocks/Technology/TechnologyAdd";
import SkillAdd from "@/Pages/Admin/Website/Blocks/Skills/SkillAdd";
import LibraryAdd from "@/Pages/Admin/Website/Blocks/Libraries/LibraryAdd";
import ProjectAdd from "@/Pages/Admin/Website/Blocks/Projects/ProjectAdd";

const BlockAdd = ({category}: PageProps<{category: string}>) => {
    const commonService = Container.get(CommonService);
    const categories = Object.values(BlockCategories);
    let AddComponent;

    switch (commonService.toTitleCase(category)) {

        case BlockCategories.ABOUT: {
            AddComponent = () => <AboutAdd category={category}></AboutAdd>;
            break;
        }

        case BlockCategories.TECHNOLOGY: {
            AddComponent = () => <TechnologyAdd category={category}></TechnologyAdd>
            break;
        }

        case BlockCategories.SKILLS: {
            AddComponent = () => <SkillAdd category={category}></SkillAdd>
            break;
        }

        case BlockCategories.LIBRARIES: {
            AddComponent = () => <LibraryAdd category={category}></LibraryAdd>
            break;
        }

        case BlockCategories.PROJECTS: {
            AddComponent = () => <ProjectAdd category={category}></ProjectAdd>
            break;
        }

        default: {
            AddComponent = () => <ProjectAdd category={category}></ProjectAdd>
        }
    }

    const getTitle = () => {
        return commonService.toTitleCase(category);
    }
    return (
        <AdminLayout>
            <Head title={'Add ' + getTitle()}></Head>
            <AddComponent></AddComponent>
        </AdminLayout>
    );
}

export default BlockAdd;
