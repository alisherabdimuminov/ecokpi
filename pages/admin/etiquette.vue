<script setup lang="ts">
import type { DateRange } from 'radix-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import { LucideCheck, LucideMoon, LucideRefreshCw, LucideSun, LucideX } from 'lucide-vue-next';
import apify from '~/composables/useAPI';
import { branches, departments, months, type IAttendance, type IAttendances, type IEtiquette, type IEtiquettes, type IResponse, type IUser } from '~/types';



definePageMeta({
    layout: 'admin',
});


const { t } = useLang();
const { user } = useAuth();


const etiquettes = ref<IEtiquettes>({});
const users = ref<IUser[]>([]);
const branch = ref();
const department = ref();
const isLoading = ref(false);
const date = ref<DateValue>();


const getEtiquette = async () => {
    let response = await $fetch<IResponse<IEtiquettes>>(apify("admin/etiquettes"), {
        method: "GET",
        query: {
            month: 1,
            year: 2024,
            branch: branch.value || "",
            department: department.value || "",
        }
    });
    if (response.status === "success") {
        etiquettes.value = response.data;
    }
}

const getUsers = async () => {
    console.log("get");
    let response = await $fetch<IResponse<IUser[]>>(apify("admin/users"), {
        method: "GET",
        headers: {
            "Authorization": `Token ${user.value?.token}`
        },
        query: {
            branch: branch.value,
            department: department.value,
        }
    });
    if (response.status === "success") {
        users.value = response.data;
    }
    console.log(response);
}


const updateEtiquette = async (iuser: IEtiquette, month: string | number) => {
    isLoading.value = true;
    let response = await $fetch(apify("admin/etiquettes/edit"), {
        method: "POST",
        body: JSON.stringify({
            "uuid": iuser.uuid,
            "point": iuser.point,
            "month": month,
        })
    });
    isLoading.value = false;
}


onMounted(() => {
    getUsers();
        getEtiquette();
});

watch(branch, () => {
    getUsers();
    getEtiquette();
});

watch(department, () => {
    getUsers();
    getEtiquette();
});


</script>

<template>
    <div class="flex flex-col gap-5 p-5 md:p-10">
        <ClientOnly>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <NuxtLink :to="{ name: 'admin' }">{{ t('home') }}</NuxtLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <NuxtLink :to="{ name: 'admin-users' }">{{ t('users') }}</NuxtLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {{ t("etiquette") }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ClientOnly>
        <div class="flex flex-col justify-between md:flex-row gap-3">
            <div class="w-full flex gap-3">
                <Select v-model="branch" default-value="0">
                    <SelectTrigger>
                        <SelectValue :placeholder="t('selectBranch')" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">{{ t("allBranches") }}</SelectItem>
                        <SelectItem v-for="branch in branches" :key="branch" :value="branch">{{ branch }}</SelectItem>
                    </SelectContent>
                </Select>
                <Select v-model="department" default-value="0">
                    <SelectTrigger>
                        <SelectValue :placeholder="t('selectDepartment')" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">{{ t("allDepartments") }}</SelectItem>
                        <SelectItem v-for="department in departments" :key="department" :value="department">{{ department }}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <!-- <ClientOnly> -->
            <div class="overflow-auto">
                <table class="border-separate border-spacing-0 border rounded-md whitespace-nowrap">
                    <thead>
                        <tr>
                            <th class="border sticky left-0 bg-background p-2">Xodim</th>
                            <th class="border p-2" v-for="data, monthName in etiquettes">
                                {{ monthName }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user, index in users" class="hover:bg-accent/50">
                            <td class="border sticky left-0 bg-background p-2">{{ user.full_name }}</td>
                            <td class="border text-center p-0" v-for="etiquette, monthName in etiquettes">
                                <Select v-if="etiquette.length > 0" v-model="etiquette[index].point" @update:model-value="updateEtiquette(etiquette[index], monthName)">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">0</SelectItem>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <!-- </ClientOnly> -->
    </div>
</template>
