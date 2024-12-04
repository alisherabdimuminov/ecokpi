<script setup lang="ts">

const { $t } = useLang();
</script>

<template>
    <div class="flex flex-col gap-5 p-5 md:p-10">
        <ClientOnly>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <NuxtLink :to="{ name: 'index' }">{{ $t('home') }}</NuxtLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <NuxtLink :to="{ name: 'users' }">{{ $t('users') }}</NuxtLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {{ $t('add') }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ClientOnly>

        <div class="flex flex-col md:flex-row gap-3">
            <Card class="w-full bg-accent/30">
                <CardHeader>
                    <CardTitle>Ma'lumotlar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>ID</Label>
                    <Input />

                    <Label>Foydalanuvchi nomi</Label>
                    <Input />

                    <Label>Familiya Ism Sharifi</Label>
                    <Input />
                </CardContent>
            </Card>
            <Card class="w-ful md:w-64 h-66 bg-accent/30">
                <CardHeader>
                    <CardTitle>Rasmi</CardTitle>
                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
        <Card class="w-ful bg-accent/30">
            <CardHeader>
                <CardTitle>Rasmi</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col md:flex-row gap-3">
                    <div class="w-full">
                        <Label>Passport raqami</Label>
                        <Input />
                    </div>
                    <div class="w-full">
                        <Label>JShShR</Label>
                        <Input />
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-3">
                    <div class="w-full">
                        <Label>Filial</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Filialni tanlang" />
                            </SelectTrigger>
                        </Select>
                    </div>
                    <div class="w-full">
                        <Label>Bo'lim</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Bo'limni tanlang" />
                            </SelectTrigger>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
