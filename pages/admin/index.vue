<script setup lang="ts">
import { LucideArrowRight } from 'lucide-vue-next';
import apify from '~/composables/useAPI';
import type { IResponse, IUser } from '~/types';



definePageMeta({
    layout: "admin",
    middleware: ["is-admin", "is-auth"],
});

const { t } = useLang();
const { user } = useAuth();

const users = ref<IUser[]>([]);


const getUsers = async () => {
    let response = await $fetch<IResponse<IUser[]>>(apify("admin/users"), {
        method: "GET",
        headers: {
            "Authorization": `Token ${user.value?.token}`
        }
    });
    if (response.status === "success") {
        users.value = response.data;
    }
    console.log(response);
}

onMounted(() => {
    getUsers();
});
</script>


<template>
    <div class="p-5 md:p-10">
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{{ t("users") }}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="flex items-center justify-between">
                        <span class="text-3xl">{{ users.length }}</span>
                        <NuxtLink :to="{ name: 'admin-users' }" class="border rounded-full bg-accent/30 p-2">
                            <LucideArrowRight />
                        </NuxtLink>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>