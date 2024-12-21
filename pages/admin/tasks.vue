<script setup lang="ts">
import { toast } from '~/components/ui/toast';
import apify from '~/composables/useAPI';
import { positions, type IResponse, type ITask } from '~/types';



definePageMeta({
    layout: "admin",
    middleware: ["is-admin", "is-auth"],
});

const { t } = useLang();

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
    let response = await $fetch<IResponse<ITask[]>>(apify("admin/tasks"), {
        method: "GET",
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

const addTask = async () => {
    let response = await $fetch<IResponse<string>>(apify("admin/tasks/add"), {
        method: "POST",
        body: JSON.stringify({
            "name": task.value.name,
            "position": task.value.position,
            "point": task.value.point,
            "term": task.value.term,
        })
    });
    if (response.status === "success") {
        toast({
            title: "Ajoyib",
            description: "Vazifa qo'shildi"
        });
    } else {
        toast({
            title: "Xatolik",
            description: "Adminga murojat qiling",
        });
    }
    getTasks();
    isOpen.value = false;
}

const deleteTask = async (task: ITask) => {
    let response = await $fetch<IResponse>(apify("admin/tasks/delete"), {
        method: "POST",
        body: JSON.stringify({
            "uuid": task.uuid
        })
    });
    if (response.status === "success") {
        toast({
            title: "Ajoyib",
            description: "Vazifa o'chirildi"
        });
    } else {
        toast({
            title: "Xatolik",
            description: "Adminga murojat qiling",
        });
    }
    getTasks();
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

        <div class="flex flex-col md:flex-row gap-5">
            <div class="w-full"></div>
            <div>
                <ClientOnly>
                    <Dialog v-model:open="isOpen">
                        <DialogTrigger>
                            <Button>{{ t("add") }}</Button>
                        </DialogTrigger>
                        <DialogContent class="h-96">
                            <DialogHeader>
                                <DialogTitle>{{ t("addNewTask") }}</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div>
                                <Label>Lavozimi</Label>
                                <Select v-model="task.position">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Lavozimni tanlang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="position in positions" :key="position" :value="position">{{ position }}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Label>Nomi</Label>
                                <Input v-model="task.name" />
                                <NumberField :default-value="20" v-model:model-value="task.point">
                                    <Label>Ball</Label>
                                    <NumberFieldContent>
                                        <NumberFieldDecrement />
                                        <NumberFieldInput />
                                        <NumberFieldIncrement />
                                    </NumberFieldContent>
                                </NumberField>
                                <Label>Muddati</Label>
                                <Select v-model="task.term">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Muddatni tanlang" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="regular">Doimiy</SelectItem>
                                        <SelectItem value="monthly">Oylik</SelectItem>
                                        <SelectItem value="quarter">Chorak</SelectItem>
                                        <SelectItem value="annual">Yillik</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <DialogClose>
                                    <Button>{{ t("close") }}</Button>
                                </DialogClose>
                                <Button @click="addTask">{{ t("add") }}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </ClientOnly>
            </div>
        </div>

        <div class="border rounded-md overflow-auto">
            <Table>
                <TableHeader>
                    <TableHead>#</TableHead>
                    <TableHead>Nomi</TableHead>
                    <TableHead>Bo'lim</TableHead>
                    <TableHead>Ball</TableHead>
                    <TableHead>Muddati</TableHead>
                    <TableHead>O'chirish</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="task, index in tasks">
                        <TableCell>{{ index+1 }}</TableCell>
                        <TableCell>{{ task.name }}</TableCell>
                        <TableCell>{{ task.position }}</TableCell>
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
                            <ClientOnly>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant="destructive">
                                            {{ t("delete") }}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{{ t("delete") }}</DialogTitle>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose>
                                                <Button>{{ t("close") }}</Button>
                                            </DialogClose>
                                            <DialogClose>
                                                <Button variant="destructive" @click="deleteTask(task)">{{ t("delete") }}</Button>
                                            </DialogClose>
                                        </DialogFooter>
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
