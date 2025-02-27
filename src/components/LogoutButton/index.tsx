"use client"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/actions/auth"
import { LogOut } from "lucide-react"


export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();
        router.push("/auth/login")
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
            <LogOut size={20} />
            Logout
        </button>
    )
}  