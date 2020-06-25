<template>
    <input-basic
        v-if="input.is_basic_type(meta.type)"
        :value="value"
        @input="on_input"
        :meta="meta"
    />
    <input-array
        v-else-if="input.is_array_type(meta.type)"
        :value="value"
        @input="on_input"
        :meta="meta"
    />
    <input-json
        v-else-if="input.is_json_type(meta.type)"
        :value="value"
        @input="on_input"
        :meta="meta"
    />
    <input-select
        v-else-if="input.is_select_type(meta.type)"
        :value="value"
        @input="on_input"
        :meta="meta"
    />

    <el-card v-else class="box-card">
        <input-form :value="value" @input="on_input" :meta="meta.type" />
    </el-card>
</template>

<script>

import InputBasic from "./InputBasic"
import InputArray from "./InputArray"
import InputSelect from "./InputSelect"

import InputJson from "./InputJson"
import InputForm from "./InputForm"

import input from "@/utils/input"

export default {
    name: "one-input",
    components: { InputBasic, InputArray, InputSelect, InputJson, InputForm },
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
    computed: {
        input()
        {
            return input
        }
    },
    methods: {
        on_input(value)
        {
            this.$emit("input", value)
        }
    }

}
</script>