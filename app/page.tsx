'use client';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ExchangeTable from "@/components/ExchangeTable";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-screen w-full bg-slate-900">
      <div
        className="h-[60vh] w-full bg-cover bg-center flex flex-col items-center relative"
        style={{ backgroundImage: "url('/dashboard-ımage.png')" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <Navbar />

        <div className="flex-1 flex items-center justify-center w-full px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-bold text-white text-center drop-shadow-2xl max-w-5xl leading-tight opacity-90"
          >
            We Are The Best Place to<br />
            Find The Most Accurate<br />
            Exchange Rates.
          </motion.h1>
        </div>
      </div>

      <div className="w-full flex justify-center -mt-20 px-0 relative">
        <ExchangeTable />
      </div>
    </main>
  );
}
