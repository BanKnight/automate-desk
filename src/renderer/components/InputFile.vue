<template>
    <el-input placeholder="请输入路径" v-model="data">
        <el-button slot="append" icon="el-icon-folder-opened" @click="on_open"></el-button>
    </el-input>
</template>

<script>
//参考：https://electronjs.org/docs/api/dialog
import input from "@/utils/input"

const { dialog } = require("electron").remote;

export default {
    name: "input-file",
    data()    {
        return {
            data: this.value
        };
    },
    props: {
        suffix: {
            type: String,
        },
        value: {
            type: String,
            required: true,
            default: ""
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

        meta()
        {
            this.init()
        }
    },
    computed: {
        filters()
        {
            if (!this.suffix)
            {
                return [
                    { name: "All Files", extensions: ["*"] }
                ]
            }
            [
                { name: this.suffix, extensions: [this.suffix] },
                { name: "All Files", extensions: ["*"] }
            ]
        }
    },
    methods: {
        init()
        {
            this.data = this.value

            if (this.data == null)
            {
                this.on_input(input.make_default(this.meta, this.$set))
            }

        },
        on_open()        {
            let that = this;

            dialog.showOpenDialog(
                {
                    properties: ["openFile"],
                    filters: this.filters
                })
                .then(({ canceled, filePaths }) =>
                {
                    if (canceled)                    {
                        return;
                    }

                    if (filePaths.length == 0)                    {
                        return;
                    }

                    that.on_input(filePaths[0])
                })
        },
        on_input(value)
        {
            this.data = value
            this.$emit("input", this.data)
        }
    }
};
</script>