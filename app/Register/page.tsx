'use client'
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faFileLines, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Register() {

    const [language, setLanguage] = useState("en");
    const [isOpen, setIsOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                createdAt: serverTimestamp()
            });

            alert("Registration successful! You can now login.");
            // Ideally redirect here using useRouter, but for now just aleart and maybe clear form
            // router.push('/Auth');
        } catch (err: any) {
            setError(err.message);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <div className="p-8 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-2xl text-gray-500 tracking-[0.3em] font-light">N O M I S M A</h1>

                {/* Language Selector */}
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

                    {/* Dropdown Menu */}
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

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-[1000px] h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

                    {/* Left Side - Register Form */}
                    <div className="w-1/2 p-16 flex flex-col justify-center overflow-y-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2 tracking-wide">
                                Create Account
                            </h2>
                        </div>

                        <form className="space-y-4" onSubmit={handleRegister}>

                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="John"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                                    required
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
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#4A86C6] text-white py-3 rounded-lg font-bold hover:bg-[#3a75b5] transition-colors shadow-md text-lg mt-4"
                            >
                                Sign Up
                            </button>

                            <div className="text-center text-xs font-bold text-gray-700 mt-4">
                                Already have an account?
                                <Link href="/Auth" className="text-[#4A86C6] hover:text-blue-800 border-b border-[#4A86C6] pb-0.5 ml-1">
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Different Content for Register */}
                    <div className="w-1/2 bg-[#2D5386] text-white relative overflow-hidden flex flex-col p-10">
                        <div className="align-center flex justify-center">
                            <span className="text-xl">🌐</span>
                            <span className="font-medium text-sm pt-1">Support</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                            <div className="absolute top-1/4 left-10 w-20 h-20 bg-white opacity-20 rounded-full blur-xl"></div>
                            <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-blue-300 opacity-10 rounded-full blur-2xl"></div>

                            <Image
                                src="/rafiki.png"
                                alt="Illustration"
                                width={400}
                                height={320}
                                className="object-contain"
                            />

                            <div className="text-center max-w-sm mx-auto mt-8">
                                <h3 className="text-2xl font-bold mb-4 tracking-wide leading-tight">Join Our Community</h3>
                                <p className="text-blue-100 text-sm leading-relaxed opacity-80 font-normal">
                                    Create an account today to access exclusive features and track your favorite currencies in real-time.
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
