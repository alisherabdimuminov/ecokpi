import { translate, type ITranslation, type TLanguage } from "~/locale";

export default function useLang() {
    const langCookie = useCookie<TLanguage>("lang", {
        watch: "shallow",
        maxAge: 604800, // 1 week
        path: "/",
        default: () => "uz",
    });

    const lang = computed(() => {
        return langCookie.value;
    });

    const $t = computed(() => {
        return (key: keyof ITranslation) => {
            return translate(lang.value, key);
        }
    });

    const changeLang = (lang: TLanguage) => {
        langCookie.value = lang;
    } 

    return {
        lang,
        $t,
        changeLang,
    }
}