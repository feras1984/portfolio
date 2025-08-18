import { Block } from "./Block";
import ProjectLink from "@/models/block/ProjectLink";
import File from "@/models/files/File";

class Project extends Block{
    links: ProjectLink;
    skills: Block [];
    libraries: Block [];

    constructor({
                    links = new ProjectLink({}),
                    skills = [] as Block[],
                    libraries = [] as Block[],
                    id = -1,
                    categoryId = -1,
                    parentId = -1,
                    category = '',
                    // name = '',
                    // description = '',
                    images = ([] as File []),
                    url = '',
                    file = '',
                    order = -1,
                    isActive = false,
                    startDate = '',
                    endDate = '',
                    createdAt = '',
                    translations = [],
                    files = [],
                }) {
        super({
            id,
            categoryId,
            parentId,
            category,
            images,
            url,
            file,
            order,
            isActive,
            startDate,
            endDate,
            createdAt,
            translations,
            files,
        });

        this.links = links;
        this.skills = [...skills];
        this.libraries = [...libraries];
    }
}

export default Project;
