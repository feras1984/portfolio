import BlockCategories from "@/Enums/BlockCategories";
import {Container} from "typedi";
import CommonService from "@/Services/CommonService/CommonService";
import "reflect-metadata";
import MenuCategories from "@/Enums/MenuCategories";

const commonService = Container.get(CommonService);

export type CustomTab = {
    name: string,
    icon: string,
    link: string,
    children: CustomTab [],
};

const SidebarList: CustomTab [] = [
    {
        name: 'Home',
        icon: 'home',
        link: '/admin',
        children: [],
    },

    {
        name: BlockCategories.ABOUT,
        icon: 'about-us',
        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.ABOUT),
        children: [],
    },

    {
        name: BlockCategories.TECHNOLOGY,
        icon: 'services',
        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.TECHNOLOGY),
        children: [],
    },

    {
        name: BlockCategories.SKILLS,
        icon: 'mission',
        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.SKILLS),
        children: [],
    },

    {
        name: BlockCategories.LIBRARIES,
        icon: 'clients',
        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.LIBRARIES),
        children: [],
    },

    {
        name: BlockCategories.PROJECTS,
        icon: 'main-section',
        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.PROJECTS),
        children: [],
    },

    {
        name: MenuCategories.SOCIAL_MENU,
        icon: 'social-menu',
        link: '/admin/get-menu/' + commonService.toSnakeCase(MenuCategories.SOCIAL_MENU),
        children: [],
    },

    {
        name: MenuCategories.CONTACT_MENU,
        icon: 'contact-menu',
        link: '/admin/get-menu/' + commonService.toSnakeCase(MenuCategories.CONTACT_MENU),
        children: [],
    },

    // {
    //     name: 'Settings',
    //     icon: 'settings',
    //     link: '/admin/setting',
    //     children: [
    //         {
    //             name: 'Languages',
    //             icon: 'language',
    //             link: '/admin/setting/language',
    //             children: [],
    //         },
    //     ],
    // },
];

export default SidebarList;
