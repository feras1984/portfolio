import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { Button } from "@/Pages/Site/components/ui/button";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import React from "react";
import ProjectProps from "@/Interfaces/Site/ProjectProps";

const ProjectsSection: React.FC<{projects: ProjectProps []}> = ({projects}) => {
  // const projects = [
  //   {
  //     title: "E-Commerce Platform",
  //     description: "Full-stack e-commerce solution with Laravel backend and React frontend. Features user authentication, payment processing, and admin dashboard.",
  //     technologies: ["Laravel", "React", "MySQL", "Stripe API"],
  //     githubUrl: "#",
  //     liveUrl: "#",
  //     featured: true
  //   },
  //   {
  //     title: "Task Management App",
  //     description: "Collaborative task management application built with Node.js and Angular. Includes real-time updates, team collaboration, and JIRA integration.",
  //     technologies: ["Node.js", "Angular", "MongoDB", "Socket.io"],
  //     githubUrl: "#",
  //     liveUrl: "#",
  //     featured: true
  //   },
  //   {
  //     title: "API Gateway Service",
  //     description: "Microservices architecture with automated CI/CD pipeline. Built with Node.js and deployed using Docker containers.",
  //     technologies: ["Node.js", "Docker", "GitHub Actions", "AWS"],
  //     githubUrl: "#",
  //     liveUrl: "#",
  //     featured: false
  //   },
  //   {
  //     title: "CRM Dashboard",
  //     description: "Customer relationship management system with Laravel backend and React frontend. Features analytics, reporting, and customer tracking.",
  //     technologies: ["Laravel", "React", "PostgreSQL", "Chart.js"],
  //     githubUrl: "#",
  //     liveUrl: "#",
  //     featured: false
  //   }
  // ];

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
            // <Card
            //   key={index}
            //   className={`bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 ${
            //     project.featured ? 'md:col-span-1' : ''
            //   }`}
            // >
            //   <CardHeader>
            //     <div className="flex justify-between items-start mb-2">
            //       <CardTitle className="text-xl font-semibold text-foreground">
            //         {project.title}
            //       </CardTitle>
            //       {project.featured && (
            //         <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            //           Featured
            //         </Badge>
            //       )}
            //     </div>
            //     <CardDescription className="text-muted-foreground leading-relaxed">
            //       {project.description}
            //     </CardDescription>
            //   </CardHeader>
            //
            //   <CardContent>
            //     <div className="flex flex-wrap gap-2">
            //       {project.skills.concat(project.libraries).map((tech, techIndex) => (
            //         <Badge
            //           key={techIndex}
            //           variant="outline"
            //           className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
            //         >
            //           {tech.title}
            //         </Badge>
            //       ))}
            //     </div>
            //   </CardContent>
            //
            //     <CardFooter className="flex space-x-3">
            //         <a href={project.links.github} target="_blank">
            //             <Button
            //                 variant="outline"
            //                 size="sm"
            //                 className="flex items-center space-x-2 hover:text-accent transition-colors"
            //             >
            //                 <Github className="h-4 w-4"/>
            //                 <span>Code</span>
            //             </Button>
            //         </a>
            //
            //         <a href={project.links.preview} target="_blank">
            //             <Button
            //                 variant="default"
            //                 size="sm"
            //                 className="flex items-center space-x-2"
            //             >
            //                 <ExternalLink className="h-4 w-4"/>
            //                 <span>Live Demo</span>
            //             </Button>
            //         </a>
            //     </CardFooter>
            // </Card>
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
                                  <a href={project.links.github} target="_blank">
                                      <Button
                                          variant="secondary"
                                          size="sm"
                                          className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                                      >
                                          <Github className="h-3 w-3 mr-2"/>
                                          Code
                                      </Button>
                                  </a>

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

                      <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                          {project.description}
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
                          <a href={project.links.github} target="_blank">
                              <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center space-x-2 hover:text-accent transition-colors"
                              >
                                  <Github className="h-3 w-3"/>
                                  <span>Code</span>
                              </Button>
                          </a>

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
