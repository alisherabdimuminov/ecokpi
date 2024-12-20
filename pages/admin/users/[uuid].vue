<script setup lang="ts">
import { toast } from '~/components/ui/toast';
import apify from '~/composables/useAPI';
import { branches, departments, positions, roles, type IResponse, type IUser } from '~/types';


definePageMeta({
    layout: "admin",
    middleware: ["is-auth", "is-admin"],
});

const { t } = useLang();
const { user } = useAuth();
const route = useRoute();

const iuser = ref<IUser>({
    branch: "",
    department: "",
    full_name: "",
    image: "",
    passport_number: "",
    passport_pinfl: "",
    pid: "",
    position: "",
    role: "user",
    token: "",
    username: "",
    uuid: "",
});


const getUser = async () => {
    let response = await $fetch<IResponse<IUser>>(apify(`admin/users/user/${route.params.uuid}`), {
        method: "GET",
        headers: {
            "Authorization": `Token ${user.value?.token}`
        }
    });

    if (response.status === "success") {
        iuser.value = response.data;
    }
}


const editUser = async () => {
    let form = new FormData();
    let image = document.getElementById("image") as HTMLInputElement;
    form.append("branch", iuser.value.branch);
    form.append("department", iuser.value.department);
    form.append("full_name", iuser.value.full_name);
    form.append("passport_number", iuser.value.passport_number);
    form.append("passport_pinfl", iuser.value.passport_pinfl);
    form.append("pid", iuser.value.pid);
    form.append("position", iuser.value.position);
    form.append("role", iuser.value.role);
    form.append("username", iuser.value.username);
    if (image && image.files) {
        if (image.files[0]) {
            form.append("image", image.files[0]);
        }
    }

    let response = await $fetch<IResponse<{ errors: string[] }>>(apify(`admin/users/edit/${route.params.uuid}`), {
        method: "POST",
        body: form,
        headers: {
            "Authorization": `Token ${user.value?.token}`
        },
    });

    if (response.status === "success") {
        toast({
            title: "Ajoyib",
            description: "Xodim tahrirlandi"
        });
        // navigateTo({ name: "admin-users" });
        getUser();
    } else {
        toast({
            title: "Xatolik",
            description: "Majburiy maydonlarni to'ldiring",
        });
    }

}


onMounted(() => {
    getUser();
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
                            {{ t('add') }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ClientOnly>
        <div class="flex justify-between">
            <div></div>
            <div>
                <Button @click="editUser">{{ t("save") }}</Button>
            </div>
        </div>
        <div class="flex flex-col md:flex-row gap-3">
            <Card class="w-full bg-accent/30">
                <CardHeader>
                    <CardTitle>Ma'lumotlar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>ID</Label>
                    <Input v-model="iuser.pid" />

                    <Label>Foydalanuvchi nomi</Label>
                    <Input v-model="iuser.username" />

                    <Label>Familiya Ism Sharifi</Label>
                    <Input v-model="iuser.full_name" />
                </CardContent>
            </Card>
            <Card class="w-ful md:w-72 h-66 bg-accent/30">
                <CardHeader>
                    <CardTitle>Rasmi</CardTitle>
                </CardHeader>
                <CardContent class="flex flex-col items-center gap-2">
                    <img :src="$config.public.base + iuser.image" class="w-56 h-56 rounded-md" alt="">
                    <Input type="file" name="image" id="image" />
                </CardContent>
            </Card>
        </div>
        <Card class="w-ful bg-accent/30">
            <CardHeader>
                <CardTitle>Ish malumotlari</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col md:flex-row gap-3">
                    <div class="w-full">
                        <Label>Passport raqami</Label>
                        <Input v-model="iuser.passport_number" />
                    </div>
                    <div class="w-full">
                        <Label>JShShR</Label>
                        <Input v-model="iuser.passport_pinfl" />
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-3">
                    <div class="w-full">
                        <Label>Filial</Label>
                        <Select v-model="iuser.branch">
                            <SelectTrigger>
                                <SelectValue placeholder="Filialni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="branch in branches" :key="branch" :value="branch">{{ branch }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="w-full">
                        <Label>Bo'lim</Label>
                        <Select v-model="iuser.department">
                            <SelectTrigger>
                                <SelectValue placeholder="Bo'limni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="department in departments" :key="department" :value="department" >{{ department }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="w-full">
                        <Label>Lavozimi</Label>
                        <Select v-model="iuser.position">
                            <SelectTrigger>
                                <SelectValue placeholder="Lavozimni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="position in positions" :key="position" :value="position" >{{ position }}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card class="w-ful bg-accent/30">
            <CardHeader>
                <CardTitle>Admin</CardTitle>
            </CardHeader>
            <CardContent>
                <Label>Rol</Label>
                <Select v-model="iuser.role">
                    <SelectTrigger>
                        <SelectValue placeholder="Rolni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="role in roles" :key="role" :value="role" >
                            <span v-if="role === 'admin'">Admin</span>
                            <span v-if="role === 'analyst'">Mutaxasis axborot tahlil</span>
                            <span v-if="role === 'cadre'">Mutaxasis kadr</span>
                            <span v-if="role === 'user'">Xodim</span>
                            <span v-if="role === 'userx'">XodimX</span>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    </div>
</template>
