import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { Button } from "@/Pages/Site/components/ui/button";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import React from "react";
import ProjectProps from "@/Interfaces/Site/ProjectProps";

const ProjectsSection: React.FC<{projects: ProjectProps []}> = ({projects}) => {

  return (
    <section className="py-20 px-6 bg-background" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">
            A showcase of my recent work and technical expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
              <Card
                  key={index}
                  className={`relative overflow-hidden bg-card border-border shadow-card group cursor-pointer
                  hover:shadow-glow transition-all duration-300 ${
                      project.featured ? 'md:col-span-1' : ''
                  }`}
              >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                      <img
                          src={`/file/blocks/${project.images[0].url}`}
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                          <div className="text-center text-white p-4">
                              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                              {/*<p className="text-sm mb-4 opacity-90">{project.timeline} • {project.team}</p>*/}
                              <div className="flex justify-center space-x-3">
                                  {project.links.github.length > 0 && <a href={project.links.github} target="_blank">
                                      <Button
                                          variant="secondary"
                                          size="sm"
                                          className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                                      >
                                          <Github className="h-3 w-3 mr-2"/>
                                          Code
                                      </Button>
                                  </a>}

                                  <a href={project.links.preview} target="_blank">
                                      <Button
                                          variant="secondary"
                                          size="sm"
                                          className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                                      >
                                          <ExternalLink className="h-3 w-3 mr-2"/>
                                          Live Demo
                                      </Button>
                                  </a>

                              </div>
                          </div>
                      </div>

                      {project.featured && (
                          <Badge
                              variant="secondary"
                              className="absolute top-4 right-4 bg-accent/90 text-accent-foreground border-accent/30 backdrop-blur-sm z-10"
                          >
                              Featured
                          </Badge>
                      )}
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                      <CardTitle className="text-xl font-semibold text-foreground mb-2">
                          {project.title}
                      </CardTitle>

                      <CardDescription className="text-muted-foreground leading-relaxed mb-4"
                                       dangerouslySetInnerHTML={{__html: project.description}}>
                      </CardDescription>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((skill, skillIndex) => (
                              <Badge
                                  key={skill.title}
                                  variant="outline"
                                  className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors text-xs"
                              >
                                  {skill.title}
                              </Badge>
                          ))}

                          {project.libraries.map((library, libraryIndex) => (
                              <Badge
                                  key={library.title}
                                  variant="outline"
                                  className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors text-xs"
                              >
                                  {library.title}
                              </Badge>
                          ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex space-x-2">
                          {project.links.github.length > 0 && <a href={project.links.github} target="_blank">
                              <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center space-x-2 hover:text-accent transition-colors"
                              >
                                  <Github className="h-3 w-3"/>
                                  <span>Code</span>
                              </Button>
                          </a>}

                          <a href={project.links.preview} target="_blank">
                              <Button
                                  variant="default"
                                  size="sm"
                                  className="flex items-center space-x-2"
                              >
                                  <ExternalLink className="h-3 w-3"/>
                                  <span>Live Demo</span>
                              </Button>
                          </a>

                      </div>
                  </div>
              </Card>
              ))}
        </div>

        {/*<div className="text-center mt-12">*/}
        {/*  <Button variant="outline" className="px-8 py-3 text-lg hover:text-accent transition-colors">*/}
        {/*    View All Projects*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default ProjectsSection;
