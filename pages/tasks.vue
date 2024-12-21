<script setup lang="ts">
import { toast } from '~/components/ui/toast';
import apify from '~/composables/useAPI';
import type { IResponse, ITask } from '~/types';



definePageMeta({
    layout: "default",
    middleware: ["is-auth", "is-not-admin"],
});

const { t } = useLang();
const { user } = useAuth();

const tasks = ref<ITask[]>([]);
const task = ref<ITask>({
    name: "",
    position: "",
    point: 20,
    term: "regular",
    uuid: "",
});
const isOpen = ref(false);


const getTasks = async () => {
    let response = await $fetch<IResponse<ITask[]>>(apify("user/tasks"), {
        method: "GET",
        headers: {
            "Authorization": `Token ${user.value?.token}`
        }
    });

    if (response.status === "success") {
        tasks.value = response.data;
    } else {
        toast({
            title: "Xatolik",
            description: "Adminga murojat qiling",
        });
    }
}

onMounted(() => {
    getTasks();
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
                        <BreadcrumbPage>
                            {{ t("tasks") }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ClientOnly>

        <div class="border rounded-md overflow-auto">
            <Table>
                <TableHeader>
                    <TableHead>#</TableHead>
                    <TableHead>Nomi</TableHead>
                    <TableHead>Ball</TableHead>
                    <TableHead>Muddati</TableHead>
                    <TableHead>O'chirish</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="task, index in tasks">
                        <TableCell>{{ index+1 }}</TableCell>
                        <TableCell>{{ task.name }}</TableCell>
                        <TableCell>
                            <span class="border rounded-full p-2 bg-accent/30">{{ task.point }}</span>
                        </TableCell>
                        <TableCell>
                            <span class="text-green-500" v-if="task.term === 'monthly'">Oylik</span>
                            <span class="text-green-500" v-else-if="task.term === 'quarter'">Chorak</span>
                            <span class="text-green-500" v-else-if="task.term === 'regular'">Doimiy</span>
                            <span class="text-green-500" v-else-if="task.term === 'annual'">Yillik</span>
                        </TableCell>
                        <TableCell class="w-4">
                            <Button>Topshirish</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>
