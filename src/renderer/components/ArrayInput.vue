<template>
    <el-table :data="data">
        <el-table-column label="操作" width="120" row-key="id">
            <template slot="header" slot-scope="scope">
                <el-button icon="el-icon-plus" style="margin-right:20px" @click="try_add(-1)"></el-button>
            </template>
            <template slot-scope="scope">
                <el-button-group>
                    <el-button icon="el-icon-plus" @click="try_add(scope.$index)"></el-button>
                    <el-button icon="el-icon-minus" @click="try_del(scope.$index)"></el-button>
                </el-button-group>
            </template>
        </el-table-column>

        <el-table-column label="内容">
            <template slot-scope="scope">
                <one-input :value="scope.row.val" :meta="meta.item" @input="trige_input" />
            </template>
        </el-table-column>
    </el-table>
</template>

<script>

import input from "@/utils/input"

export default {
    name: "array-input",
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
        value()
        {
            this.init()
        }
    },
    methods: {
        init()
        {
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
            const val =
            {
                id: Date.now(),
                val: input.make_default(this.meta.item),
            }

            if (index == -1)
            {
                this.data.push(val)
            }
            else
            {
                this.data.splice(index + 1, 0, val)
            }
        },
        try_del(index)
        {
            this.data.splice(index, 1)
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