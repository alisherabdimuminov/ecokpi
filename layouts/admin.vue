<script setup lang="ts">
import { LucideBriefcaseBusiness, LucideGitBranch, LucideLandmark, LucideLayers2, LucideLayoutGrid, LucideListTodo, LucideLogOut, LucideMoon, LucideSend, LucideSprout, LucideSun, LucideUser, LucideUserCheck, LucideUsers } from 'lucide-vue-next';
import apify from '~/composables/useAPI';

const { t, changeLang } = useLang();
const colorMode = useColorMode();
const { user, logout } = useAuth();
</script>

<template>
    <div class="h-screen w-full flex">
        <div class="flex flex-col w-14 border-r bg-accent/30">
            <div class="h-[3rem] w-full flex items-center justify-center">
                <img class="w-8" src="/assets/images/logo.png" alt="">
            </div>
            <div class="flex flex-col items-center justify-center gap-1 mt-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <NuxtLink :to="{ name: 'admin' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name === 'admin' }">
                                <LucideLayoutGrid :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ t("home") }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <NuxtLink :to="{ name: 'admin-users' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name?.toString().includes('users') }">
                                <LucideUsers :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ t("users") }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <NuxtLink :to="{ name: 'admin-attendance' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name === 'admin-attendance' }">
                                <LucideUserCheck :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ t("attendance") }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <NuxtLink :to="{ name: 'admin-etiquette' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name === 'admin-etiquette' }">
                                <LucideBriefcaseBusiness :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ t("attendance") }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <NuxtLink :to="{ name: 'admin-tasks' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name === 'admin-tasks' }">
                                <LucideListTodo :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ t("attendance") }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <NuxtLink :to="{ name: 'admin-submits' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name === 'admin-submits' }">
                                <LucideSend :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ t("attendance") }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
        <div class="h-full flex flex-col w-[calc(100%-3.1rem)] overflow-auto">
            <div class="h-[3rem] border-b bg-accent/30 flex items-center justify-between p-5">
                <div class="">
                    <p>Davlat ekologik ekspertizasi markazi</p>
                    <p class="text-xs font-bold">Admin</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <LucideUser />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-64">
                        <DropdownMenuLabel>Profil</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <div class="w-6">
                                <img v-if="user && user.image" :src="user?.image" class="w-6 h-6 rounded-full" alt="">
                                <LucideUser v-else :size="16" />
                            </div>
                            <span class="truncate">{{ user?.full_name }}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>{{ t('theme') }}</DropdownMenuLabel>
                        <DropdownMenuItem @click="colorMode.preference = 'light'">
                            {{ t('light') }}
                            <DropdownMenuShortcut>
                                <LucideSun :size="16" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="colorMode.preference = 'dark'">
                            {{ t('dark') }}
                            <DropdownMenuShortcut>
                                <LucideMoon :size="16" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Til</DropdownMenuLabel>
                        <DropdownMenuItem @click="changeLang('uz')">
                            O'zbek
                            <DropdownMenuShortcut>
                                🇺🇿
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="changeLang('en')">
                            English
                            <DropdownMenuShortcut>
                                🇬🇧
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="changeLang('ru')">
                            Русский
                            <DropdownMenuShortcut>
                                🇷🇺
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="logout">
                            Chiqish
                            <DropdownMenuShortcut>
                                <LucideLogOut :size="16" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ScrollArea>
                <slot />
            </ScrollArea>
        </div>
    </div>
</template>
