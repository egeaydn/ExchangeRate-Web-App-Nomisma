'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => { router.push('/Auth') }}
        className="bg-blue-500 text-white p-2 rounded"
      >
        login
      </button>
    </div>
  );
}
