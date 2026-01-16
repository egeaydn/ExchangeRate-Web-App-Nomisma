'use client'
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faFileLines, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

    const [language, setLanguage] = useState("en");
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            router.push('/');
        } catch (err: any) {
            setError(err.message);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <div className="p-8 flex justify-between items-center">
                <h1 className="text-2xl text-gray-500 tracking-[0.3em] font-light">N O M I S M A</h1>

                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center space-x-3 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-3xl filter drop-shadow-sm leading-none">
                            {language === "en" ? "🇺🇸" : "🇹🇷"}
                        </span>
                        <span className="text-lg font-bold text-gray-700">
                            {language === "en" ? "EN" : "TR"}
                        </span>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-full min-w-[140px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <div
                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0 rounded-t-md"
                                onClick={() => handleLanguageChange("en")}
                            >
                                <span className="text-2xl leading-none">🇺🇸</span>
                                <span className="font-bold text-gray-700">EN</span>
                            </div>
                            <div
                                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-b-md"
                                onClick={() => handleLanguageChange("tr")}
                            >
                                <span className="text-2xl leading-none">🇹🇷</span>
                                <span className="font-bold text-gray-700">TR</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-[1000px] h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

                    <div className="w-1/2 p-16 flex flex-col justify-center">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2 tracking-wide">Sign In</h2>
                        </div>

                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Please enter your email address."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Please enter your password."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#4A86C6] text-white py-3 rounded-lg font-bold hover:bg-[#3a75b5] transition-colors shadow-md text-lg"
                            >
                                Login
                            </button>

                            <div className="flex items-center justify-between text-xs mt-4">
                                <label className="flex items-center cursor-pointer select-none">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                    <span className="ml-2 font-bold text-gray-800">Remember Me</span>
                                </label>
                                <a href="#" className="font-bold text-[#4A86C6] hover:text-blue-800 border-b border-[#4A86C6] pb-0.5">Forgot Password</a>
                            </div>

                            <div className="relative flex py-4 items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 font-bold text-xs">or</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            <div className="text-center text-xs font-bold text-gray-700">
                                Don't have an Account?
                                <Link href="/Register" className="text-[#4A86C6] hover:text-blue-800 border-b border-[#4A86C6] pb-0.5 ml-1">
                                    Create Now
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="w-1/2 bg-[#2D5386] text-white relative overflow-hidden flex flex-col p-10">
                        <div className="align-center flex justify-center">
                            <span className="text-xl">🌐</span>
                            <span className="font-medium text-sm pt-1">Support</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                            <div className="absolute top-1/4 right-10 w-20 h-20 bg-white opacity-20 rounded-full blur-xl"></div>
                            <div className="absolute bottom-1/3 left-10 w-32 h-32 bg-blue-300 opacity-10 rounded-full blur-2xl"></div>

                            <Image
                                src="/rafiki.png"
                                alt="Logo"
                                width={457}
                                height={369}
                            />

                            <div className="text-center max-w-sm mx-auto">
                                <h3 className="text-lg font-bold mt-5 mb-10 tracking-wide leading-tight">If you want the best, come here.</h3>
                                <p className=" text-sm text-gray-300 font-serif">
                                    If you want to view the exchange rates for your desired currency in the most accurate and fastest way with the most successful interface, join us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="flex flex-col">
                <div className="flex justify-between text-gray-500 text-sm">
                    <p className=" m-6">© 2026 Nomisma. All rights reserved.</p>
                    <div className="flex gap-4 m-6 items-center ">
                        <a href="#" className="flex items-center gap-2 hover:text-blue-800">
                            <FontAwesomeIcon icon={faLock} className="w-3 h-3" />Privacy Policy</a>
                        <a href="#" className="flex items-center gap-2 hover:text-blue-800">
                            <FontAwesomeIcon icon={faFileLines} />Terms</a>
                        <a href="#" className="flex items-center gap-2 hover:text-blue-800">
                            <FontAwesomeIcon icon={faCircleQuestion} />Get Help</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}