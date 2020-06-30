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
                            <span>{{scope.row.name}}</span>
                            <el-button-group>
                                <el-button
                                    icon="el-icon-delete"
                                    style="border:0"
                                    @click="try_del(scope.row)"
                                >删除</el-button>
                                <el-button
                                    icon="el-icon-view"
                                    style="border:0"
                                    @click="check(scope.row)"
                                >查看</el-button>
                            </el-button-group>
                        </el-row>

                        <el-button
                            style="width:100%;height:50px;font-size:30px;border:0"
                            :icon="state_icon(scope.row.state)"
                        ></el-button>
                    </el-card>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-if="editing" :title="editing.name" :visible.sync="visible_editing" center>
            <el-tabs value="condition" stretch>
                <el-tab-pane label="条件" name="condition" class="full scroll-if-need">
                    <el-card class="box-card">
                        <el-form @submit.native.prevent label-width="80px" label-position="top">
                            <el-form-item label="触发器">
                                <el-select
                                    v-model="editing.condition.name"
                                    placeholder="请选择"
                                    @change="select_cond"
                                >
                                    <el-option
                                        v-for="one in template.condition"
                                        :key="one.name"
                                        :label="one.title"
                                        :value="one.name"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <input-form
                            :key="editing.condition.name"
                            v-if="editing.condition.name "
                            v-model="editing.condition.options"
                            label-position="top"
                            :meta="editing.condition.template.inputs"
                        />
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="动作" name="actions" class="full scroll-if-need">
                    <el-table
                        :data="editing.actions"
                        height="100%"
                        size="medium"
                        row-key="id"
                        class="full-width"
                    >
                        <el-table-column prop="name" label="名称">
                            <template slot="header" slot-scope="scope">
                                <el-row type="flex" justify="space-between">
                                    <el-select
                                        v-model="new_action_name"
                                        placeholder="请选择"
                                        style="width:100%;margin-right:10px"
                                    >
                                        <el-option
                                            v-for="one in template.action"
                                            :key="one.name"
                                            :label="one.title"
                                            :value="one.name"
                                        ></el-option>
                                    </el-select>

                                    <el-button
                                        :disabled="new_action_name == null"
                                        icon="el-icon-plus"
                                        @click="add_action"
                                    />
                                </el-row>
                            </template>

                            <template slot-scope="scope">
                                <el-card class="box-card" :body-style="{ padding: '0px' }">
                                    <el-row
                                        type="flex"
                                        justify="space-between"
                                        align="middle"
                                        style="padding:0 20px;border-bottom: 1px solid #EBEEF5;"
                                    >
                                        <span>{{scope.row.template.title}}</span>
                                        <el-button
                                            icon="el-icon-delete"
                                            type="text"
                                            @click="del_action(scope.$index)"
                                        >删除</el-button>
                                    </el-row>

                                    <input-form
                                        :key="scope.row.name"
                                        v-model="scope.row.options"
                                        :meta="scope.row.template.inputs"
                                        label-position="left"
                                        style="padding:10px 20px"
                                    />
                                </el-card>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer">
                <el-button style="width:200px" @click="save">保存</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import InputForm from "@/components/InputForm"

import { deep_clone } from "@/utils/common"

export default {
    components: { InputForm },
    data()    {
        return {
            search: "",
            editing: null,
            visible_editing: false,
            new_action_name: null,
        }
    },

    computed: {
        template()
        {
            return this.$store.getters.template
        },
        applets()
        {
            const array = []
            for (let id in this.$store.getters.applets)
            {
                let one = this.$store.getters.applets[id]

                array.push(one)
            }

            console.log("applets........", array)

            return array
        },
        filter()
        {
            if (this.search.length == 0)
            {
                return this.applets
            }

            return this.applets.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    methods: {
        try_add()
        {
            this.$router.push({ name: 'new_applet' })
        },
        check(applet)
        {
            this.editing = applet.clone()

            this.visible_editing = true
        },
        async try_del(applet)
        {
            await this.$store.dispatch("del_applet", applet.id)
        },
        select_cond(name)
        {
            this.editing.condition.options = {}
            this.editing.condition.template = this.template.condition[this.editing.condition.name]
        },
        add_action()
        {
            this.editing.actions.push({
                id: Date.now(),
                name: this.new_action_name,
                options: {},
                template: this.template.action[this.new_action_name]
            })
            this.new_action_name = null
        },
        del_action(index)
        {
            this.$delete(this.editing.actions, index)
        },
        async save()
        {
            console.log(this.editing)

            await this.$store.dispatch("update_applet", this.editing.save())

            this.editing = null
            this.visible_editing = false

        },
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



    }
}
</script>