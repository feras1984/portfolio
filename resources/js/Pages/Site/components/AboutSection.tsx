import { Card } from "@/Pages/Site/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground">
            Passionate about building exceptional digital experiences
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-border shadow-card">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              As a <span className="text-accent font-medium">full-stack developer</span>, I bring together
              frontend creativity and backend logic to create comprehensive web solutions. My journey spans
              multiple technologies and frameworks, allowing me to choose the right tool for each project.
            </p>

            <p>
              With extensive experience in <span className="text-primary font-medium">Laravel and Node.js</span>
              on the backend, combined with <span className="text-primary font-medium">React and Angular</span>
              expertise on the frontend, I create applications that are both powerful and user-friendly.
            </p>

            <p>
              I'm passionate about <span className="text-accent font-medium">modern development practices</span>,
              including CI/CD pipelines, version control with GitHub, and agile project management using JIRA.
              This ensures that every project is delivered efficiently and maintains high code quality.
            </p>

            <div className="pt-6 border-t border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">What drives me:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-accent mr-3">▸</span>
                  Clean, maintainable code architecture
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-3">▸</span>
                  Seamless user experiences
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-3">▸</span>
                  Continuous learning and technology adoption
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-3">▸</span>
                  Collaborative team development
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
