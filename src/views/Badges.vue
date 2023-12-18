<script setup>
// import AuthenticatedLayout from '@/Layouts/Authenticated.vue'
import Badge from '@/components/Badge.vue'
// import GlobeIcon from '@/components/icons/GlobeIcon.vue'



let buttonSizes = ["sm", "base", "lg"]
</script>

<template>
    <div>
        <Badge status="secondary">Label</Badge>
    </div>
    <div>
        <Badge status="danger">Label</Badge>
    </div>
    <div>
        <Badge status="success">Label</Badge>
    </div>
    <div>
        <Badge status="warning">Label</Badge>
    </div>
    
    <div>
        <Badge status="primary">Label</Badge>
    </div>
    
    
</template>
