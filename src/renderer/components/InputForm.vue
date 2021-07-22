<template>
    <el-form label-width="auto" v-bind="$attrs">
        <template v-for="one in meta">
            <el-form-item
                :key="one.key"
                :label="one.title"
                v-if="is_visible(one.key)"
            >
                <one-input
                    :value="data[fetch_key(one.key)]"
                    @input="on_input(one.key, $event)"
                    :meta="one"
                />
            </el-form-item>
        </template>
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
    created()
    {
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
        },
        is_visible(key)
        {
            const array = key.split("@")
            const second = array[1]

            if (second == null)
            {
                return true
            }

            return !!this.data[second]
        },
        fetch_key(key)
        {
            return key.split("@")[0]
        }
    }
}
</script>