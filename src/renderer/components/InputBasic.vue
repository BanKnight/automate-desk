<template>
    <el-input
        v-if="meta.type == 'string'"
        :value="data"
        :label="data"
        @input="on_input"
        :placeholder="meta.desc"
        v-bind="meta.attrs"
    />
    <el-input
        v-else-if="meta.type == 'text'"
        :value="data"
        :label="data"
        @input="on_input"
        type="textarea"
        autosize
        :placeholder="meta.desc"
        v-bind="meta.attrs"
    />

    <el-switch
        v-else-if="meta.type == 'boolean'"
        :value="data"
        :label="data"
        @input="on_input"
        v-bind="meta.attrs"
    />

    <el-input-number
        v-else-if="meta.type == 'number'"
        :value="data"
        @input="on_input"
        v-bind="meta.attrs"
        :label="meta.desc"
    />

    <input-file
        v-else-if="meta.type == 'file'"
        :value="data"
        @input="on_input"
        :meta="meta"
        v-bind="meta.attrs"
    />
    <input-folder
        v-else-if="meta.type == 'folder'"
        :value="data"
        @input="on_input"
        :meta="meta"
        v-bind="meta.attrs"
    />

    <input-function
        v-else-if="meta.type == 'function'"
        :value="value"
        @input="on_input"
        :meta="meta"
    />
</template>

<script>
import InputFile from "./InputFile"
import InputFolder from "./InputFolder"

import InputFunction from "./InputFunction"

import input from "@/utils/input"

export default {
    name: "input-basic",
    components: { InputFile, InputFolder, InputFunction },
    props: {
        value: {
            type: String | Number | Boolean | Function,
            required: true,
        },
        meta: {
            type: Object,
            required: true,
        }
    },
    data()
    {
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