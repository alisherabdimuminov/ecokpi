<script setup lang="ts">
import { LucideCloudDownload } from 'lucide-vue-next';
import { toast } from '~/components/ui/toast';
import apify from '~/composables/useAPI';
import type { IResponse, ISubmit } from '~/types';



definePageMeta({
    layout: "admin",
    middleware: ["is-auth", "is-admin"],
});

const { t } = useLang();
const { user } = useAuth();

const submits = ref<ISubmit[]>([]);


const getSubmits = async () => {
    let response = await $fetch<IResponse<ISubmit[]>>(apify("admin/submits"), {
        method: "GET",
        headers: {
            "Authorization": `Token ${user.value?.token}`
        }
    });

    if (response.status === "success") {
        submits.value = response.data;
    } else {
        toast({
            title: "Xatolik",
            description: "Adminga murojat qiling",
        });
    }
}

const changeSubmitStatus = async (submit: ISubmit) => {
    let response = await $fetch(apify("admin/submits/change"), {
        method: "POST",
        body: JSON.stringify({
            "uuid": submit.uuid,
            "status": submit.status,
        }),
        headers: {
            "Authorization": `Token ${user.value?.token}`
        }
    });
    getSubmits();
}


onMounted(() => {
    getSubmits();
});

</script>

<template>
    <div class="p-5 md:p-10 flex flex-col gap-5">
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
        <div class="border rounded-md overflow-auto">
            <Table>
                <TableHeader class="border-b">
                    <TableHead>#</TableHead>
                    <TableHead>Xodim</TableHead>
                    <TableHead>Vazifa</TableHead>
                    <TableHead>Holati</TableHead>
                    <TableHead>Vaqt</TableHead>
                    <TableHead>Fayl</TableHead>
                    <TableHead>Harakat</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="submit, index in submits" :key="submit.uuid">
                        <TableCell>{{ index+1 }}</TableCell>
                        <TableCell>{{ submit.user.full_name }}</TableCell>
                        <TableCell>{{ submit.task.name }}</TableCell>
                        <TableCell>
                            <span class="border border-green-500 bg-green-500/10 rounded p-1 text-green-500" v-if="submit.status === 'approved'">Tasdiqlangan</span>
                            <span class="border border-blue-500 bg-blue-500/10 rounded p-1 text-blue-500" v-else-if="submit.status === 'created'">Yaratilgan</span>
                            <span class="border border-orange-500 bg-orange-500/10 rounded p-1 text-orange-500" v-else-if="submit.status === 'in_process'">Ko'rib chiqilmoqda</span>
                            <span class="border border-red-500 bg-red-500/10 rounded p-1 text-red-500" v-else-if="submit.status === 'rejected'">Rad etilgan</span>
                        </TableCell>
                        <TableCell>{{ submit.created }}</TableCell>
                        <TableCell>
                            <LucideCloudDownload class="hover:cursor-pointer hover:text-green-500" @click="navigateTo($config.public.base + submit.file, { external: true, open: { target: '_blank' } })" />
                        </TableCell>
                        <TableCell>
                            <ClientOnly>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button size="sm">Baholash</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Topshiriqni baholash</DialogTitle>
                                            <DialogDescription></DialogDescription>
                                            <div>
                                                <Label>Holati {{ submit.status }}</Label>
                                                <Select v-model="submit.status">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Holatini tanlang" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="approved">
                                                            <span class="border border-green-500 bg-green-500/10 rounded p-1 text-green-500">Tasdiqlangan</span>
                                                        </SelectItem>
                                                        <SelectItem value="in_process">
                                                            <span class="border border-orange-500 bg-orange-500/10 rounded p-1 text-orange-500">Ko'rib chiqilmoqda</span>
                                                        </SelectItem>
                                                        <SelectItem value="created">
                                                            <span class="border border-blue-500 bg-blue-500/10 rounded p-1 text-blue-500">Yaratilgan</span>
                                                        </SelectItem>
                                                        <SelectItem value="rejected">
                                                            <span class="border border-red-500 bg-red-500/10 rounded p-1 text-red-500">Rad etilgan</span>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <Button>{{ t("close") }}</Button>
                                                </DialogClose>
                                                <DialogClose>
                                                    <Button @click="changeSubmitStatus(submit)">Baholash</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </ClientOnly>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
