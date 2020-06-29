<template>
    <el-table :data="data">
        <el-table-column label="操作" width="150" row-key="id">
            <template slot="header" slot-scope="scope">
                <el-button icon="el-icon-plus" style="margin-right:20px" @click="try_add(-1)"></el-button>
            </template>
            <template slot-scope="scope">
                <el-button-group>
                    <el-button icon="el-icon-plus" @click="try_add(scope.$index)"></el-button>
                    <el-button icon="el-icon-minus" type="danger" @click="try_del(scope.$index)"></el-button>
                </el-button-group>
            </template>
        </el-table-column>

        <el-table-column label="内容">
            <template slot-scope="scope">
                <one-input
                    :value="scope.row.val"
                    :meta="meta.define"
                    @input="on_input(scope.row,$event)"
                />
            </template>
        </el-table-column>
    </el-table>
</template>

<script>

import input from "@/utils/input"

export default {
    name: "input-array",
    components: {
        "one-input": () => import("./OneInput")
    },
    props: {
        value: {
            type: Array,
            required: true,
        },
        meta: {
            type: Object,
            required: true,
        }
    },
    data()
    {
        return {
            data: []
        }
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
            this.data = []

            if (this.value == null)
            {
                this.$emit("input", this.data)
                return
            }

            for (let i = 0, len = this.value.length; i < len; ++i)
            {
                const val =
                {
                    id: i,
                    val: this.value[i],
                }
                this.data.push(val)
            }
        },
        try_add(index)
        {
            const row = { id: Date.now() }

            if (index == -1)
            {
                this.$set(this.data, this.data.length, row)
            }
            else
            {
                this.data.splice(index + 1, 0, row)
            }

            this.on_input(row, input.make_default(this.meta.define))
        },
        try_del(index)
        {
            this.$delete(this.data, index)
        },
        on_input(row, val)
        {
            this.$set(row, "val", val)

            this.trige_input()
        },
        trige_input()
        {
            const ret = []
            for (let i = 0, len = this.data.length; i < len; ++i)
            {
                ret.push(this.data[i].val)
            }

            this.$emit("input", ret)
        }
    }

}
</script>