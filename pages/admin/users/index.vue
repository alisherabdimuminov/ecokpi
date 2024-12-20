<script setup lang="ts">
import apify from '~/composables/useAPI';
import { branches, departments, type IResponse, type IUser } from '~/types';

definePageMeta({
    layout: "admin",
    middleware: ["is-auth", "is-admin"],
});

const { t } = useLang();
const { user } = useAuth();
const config = useRuntimeConfig();

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
                        <BreadcrumbPage>
                            {{ t('users') }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ClientOnly>

        <div class="flex flex-col md:flex-row gap-3">
            <Select>
                <SelectTrigger>
                    <SelectValue :placeholder="t('selectBranch')" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="branch in branches" :value="branch">{{ branch }}</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger>
                    <SelectValue :placeholder="t('selectDepartment')" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="department in departments" :value="department" :key="department">{{ department }}k</SelectItem>
                </SelectContent>
            </Select>
            <Button @click="navigateTo({ name: 'admin-users-add' })">{{ t("add") }}</Button>
        </div>

        <ClientOnly>
            <div class="border rounded-md">
                <Table class="whitespace-nowrap">
                    <TableHeader class="border-b">
                        <TableHead>ID</TableHead>
                        <TableHead>Foydalanuvchi nomi</TableHead>
                        <TableHead>Familiya Ism Sharif</TableHead>
                        <TableHead>Passport raqami</TableHead>
                        <TableHead>JShShR</TableHead>
                        <TableHead>Filiali</TableHead>
                        <TableHead>Bo'limi</TableHead>
                        <TableHead>Lavozimi</TableHead>
                        <TableHead v-if="user?.role === 'admin'">Roli</TableHead>
                        <TableHead>Rasmi</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="iuser in users">
                            <TableCell @click="navigateTo({ name: 'admin-users-uuid', params: { uuid: iuser.uuid } })">{{ iuser.pid }}</TableCell>
                            <TableCell @click="navigateTo({ name: 'admin-users-uuid', params: { uuid: iuser.uuid } })">{{ iuser.username }}</TableCell>
                            <TableCell @click="navigateTo({ name: 'admin-users-uuid', params: { uuid: iuser.uuid } })">{{ iuser.full_name }}</TableCell>
                            <TableCell>
                                <p class="spoiler">{{ iuser.passport_number }}</p>
                            </TableCell>
                            <TableCell>
                                <p class="spoiler">{{ iuser.passport_pinfl }}</p>
                            </TableCell>
                            <TableCell>{{ iuser.branch }}</TableCell>
                            <TableCell>{{ iuser.department }}</TableCell>
                            <TableCell>{{ iuser.position }}</TableCell>
                            <TableCell v-if="user?.role === 'admin'">{{ iuser.role }}</TableCell>
                            <TableCell>
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <img class="w-8 h-8 rounded-full" v-if="iuser.image" :src="config.public.base +  iuser.image" alt="">
                                    </HoverCardTrigger>
                                    <HoverCardContent class="p-0 rounded-md">
                                        <img class="w-64 h-64 rounded-md" v-if="iuser.image" :src="config.public.base +  iuser.image" alt="">
                                    </HoverCardContent>
                                </HoverCard>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </ClientOnly>
    </div>
</template>
