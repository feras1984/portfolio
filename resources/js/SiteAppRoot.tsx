import { Toaster } from "@/Pages/Site/components/ui/toaster";
import { Toaster as Sonner } from "@/Pages/Site/components/ui/sonner";
import { TooltipProvider } from "@/Pages/Site/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {PropsWithChildren} from "react";

const queryClient = new QueryClient();
const SiteAppRoot = ({children, lang} : PropsWithChildren<{lang: string}>) => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
        </TooltipProvider>
    </QueryClientProvider>
)
export default SiteAppRoot;
