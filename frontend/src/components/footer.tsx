import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon, MailIcon } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t-2">
            <div className="container flex flex-col sm:flex-row gap-8 justify-between p-4 max-w-screen-2xl font-poppins text-muted-foreground">
                <div className="flex flex-col gap-4">
                    <p>Sądecka Liga Speedcubingu 2024/2025</p>
                    <div className="flex gap-4">
                        <a
                            href="https://www.facebook.com/profile.php?id=61556579159303"
                            target="_blank"
                            title="Facebook"
                        >
                            <FacebookIcon size={24} />
                        </a>
                        <a
                            href="mailto:sadeckaligaspeedcubingu@gmail.com"
                            title="Email"
                        >
                            <MailIcon size={24} />
                        </a>
                        <a
                            href="https://github.com/maxidragon/SLSWebsite2024"
                            target="_blank"
                            title="GitHub"
                        >
                            <GitHubLogoIcon width={24} height={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
