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
                            <NuxtLink :to="{ name: 'index' }">{{ $t('users') }}</NuxtLink>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {{ $t('attendance') }}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </ClientOnly>

        <div class="flex flex-col justify-between md:flex-row gap-3">
            <div></div>
            <Button @click="">{{ $t('save') }}</Button>
        </div>

        <ClientOnly>
            <div class="border rounded-md">
                <Table class="whitespace-nowrap">
                    <TableHeader class="border-b">
                        <TableHead>Familiya Ism Sharif</TableHead>
                        <TableHead>Passport raqami</TableHead>
                        <TableHead>JShShR</TableHead>
                        <TableHead>Filiali</TableHead>
                        <TableHead>Bo'limi</TableHead>
                        <TableHead>Lavozimi</TableHead>
                        <TableHead>Davomat</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="_ in 10">
                            <TableCell>Abdimuminov Alisher Baxodir o'g'li</TableCell>
                            <TableCell>
                                <p class="spoiler">AD0948593</p>
                            </TableCell>
                            <TableCell>
                                <p class="spoiler">1234567890</p>
                            </TableCell>
                            <TableCell>Samarqand viloyati filiali</TableCell>
                            <TableCell>Raxbariyat</TableCell>
                            <TableCell>CEO</TableCell>
                            <TableCell>
                                <Switch :default-checked="true" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </ClientOnly>
    </div>
</template>
