<template>
    <el-input :value="data" @input="on_input" @change="on_change" :placeholder="meta.desc" />
</template>

<script>
import { debounce } from "@/utils/common"

import input from "@/utils/input"

export default {
    name: "input-function",
    props: {
        value: {
            type: Function,
            required: true,
        },
        meta: {
            type: Object,
            required: true,
        }
    },
    data()    {
        return { data: null }
    },
    created()
    {
        this.init()
    },
    watch: {
        value()
        {
            this.init()
        },
        meta()
        {
            this.init()
        }
    },
    methods: {
        init()
        {
            this.data = input.pick_body(this.value)

            if (this.data == null)
            {
                this.on_input("")
            }
        },
        on_input(value)
        {
            this.data = value

            // this.$emit("input", input.wrap_func(value))
        },
        on_change(value)
        {
            this.$emit("input", input.wrap_func(value))
        }
    }
}
</script>