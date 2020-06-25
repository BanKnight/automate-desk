<template>
    <input-basic v-if="is_basic_type(meta.type)" :value="value" @input="on_input" :meta="meta" />
    <input-array
        v-else-if="is_array_type(meta.type)"
        :value="value"
        @input="on_input"
        :meta="meta"
    />
    <input-json v-else-if="is_json_type(meta.type)" :value="value" @input="on_input" :meta="meta" />

    <el-card v-else class="box-card">
        <input-form :value="value" :meta="meta.type" />
    </el-card>
</template>

<script>

import InputBasic from "./InputBasic"
import InputArray from "./InputArray"
import InputJson from "./InputJson"
import InputForm from "./InputForm"

import input from "@/utils/input"

export default {
    name: "one-input",
    components: { InputBasic, InputArray, InputJson, InputForm },
    props: {
        value: {
            type: String | Number | Array | Object,
            required: true,
        },
        meta: {
            type: Object,
            required: true,
        }
    },
    methods: {
        is_basic_type(type)
        {
            return input.is_basic_type(type)
        },
        is_array_type(type)
        {
            return input.is_array_type(type)
        },
        is_json_type(type)
        {
            return input.is_json_type(type)
        },
        on_input(value)
        {
            this.$emit("input", value)
        }
    }
}
</script>