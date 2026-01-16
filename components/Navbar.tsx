
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-center pt-10">
            <div className="w-[1000px] h-20 bg-blue-500 rounded-4xl grid grid-cols-3 items-center px-6 opacity-60 backdrop-blur-2xl">
                {/* Left: Logo */}
                <Link href="/" className="text-white font-serif justify-self-start text-xl tracking-widest font-bold">
                    N O M I S M A
                </Link>

                {/* Center: Links */}
                <div className="flex gap-8 justify-self-center">
                    <Link href="/" className="text-white font-medium hover:text-gray-200 transition-colors">
                        Home
                    </Link>
                    <Link href="/" className="text-white font-medium hover:text-gray-200 transition-colors">
                        About
                    </Link>
                    <Link href="/" className="text-white font-medium hover:text-gray-200 transition-colors">
                        Contact
                    </Link>
                </div>

                <button className="justify-self-end bg-blue-600 rounded-[15px] px-4 py-3 mr-15 w-[150px] hover:bg-blue-700 transition-colors">
                    <Link href="/" className="text-white font-medium hover:text-gray-200 transition-colors">
                        Account
                    </Link>
                </button>
            </div>
        </div>
    );
}
