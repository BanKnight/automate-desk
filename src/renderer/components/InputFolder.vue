<template>
    <el-input placeholder="请输入路径" v-model="path">
        <el-button slot="append" icon="el-icon-folder-opened" @click="on_open"></el-button>
    </el-input>
</template>

<script>
//参考：https://electronjs.org/docs/api/dialog

const { dialog } = require("electron").remote;

export default {
    name: "input-folder",
    data()    {
        return {
            path: this.value
        };
    },
    props: {
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
    methods: {
        on_open()        {
            let that = this;

            dialog.showOpenDialog(
                {
                    properties: ["openDirectory"]
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

                });
        }
    }
};
</script>