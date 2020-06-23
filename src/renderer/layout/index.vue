<template>
    <el-container class="full" direction="vertical">
        <navbar />
        <el-main style="padding:0">
            <router-view />
        </el-main>
    </el-container>
</template>

<script>

import Navbar from "./Navbar"

export default {
    components: {
        Navbar
    },
}
</script>