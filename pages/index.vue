<script setup lang="ts">


definePageMeta({
    middleware: ["is-auth", "is-not-admin"]
});

const { user } = useAuth();
</script>

<template>
    <div class="p-5 md:p-10">
        {{ user?.full_name }}
    </div>
</template>
