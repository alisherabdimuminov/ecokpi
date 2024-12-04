<script setup lang="ts">
import { LucideLayoutGrid, LucideLogOut, LucideMoon, LucideSprout, LucideSun, LucideUser, LucideUserCheck, LucideUsers } from 'lucide-vue-next';

const { $t, changeLang } = useLang();
const colorMode = useColorMode();
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
                            <NuxtLink :to="{ name: 'index' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name === 'index' }">
                                <LucideLayoutGrid :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ $t("home") }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <NuxtLink :to="{ name: 'users' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name === 'users' }">
                                <LucideUsers :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ $t("users") }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <NuxtLink :to="{ name: 'attendance' }" class="flex rounded-md hover:bg-green-500/10 hover:text-green-500 p-2" :class="{ 'bg-green-500/10 text-green-500': $route.name === 'attendance' }">
                                <LucideUserCheck :size="20" />
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {{ $t("attendance") }} {{ $route.name === 'attendance' }}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
        <div class="h-full flex flex-col w-[calc(100%-3.1rem)] overflow-auto">
            <div class="h-[3rem] border-b bg-accent/30 flex items-center justify-between p-5">
                <p>Davlat ekologik ekspertizasi markazi</p>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <LucideUser />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56">
                        <DropdownMenuLabel>Alisher Abdimuminov</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>{{ $t('theme') }}</DropdownMenuLabel>
                        <DropdownMenuItem @click="colorMode.preference = 'light'">
                            {{ $t('light') }}
                            <DropdownMenuShortcut>
                                <LucideSun :size="16" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="colorMode.preference = 'dark'">
                            {{ $t('dark') }}
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
                        <DropdownMenuItem>
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
