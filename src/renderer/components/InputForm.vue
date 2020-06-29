<template>
    <el-form label-width="80px" v-bind="$attrs">
        <el-form-item v-for="one in meta" :key="one.key" :label="one.title">
            <one-input :value="data[one.key]" @input="on_input(one.key,$event)" :meta="one" />
        </el-form-item>
    </el-form>
</template>

<script>

import input from "@/utils/input"
import { deep_clone } from "@/utils/common"

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
    data()
    {
        return { data: {} }
    },
    created()    {
        this.init()
    },
    watch: {

        meta()
        {
            this.init()
        }
    },
    methods: {
        init()
        {
            this.data = deep_clone(this.value)

            input.init(this.data, this.meta, this.$set)

            this.$emit("input", this.data)
        },
        on_input(key, value)
        {
            this.data[key] = value;
            this.$emit("input", this.data)
        }
    }
}
</script>