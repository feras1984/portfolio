import { Card } from "@/Pages/Site/components/ui/card";
import { Server, Monitor, Settings, Database } from "lucide-react";

const skills = [
  {
    category: "Backend",
    technologies: ["Laravel", "Node.js", "PHP", "JavaScript", "REST APIs"],
    icon: Server
  },
  {
    category: "Frontend",
    technologies: ["React", "Angular", "TypeScript", "Tailwind CSS", "HTML5"],
    icon: Monitor
  },
  {
    category: "DevOps & Tools",
    technologies: ["CI/CD", "GitHub", "JIRA", "Docker", "Linux"],
    icon: Settings
  },
  {
    category: "Database",
    technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    icon: Database
  }
];

const SkillsSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Technical Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Proficient in modern technologies and development practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={skill.category}
              className="p-6 bg-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                <skill.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {skill.category}
              </h3>
              <div className="space-y-2">
                {skill.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full inline-block mr-2 mb-2 hover:text-accent transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
