import type { IUser } from "~/types";

export default function useAuth() {
    const router = useRouter();
    const userCookie = useCookie<IUser | null>("user", {
        watch: "shallow",
        default: () => null,
        sameSite: "lax",
    });

    const user = computed(() => {
        try {
            let user: IUser | null = JSON.parse(JSON.stringify(userCookie.value));
            return user;
        } catch {
            console.log(typeof userCookie.value);
            return null;
        }
    });

    const login = (user: IUser) => {
        userCookie.value = user;
        if (user.role === "admin" || user.role === "analyst" || user.role === "cadre") {
            router.push({ name: "admin" });
        } else {
            router.push("/");
        }
    }

    const logout = () => {
        userCookie.value = null;
        router.push({ name: "auth-login" });
    }

    return {
        user,
        login,
        logout,
    }
} 