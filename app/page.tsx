'use client'
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Navbar />
    </div>
  );
}
