<template>
    <el-container class="full">
        <el-header>
            <el-row type="flex" justify="space-around" align="middle" class="full">
                <el-button @click="$router.push('/')" icon="el-icon-back"></el-button>
                <el-input v-model="name" placeholder="请输入名称" style="margin:0 10px" />
                <el-button @click="save" icon="el-icon-check">保存</el-button>
            </el-row>
        </el-header>
        <el-main>
            <el-tabs value="condition" stretch>
                <el-tab-pane label="条件" name="condition" class="full scroll-if-need">
                    <el-card class="box-card">
                        <el-form @submit.native.prevent label-width="80px" label-position="top">
                            <el-form-item label="触发器">
                                <el-select
                                    v-model="condition.name"
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
                            :key="condition.name"
                            v-if="condition.name "
                            v-model="condition.options"
                            label-position="top"
                            :meta="template.condition[condition.name].inputs"
                        />
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="动作" name="actions" class="full scroll-if-need">
                    <el-table
                        :data="actions"
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
                                        :meta="template.action[scope.row.name].inputs"
                                        label-position="left"
                                        style="padding:10px 20px"
                                    />
                                </el-card>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>

import InputForm from "@/components/InputForm"

export default {
    components: { InputForm },
    data()    {
        return {
            name: "",
            condition: { name: null, options: {} },
            actions: [],
            new_action_name: null,
        }
    },
    computed: {

        template()
        {
            return this.$store.getters.template
        },
    },
    methods: {
        select_cond(name)
        {
            this.condition.options = {}
        },
        add_action()
        {
            this.actions.push({
                id: Date.now(),
                name: this.new_action_name,
                options: {},
            })
            this.new_action_name = null
        },
        del_action(index)
        {
            this.$delete(this.actions, index)

        },
        async save()
        {
            if (!this.name)
            {
                return
            }

            if (!this.condition.name)
            {
                return
            }

            // if (this.actions.length == 0)
            // {
            //     return
            // }

            await this.$store.dispatch("new_applet", {
                name: this.name,
                condition: this.condition,
                actions: this.actions,
            })
            this.$router.push('/applets')
        }
    }

}
</script>