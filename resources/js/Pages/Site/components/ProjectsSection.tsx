import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { Button } from "@/Pages/Site/components/ui/button";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with Laravel backend and React frontend. Features user authentication, payment processing, and admin dashboard.",
      technologies: ["Laravel", "React", "MySQL", "Stripe API"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application built with Node.js and Angular. Includes real-time updates, team collaboration, and JIRA integration.",
      technologies: ["Node.js", "Angular", "MongoDB", "Socket.io"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      title: "API Gateway Service",
      description: "Microservices architecture with automated CI/CD pipeline. Built with Node.js and deployed using Docker containers.",
      technologies: ["Node.js", "Docker", "GitHub Actions", "AWS"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    },
    {
      title: "CRM Dashboard",
      description: "Customer relationship management system with Laravel backend and React frontend. Features analytics, reporting, and customer tracking.",
      technologies: ["Laravel", "React", "PostgreSQL", "Chart.js"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
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
              className={`bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 ${
                project.featured ? 'md:col-span-1' : ''
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {project.title}
                  </CardTitle>
                  {project.featured && (
                    <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="outline"
                      className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 hover:text-accent transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>Code</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 text-lg hover:text-accent transition-colors">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
