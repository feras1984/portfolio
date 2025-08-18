import BlockProps from "@/Interfaces/Site/BlockProps";
import ProjectLink from "@/models/block/ProjectLink";

interface ProjectProps extends BlockProps {
    links: ProjectLink;
    skills: BlockProps [];
    libraries: BlockProps [];
}

export default ProjectProps;
