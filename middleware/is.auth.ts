import useAuth from "~/composables/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuth();
    console.log(user.value);
    if (user.value === null) {
        return navigateTo({ name: "auth-login" });
    }
});