<template>
    <el-container class="full" direction="vertical">
        <navbar />
        <el-main style="padding:0">
            <router-view />
        </el-main>
        <el-footer height="auto">
            <el-button type="text" size="mini" @click="on_click">{{app_path}}</el-button>
        </el-footer>
    </el-container>
</template>

<script>

import { remote } from "electron"
import Navbar from "./Navbar"

export default {
    components: {
        Navbar
    },
    computed: {
        app_path()
        {
            return remote.app.getPath("userData")
        }
    },
    methods: {
        on_click()        {
            remote.shell.showItemInFolder(this.app_path);
        }
    }
}
</script>