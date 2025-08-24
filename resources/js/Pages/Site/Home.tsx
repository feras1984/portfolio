import {Head} from "@inertiajs/react";
import React from "react";
import {Box} from "@mui/material";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import LinkListProps from "@/Interfaces/Site/LinkListProps";
import ProjectProps from "@/Interfaces/Site/ProjectProps";
import HeroSection from "./components/HeroSection";
import SkillsSection from "@/Pages/Site/components/SkillsSection";
import AboutSection from "@/Pages/Site/components/AboutSection";
import ProjectsSection from "@/Pages/Site/components/ProjectsSection";
import ContactSection from "@/Pages/Site/components/ContactSection";

interface HomeProps extends LinkListProps{
    aboutMe: BlockProps [],
    technologies: BlockProps [],
    projects: ProjectProps [],
}
const Home:React.FC<HomeProps> = ({
                                        socialLinks,
                                        contactLinks,
                                        aboutMe,
                                        technologies,
                                        projects,
                                  }) => {

    return(
        <Box>
            <Head title={'Home'}></Head>
            <div className="min-h-screen">
                <HeroSection socialLinks={socialLinks} contactLinks={contactLinks}/>
                <SkillsSection technologies={technologies}/>
                <AboutSection aboutMe={aboutMe[0]}/>
                <ProjectsSection projects={projects}/>
                <ContactSection socialLinks={socialLinks} contactLinks={contactLinks}/>
            </div>
        </Box>
    );
}
export default Home;
