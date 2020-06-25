<template>
    <el-container class="full">
        <el-header>
            <el-row type="flex" justify="space-around" align="middle" class="full">
                <el-button @click="$router.push('/')" icon="el-icon-back"></el-button>
                <el-input v-model="name" placeholder="请输入名称" style="margin:0 10px" />
                <el-button @click="$router.push('/')" icon="el-icon-check">保存</el-button>
            </el-row>
        </el-header>
        <el-main>
            <el-tabs value="condition" stretch>
                <el-tab-pane label="条件" name="condition" class="full scroll-if-need">
                    <el-form @submit.native.prevent label-width="80px" label-position="top">
                        <el-form-item label="触发器">
                            <el-select
                                v-model="condition_name"
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

                            <input-form
                                :key="condition_name"
                                v-if="condition_name "
                                v-model="condition[condition_name]"
                                label-position="top"
                                :meta="get_cond_meta_inputs(condition_name)"
                            />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="动作" name="actions" class="full scroll-if-need">
                    <el-table :data="actions" height="100%" size="medium" row-key="id">
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
                                        :key="scope.row.template.name"
                                        v-model="scope.row.inputs"
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
            condition_name: null,
            condition: {},
            actions: [],
            new_action_name: null,
            new_action: {},
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
            if (this.condition[name] == null)
            {
                this.$set(this.condition, name, {})
            }

            return this.condition[name]
        },
        get_cond_meta_inputs(name)
        {
            return this.template.condition[name].inputs
        },
        select_action(name)
        {
            this.new_action = {}
        },
        add_action()
        {
            this.actions.push({
                id: Date.now(),
                inputs: this.new_action,
                template: this.template.action[this.new_action_name],
            })

            this.new_action = {}
            this.new_action_name = null
        },
        del_action(index)
        {
            this.$delete(this.actions, index)

        }
    }

}
</script>