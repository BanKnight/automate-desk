<template>
    <el-table :data="data">
        <el-table-column label="操作" width="80" row-key="key">
            <template slot="header" slot-scope="scope">
                <el-button icon="el-icon-plus" style="margin-right:20px" @click="try_add()"></el-button>
            </template>
            <template slot-scope="scope">
                <el-button-group>
                    <el-button icon="el-icon-minus" type="danger" @click="try_del(scope.$index)"></el-button>
                </el-button-group>
            </template>
        </el-table-column>

        <el-table-column label="名称" width="200">
            <template slot-scope="scope">
                <el-input :value="scope.row.key" @input="on_input_key(scope.row,$event)" />
            </template>
        </el-table-column>

        <el-table-column label="类型" width="240">
            <template slot-scope="scope">
                <el-select
                    :value="scope.row.type"
                    @input="select_type(scope.row,$event)"
                    placeholder="选择类型"
                >
                    <el-option v-for="type in types" :key="type" :label="type" :value="type"></el-option>
                </el-select>

                <el-select
                    v-if="scope.row.type == 'array'"
                    v-model="scope.row.item.type"
                    placeholder="选择元素类型"
                >
                    <el-option v-for="type in item_types" :key="type" :label="type" :value="type"></el-option>
                </el-select>
            </template>
        </el-table-column>

        <el-table-column label="内容">
            <template slot-scope="scope" v-if="scope.row.type">
                <one-input
                    v-if="scope.row.type == 'array' && scope.row.item.type"
                    :key="'array.'+scope.row.item.type"
                    :value="scope.row.values[scope.row.type]"
                    @input="on_input_val(scope.row,$event)"
                    :meta="scope.row"
                />
                <one-input
                    v-else-if="scope.row.type != 'array'"
                    :key="scope.row.type"
                    :value="scope.row.values[scope.row.type]"
                    @input="on_input_val(scope.row,$event)"
                    :meta="scope.row"
                />
            </template>
        </el-table-column>
    </el-table>
</template>

<script>

import input from "@/utils/input"

export default {
    name: "input-object",
    components: {
        "one-input": () => import("./OneInput")
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
        meta: {
            type: Object,
            required: true,
        }
    },
    computed: {
        item_types()        {
            return [...input.basic_types]
        },
        types()        {

            return [...input.basic_types, "array", "object"]
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

            let id = 0
            for (let key in this.value)
            {
                const val = this.value[key]

                const one = { id: id++ }

                let type = typeof (val)

                if (val instanceof Array)
                {
                    type = "array"
                }

                this.$set(one, "key", key)
                this.$set(one, "type", type)

                this.$set(one, "values", {
                    [type]: val
                })

                this.data.push(one)
            }
        },
        try_add()
        {
            const one = {
                id: Date.now(),
                key: null,
                type: null,
                values: {}            }

            this.data.push(one)
        },
        try_del(index)
        {
            this.$delete(this.data, index)

            this.trige_input()
        },
        select_type(row, type)
        {
            row.type = type

            let existed = row.values[type]

            if (type == "array")
            {
                existed = []

                this.$set(row, "item", { type: null })
            }
            else if (existed == null)
            {
                existed = input.make_default(row, this.$set)
            }

            this.$set(row.values, type, existed)
        },
        on_input_key(row, key)
        {
            row.key = key

            this.trige_input()
        },
        on_input_val(row, val)
        {
            this.$set(row.values, row.type, val)

            this.trige_input()
        },
        trige_input()
        {
            const ret = {}
            for (let i = 0, len = this.data.length; i < len; ++i)
            {
                const one = this.data[i]
                const val = one.values[one.type]
                if (val && one.key)
                {
                    ret[one.key] = val
                }
            }

            this.$emit("input", ret)
        }
    }

}
</script>