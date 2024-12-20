<script setup lang="ts">
import type { DateRange } from 'radix-vue'
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date'
import { LucideCheck, LucideMoon, LucideRefreshCw, LucideSun, LucideX } from 'lucide-vue-next';
import apify from '~/composables/useAPI';
import { branches, departments, type IAttendance, type IAttendances, type IResponse, type IUser } from '~/types';



definePageMeta({
    layout: 'admin',
    middleware: ["is-auth", "is-admin"],
});


const { t } = useLang();
const { user } = useAuth();


const attendances = ref<IAttendances>({});
const users = ref<IUser[]>([]);
const end = today(getLocalTimeZone());
const start = end.subtract({ days: 7 });
const value = ref({
    start,
    end,
}) as Ref<DateRange>;
const branch = ref();
const department = ref();
const isLoading = ref(false);
const isOpen = ref(false);


const getAttendances = async (start: DateValue, end: DateValue) => {
    let response = await $fetch<IResponse<IAttendances>>(apify("admin/attendances"), {
        method: "GET",
        query: {
            start_day: start.day,
            start_month: start.month,
            start_year: start.year,

            end_day: end.day,
            end_month: end.month,
            end_year: end.year,

            branch: branch.value || "",
            department: department.value || "",
        }
    });
    if (response.status === "success") {
        attendances.value = response.data;
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

const handleUpdateValue = () => {
    getUsers();
    if (value.value.start && value.value.end) {
        getAttendances(value.value.start, value.value.end);
    }
}

const updateAttendance = async (iuser: IAttendance, date: string | number) => {
    isLoading.value = true;
    let response = await $fetch(apify("admin/attendances/edit"), {
        method: "POST",
        body: JSON.stringify({
            "uuid": iuser.uuid,
            "date": date,
        })
    });
    isLoading.value = false;
    isOpen.value = false;
}


onMounted(() => {
    getUsers();
    if (value.value.start && value.value.end) {
        getAttendances(value.value.start, value.value.end);
    }
});

watch(branch, () => {
    getUsers();
    if (value.value.start && value.value.end) {
        getAttendances(value.value.start, value.value.end);
    }
});

watch(department, () => {
    getUsers();
    if (value.value.start && value.value.end) {
        getAttendances(value.value.start, value.value.end);
    }
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
                            {{ t('attendance') }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ClientOnly>
        <div class="flex flex-col justify-between md:flex-row gap-3">
            <div class="w-full flex flex-col md:flex-row gap-3">
                <Select v-model="branch" default-value="0">
                    <SelectTrigger>
                        <SelectValue placeholder="Filialni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">{{ t("allBranches") }}</SelectItem>
                        <SelectItem v-for="branch in branches" :key="branch" :value="branch">{{ branch }}</SelectItem>
                    </SelectContent>
                </Select>
                <Select v-model="department" default-value="0">
                    <SelectTrigger>
                        <SelectValue placeholder="Bo'limni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">{{ t("allDepartments") }}</SelectItem>
                        <SelectItem v-for="department in departments" :key="department" :value="department">{{ department }}</SelectItem>
                    </SelectContent>
                </Select>
                <ClientOnly>
                    <Popover>
                        <PopoverTrigger>
                            <Button class="font-bold">
                                <span class="text-blue-500">{{ value.start }}</span> - <span class="text-green-500">{{ value.end }}</span> </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <RangeCalendar v-model="value" @update:model-value="handleUpdateValue"/>
                            </PopoverContent>
                        </Popover>
                </ClientOnly>
            </div>
        </div>
        <!-- <ClientOnly> -->
            <div class="overflow-auto">
                <table class="border-separate border-spacing-0 border rounded-md whitespace-nowrap">
                    <thead>
                        <tr>
                            <th class="border sticky left-0 bg-background p-2">Xodim</th>
                            <th class="border p-2" v-for="_, date in attendances">
                                {{ date }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user, index in users" class="hover:bg-accent/50">
                            <td class="border sticky left-0 bg-background p-2">{{ user.full_name }}</td>
                            <td class="border text-center" v-for="attendance, date in attendances">
                                <Dialog v-if="attendance[index]">
                                    <DialogTrigger>
                                        <div class="border rounded-md w-full h-full flex justify-center items-center" v-if="attendance.length > 0">
                                            <LucideCheck v-if="attendance[index].is_arrived" class="text-green-500" /> 
                                            <LucideX v-else class="text-red-500" /> 
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{{ attendance[index].full_name }} - {{ date }}</DialogTitle>
                                            <DialogDescription>Davomat</DialogDescription>
                                        </DialogHeader>
                                        <Label>Holati</Label>
                                        <Switch  v-model:checked="attendance[index].is_arrived" />
                                        <DialogFooter>
                                            <DialogClose>
                                                <Button variant="destructive">Yopish</Button>
                                            </DialogClose>
                                            <Button @click="updateAttendance(attendance[index], date)">
                                                <LucideRefreshCw v-if="isLoading" class="animate-spin" />
                                                <span>Saqlash</span>
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <!-- </ClientOnly> -->
    </div>
</template>
