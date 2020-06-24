<template>
    <basic-input v-if="is_basic_type(meta.type)" v-model="value" :meta="meta" />
    <array-input v-else-if="is_array_type(meta.type)" v-model="value" :meta="meta" />
    <json-input v-else-if="is_json_type(meta.type)" v-model="value" :meta="meta" />
    <input-form v-else v-model="value" :meta="meta" />
</template>

<script>

import BasicInput from "./BasicInput"
import ArrayInput from "./ArrayInput"
import JsonInput from "./JsonInput"
import InputForm from "./InputForm"

import input from "@/utils/input"

export default {
    name: "one-input",
    components: { BasicInput, ArrayInput, JsonInput, InputForm },
    props: {
        value: {
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
    }
}
</script>