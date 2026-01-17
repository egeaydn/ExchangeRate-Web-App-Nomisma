import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Nomisma
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Your trusted partner for secure and efficient financial solutions.
                            Manage your assets with confidence and style.
                        </p>
                        <div className="flex space-x-4 pt-4">
                            <SocialLink href="#" icon={<Facebook size={20} />} label="Facebook" />
                            <SocialLink href="#" icon={<Twitter size={20} />} label="Twitter" />
                            <SocialLink href="#" icon={<Instagram size={20} />} label="Instagram" />
                            <SocialLink href="#" icon={<Linkedin size={20} />} label="LinkedIn" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <FooterLink href="/" label="Home" />
                            <FooterLink href="/about" label="About Us" />
                            <FooterLink href="/services" label="Services" />
                            <FooterLink href="/contact" label="Contact" />
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <FooterLink href="/blog" label="Blog" />
                            <FooterLink href="/faq" label="FAQ" />
                            <FooterLink href="/support" label="Support Center" />
                            <FooterLink href="/terms" label="Terms of Service" />
                            <FooterLink href="/privacy" label="Privacy Policy" />
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start space-x-3">
                                <MapPin size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                                <span>123 Finance Street, Tech City, TC 90210</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={18} className="text-cyan-400 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={18} className="text-cyan-400 shrink-0" />
                                <span>support@nomisma.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Nomisma. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed with ❤️ for modern finance.</p>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <Link
        href={href}
        className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:-translate-y-1 transform inline-block"
        aria-label={label}
    >
        {icon}
    </Link>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <li>
        <Link href={href} className="hover:text-cyan-400 transition-colors duration-200 block">
            {label}
        </Link>
    </li>
);

export default Footer;
