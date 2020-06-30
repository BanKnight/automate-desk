<template>
    <el-container class="full">
        <el-table :data="filter" size="medium" height="100%">
            <el-table-column prop="name" label="名称">
                <template slot="header" slot-scope="scope">
                    <el-row type="flex">
                        <el-button icon="el-icon-plus" style="margin-right:20px" @click="try_add"></el-button>
                        <el-input v-model="search" placeholder="输入关键字搜索" />
                    </el-row>
                </template>

                <template slot-scope="scope">
                    <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <el-row
                            type="flex"
                            justify="space-between"
                            align="middle"
                            style="padding-left:20px;border-bottom: 1px solid #EBEEF5;"
                        >
                            <span>{{scope.row.template.title}}</span>
                            <el-button-group>
                                <el-button icon="el-icon-delete" style="border:0">删除</el-button>
                                <el-button
                                    icon="el-icon-view"
                                    style="border:0"
                                    @click="editing = scope.row;visible_editing = true"
                                >查看</el-button>
                            </el-button-group>
                        </el-row>

                        <el-button
                            :title="scope.row.template.desc"
                            style="width:100%;height:50px;font-size:30px;border:0"
                            :icon="state_icon(scope.row.state)"
                        ></el-button>
                    </el-card>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            v-if="editing"
            :title="editing.template.title"
            :visible.sync="visible_editing"
            width="80%"
            center
        >
            <el-container style="400px" class="scroll-if-need">
                <input-form
                    v-model="editing.options"
                    :meta="editing.template.inputs"
                    label-position="top"
                />
            </el-container>

            <span slot="footer">
                <el-button style="width:200px" @click="save">保存</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>

import InputForm from "@/components/InputForm"

export default {
    components: { InputForm },
    data()    {
        return {
            search: "",
            editing: null,
            visible_editing: false,
        }
    },
    computed: {

        template()
        {
            return this.$store.getters.template
        },
        drivers()
        {
            const array = []
            for (let name in this.$store.getters.drivers)
            {
                let one = this.$store.getters.drivers[name]

                array.push(one)
            }

            return array
        },
        filter()
        {
            if (this.search.length == 0)
            {
                return this.drivers
            }

            return this.drivers.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    methods: {
        state_icon(state)
        {
            if (state == "running")
            {
                return "el-icon-video-pause"
            }

            if (state == "init")
            {
                return "el-icon-video-play"
            }

            return "el-icon-error"
        },
        try_add()
        {
            this.$router.push({ name: 'new_driver' })
        },
        save()
        {
            this.editing = null; this.visible_editing = false
        }

    }

}
</script>