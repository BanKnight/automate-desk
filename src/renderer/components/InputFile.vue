<template>
    <el-input placeholder="请输入路径" v-model="path">
        <el-button slot="append" icon="el-icon-folder-opened" @click="on_open"></el-button>
    </el-input>
</template>

<script>
//参考：https://electronjs.org/docs/api/dialog

const { dialog } = require("electron").remote;

export default {
    name: "input-file",
    data()    {
        return {
            path: this.value
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
    watch: {
        value()        {
            this.path = this.value;
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

                    that.path = filePaths[0];

                    that.$emit("input", that.path);
                })


        }
    }
};
</script>