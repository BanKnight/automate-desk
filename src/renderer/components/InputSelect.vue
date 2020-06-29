<template>
    <el-select :value="data" @change="on_input" :placeholder="meta.desc" clearable>
        <el-option
            v-for="item in meta.options"
            :key="item.key"
            :label="item.title"
            :value="item.val"
        ></el-option>
    </el-select>
</template>

<script>

import input from "@/utils/input"
import { deep_clone } from "@/utils/common"


export default {
    name: "input-select",
    props: {
        value: {
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
            if (this.value == this.data)
            {
                return
            }
            this.data = this.value

            if (this.data == null)
            {
                this.on_input(input.make_default(this.meta, this.$set))
            }
        },
        on_input(value)
        {
            this.data = value
            this.$emit("input", this.data)
        }
    }
}
</script>