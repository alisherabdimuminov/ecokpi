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
                        <BreadcrumbPage>
                            {{ $t('users') }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ClientOnly>

        <div class="flex flex-col md:flex-row gap-3">
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Filialni tanlang" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="hey">Test</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Bo'limni tanlang" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="hey">Test</SelectItem>
                </SelectContent>
            </Select>
            <Button @click="navigateTo({ name: 'users-add' })">Qo'shish</Button>
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
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="_ in 10" @click="navigateTo({ name: 'users-uuid', params: { uuid: '123' } })">
                            <TableCell>1</TableCell>
                            <TableCell>alisher</TableCell>
                            <TableCell>Abdimuminov Alisher Baxodir o'g'li</TableCell>
                            <TableCell>
                                <p class="spoiler">AA1111111</p>
                            </TableCell>
                            <TableCell>
                                <p class="spoiler">1234567890</p>
                            </TableCell>
                            <TableCell>Samarqand viloyati filiali</TableCell>
                            <TableCell>Raxbariyat</TableCell>
                            <TableCell>CEO</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </ClientOnly>
    </div>
</template>
