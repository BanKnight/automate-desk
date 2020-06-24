<template>
    <el-form label-width="80px" label-position="top" size="mini">
        <el-form-item v-for="one in meta" :key="one.key" :label="one.title">
            <one-input v-model="value[one.key]" :meta="one" />
        </el-form-item>
    </el-form>
</template>

<script>

import input from "@/utils/input"

export default {
    name: "input-form",
    components: {
        "one-input": () => import("./OneInput")
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
        meta: {
            type: Array,
            required: true,
        }
    },

    created()    {
        input.init(this.value, this.meta)
    },
    watch: {
        meta()
        {
            input.init(this.value, this.meta)
        }
    },
}
</script>