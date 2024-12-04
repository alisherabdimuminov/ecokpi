<script setup lang="ts">
import Toaster from './components/ui/toast/Toaster.vue';
import Sonner from './components/ui/sonner/Sonner.vue';
</script>

<template>
    <div>
        <Toaster />
        <Sonner />
        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style>
.spoiler{
    color: transparent;
    border-left: none;
    text-shadow: 0 0 10px #000000;
    border:none ;
    transition: 0.5s all;
}
.spoiler:hover{
    color: var(--text-color);
    text-shadow: none;
}

.dark {
    .spoiler{
        color: transparent;
        border-left: none;
        text-shadow: 0 0 10px #ffffff;
        border:none ;
        transition: 0.5s all;
    }

    .spoiler:hover{
        color: var(--text-color);
        text-shadow: none;
    }
}
</style>
