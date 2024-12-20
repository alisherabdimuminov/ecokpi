<script setup lang="ts">
import { LucideRefreshCw } from 'lucide-vue-next';
import { toast } from '~/components/ui/toast';
import apify from '~/composables/useAPI';
import type { IResponse, IUser } from '~/types';


definePageMeta({
    layout: 'auth',
});

const { login } = useAuth();

const user = ref({
    username: "",
    password: "",
});
const isLoading = ref(false);


const loginHandler = async () => {
    isLoading.value = true;
    if (user.value.username === "") {
        toast({
            title: "Xatolik",
            description: "Foydalanuvchi nomi maydonini to'ldiring",
        });
    } else if (user.value.password === "") {
        toast({
            title: "Xatolik",
            description: "Parol maydonini to'ldiring",
        });
    } else {
        let response = await $fetch<IResponse<IUser>>(apify("auth/login"), {
            method: "POST",
            body: JSON.stringify({
                "username": user.value.username,
                "password": user.value.password,
            }),
        });
        if (response.status === "success") {
            login(response.data);
            toast({
                title: "Ajoyib",
                description: "Tizimga kirish muvafaqqiyatli amalga oshirildi",
            });
        } else {
            if (response.code === "001") {
                toast({
                    title: "Xatolik",
                    description: "Noto'g'ri parol. Qaytadan urinib ko'ring",
                });
            } else if (response.code === "002") {
                toast({
                    title: "Xatolik",
                    description: "Foydalanuvchi topilmadi. Qaytadan urinib ko'ring",
                });
            } else if (response.code === "003") {
                toast({
                    title: "Xatolik",
                    description: "Mayodonlarnig to'ldirib qaytadan urinib ko'ring",
                });
            }
        }
    }
    isLoading.value = false;
}

</script>


<template>
    <div class="w-full px-5 flex flex-col gap-3">
        <p class="text-center font-bold">KPI tizimiga kirish</p>
        <div>
            <Label>Foydalanuvchi nomi</Label>
            <Input v-model="user.username" :disabled="isLoading" />
        </div>
        <div>
            <Label>Parol</Label>
            <Input v-model="user.password" :disabled="isLoading" />
        </div>
            <Button @click="loginHandler" class="w-full" :disabled="isLoading">
                <LucideRefreshCw v-if="isLoading" class="animate-spin" />
                <span>Kirish</span>
            </Button>
    </div>
</template>