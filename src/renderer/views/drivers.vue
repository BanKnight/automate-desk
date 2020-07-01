<template>
    <el-container class="full">
        <el-table :data="filter" size="medium" height="100%">
            <el-table-column label="开关" width="60px">
                <template slot-scope="scope">
                    <el-switch
                        :value="scope.row.state =='running'"
                        @change="change_state(scope.row,$event)"
                    ></el-switch>
                </template>
            </el-table-column>

            <el-table-column prop="name" label="名称">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" placeholder="输入关键字搜索" />
                </template>
                <template slot-scope="scope">
                    <el-link type="primary" @click="check(scope.row)">{{scope.row.template.title}}</el-link>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200px" align="right">
                <template slot="header">
                    <el-button icon="el-icon-plus" @click="try_add"></el-button>
                </template>
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                            icon="el-icon-delete"
                            @click="try_del(scope.row)"
                            style="height:50px;font-size:30px;"
                        ></el-button>
                    </el-button-group>
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

            return this.drivers.filter(data => !this.search || data.template.title.toLowerCase().includes(this.search.toLowerCase()))
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
        check(driver)
        {
            this.editing = driver.clone()

            this.visible_editing = true
        },

        async try_del(driver)
        {
            await this.$store.dispatch("del_driver", driver.name)
        },
        async save()
        {

            await this.$store.dispatch("update_driver", this.editing.save())

            this.editing = null;
            this.visible_editing = false
        },
        async change_state(driver)
        {
            if (driver.state == "running")
            {
                await this.$store.dispatch("operate_driver", {
                    name: driver.name,
                    op: "stop"
                })
            }
            else
            {
                await this.$store.dispatch("operate_driver", {
                    name: driver.name,
                    op: "start"
                })
            }
        },

    }

}
</script>