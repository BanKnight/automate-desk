<template>
    <el-input placeholder="请输入路径" :value="data" @input="on_input">
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
            data: this.value
        };
    },
    props: {
        value: {
            type: String | Number,
            required: true,
            default: ""
        },
        meta: {
            type: Object,
            required: true,
        }
    },
    data()    {
        return { data: null }
    },
    created()
    {
        this.init()
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
                    properties: ["openDirectory", "promptToCreate"]
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

                });
        },
        on_input(value)
        {
            this.data = value.split("\\").join("/")
            this.$emit("input", this.data)
        }
    }
};
</script>