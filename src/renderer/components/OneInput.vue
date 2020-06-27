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
    <input-object
        v-else-if="input.is_object_type(meta.type)"
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

    <el-card v-else-if="input.is_input_type(meta.type)" class="box-card">
        <input-form :value="value" @input="on_input" :meta="meta.define" />
    </el-card>
</template>

<script>

import InputBasic from "./InputBasic"
import InputArray from "./InputArray"
import InputSelect from "./InputSelect"

import InputObject from "./InputObject"
import InputForm from "./InputForm"

import input from "@/utils/input"

export default {
    name: "one-input",
    components: { InputBasic, InputArray, InputSelect, InputObject, InputForm },
    props: {
        value: {
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