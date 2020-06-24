<template>
    <el-input v-if="meta.type == 'string'" v-model="value" :placeholder="meta.desc" />
    <el-input
        v-else-if="meta.type == 'text'"
        :value="value"
        @input="$emit('input',$event)"
        type="textarea"
        autosize
        :placeholder="meta.desc"
    />
    <el-input-number
        v-else-if="meta.type == 'number'"
        :value="value"
        @input="$emit('input',$event)"
        :min="meta.min"
        :max="meta.max"
        :label="meta.desc"
    ></el-input-number>

    <input-file
        v-else-if="meta.type == 'file'"
        :value="value"
        @input="$emit('input',$event)"
        :label="meta.desc"
        :suffix="meta.suffix"
    ></input-file>
    <input-folder
        v-else-if="meta.type == 'folder'"
        :value="value"
        @input="$emit('input',$event)"
        :label="meta.desc"
    ></input-folder>
</template>

<script>
import InputFile from "./InputFile"
import InputFolder from "./InputFolder"

export default {
    name: "basic-input",
    components: { InputFile, InputFolder },
    props: {
        value: {
            type: String | Number,
            required: true,
        },
        meta: {
            type: Object,
            required: true,
        }
    },
}
</script>