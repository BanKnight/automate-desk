<template>
    <el-container id="app">
        <el-header height="30px" style="padding:0">
            <c-header></c-header>
        </el-header>

        <el-main style="padding:0">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
import CHeader from "./components/title";
export default {
    components: { CHeader },
    mounted()    {
        this.$store.dispatch("get_all")
    }
};
</script>

<style>
/* CSS */
</style>
