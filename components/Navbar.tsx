import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleAuthAction = () => {
        if (user) {
            router.push('/account');
        } else {
            router.push('/Auth');
        }
    };

    return (
        <div className="flex justify-center pt-10 relative z-20">
            <div className="w-[1000px] h-20 bg-blue-900/40 rounded-full grid grid-cols-[auto_1fr_auto] items-center px-8 opacity-90 backdrop-blur-md shadow-lg border border-white/10">
                <Link href="/" className="text-white font-serif justify-self-start text-xl tracking-widest font-bold flex flex-col items-center leading-none">
                    <span className="text-white text-2xl font-serif">N O M I S M A</span>
                </Link>
                <div className="flex gap-8 justify-self-center items-center">
                    <Link href="/" className="text-gray-300 text-sm font-medium hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/" className="text-white text-sm font-medium hover:text-gray-200 transition-colors">
                        Exchange Rates
                    </Link>
                    <Link href="/" className="text-white text-sm font-medium hover:text-gray-200 transition-colors">
                        All Courses
                    </Link>
                    <Link href="/" className="text-white text-sm font-medium hover:text-gray-200 transition-colors">
                        Currency Converter
                    </Link>
                </div>
                {!loading && (
                    <button
                        onClick={handleAuthAction}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-lg"
                    >
                        {user ? 'Account' : 'Sign In'}
                    </button>
                )}
            </div>
        </div>
    );
}
