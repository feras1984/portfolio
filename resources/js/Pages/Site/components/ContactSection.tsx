import { Button } from "@/Pages/Site/components/ui/button";
import { Card } from "@/Pages/Site/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Smartphone } from "lucide-react";
import React from "react";
import MenuLink from "@/models/Link/MenuLink";
import CustomLinks from "@/Pages/Site/components/CustomLinks";

const ContactSection: React.FC<{socialLinks: MenuLink [], contactLinks: MenuLink []}> = ({socialLinks, contactLinks}) => {
    const mail = contactLinks.find(item => item.slug.includes("mail"));
    const phone = contactLinks.find(item => item.slug.includes("mobile"));
    const handleLink = (link: MenuLink | undefined) => {
        if (link !== undefined) {
            const url = link.url.split(':');
            return url[url.length - 1];
        } else return '';

    }
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground">
            Ready to bring your next project to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-card border-border shadow-card">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Get In Touch</h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground group-hover:text-accent transition-colors">
                      {handleLink(mail)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Mobile</p>
                  <p className="text-muted-foreground group-hover:text-accent transition-colors">
                      {handleLink(phone)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
              {/*<div className="flex space-x-3">*/}
              {/*  <Button variant="outline" size="icon" className="hover:text-accent transition-colors">*/}
              {/*    <Github className="h-4 w-4" />*/}
              {/*  </Button>*/}
              {/*  <Button variant="outline" size="icon" className="hover:text-accent transition-colors">*/}
              {/*    <Linkedin className="h-4 w-4" />*/}
              {/*  </Button>*/}
              {/*  <Button variant="outline" size="icon" className="hover:text-accent transition-colors">*/}
              {/*    <Mail className="h-4 w-4" />*/}
              {/*  </Button>*/}
              {/*</div>*/}
                <CustomLinks socialLinks={socialLinks} contactLinks={contactLinks}></CustomLinks>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-primary border-0 text-primary-foreground shadow-glow">
            <h3 className="text-2xl font-semibold mb-6">Project Inquiry</h3>

            <div className="space-y-4 mb-6">
              <p className="text-primary-foreground/90">
                Looking for a developer who can handle both frontend and backend?
                I'd love to discuss your project requirements.
              </p>

              <ul className="space-y-2 text-primary-foreground/80">
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  Full-stack development
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  API design & integration
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  CI/CD setup & optimization
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  Code review & consulting
                </li>
              </ul>
            </div>

            <Button
              variant="secondary"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Start a Conversation
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
