<template>
    <el-container class="full">
        <el-header>
            <el-button
                @click="$router.push('/')"
                icon="el-icon-back"
                type="text"
                style="font-size:20px;border:0"
            ></el-button>
        </el-header>

        <el-header>
            <el-row type="flex" justify="space-around" align="middle" class="full">
                <el-input v-model="name" placeholder="请输入名称" class="full-width" />
            </el-row>
        </el-header>

        <el-main class="full">
            <el-tabs value="condition" stretch class="full">
                <el-tab-pane label="条件" name="condition">
                    <el-container class="full scroll-if-need">
                        <el-header style="padding:0">
                            <el-row class="full" type="flex" justify="space-between" align="middle">
                                <el-select
                                    v-model="condition.name"
                                    placeholder="请选择"
                                    @change="select_cond"
                                    class="full-width"
                                >
                                    <el-option
                                        v-for="one in template.condition"
                                        :key="one.name"
                                        :label="one.title"
                                        :value="one.name"
                                    ></el-option>
                                </el-select>
                            </el-row>
                        </el-header>
                        <input-form
                            :key="condition.name"
                            v-if="condition.name "
                            v-model="condition.options"
                            label-position="top"
                            :meta="template.condition[condition.name].inputs"
                        />
                    </el-container>
                </el-tab-pane>
                <el-tab-pane label="动作" name="actions">
                    <el-container class="full scroll-if-need">
                        <el-table
                            :data="actions"
                            height="100%"
                            size="medium"
                            row-key="id"
                            ref="actions"
                            class="full-width"
                            default-expand-all
                        >
                            <el-table-column label="移动" width="50px">
                                <template slot-scope="scope">
                                    <i class="el-icon-rank" style="font-size:25px;cursor:move"></i>
                                </template>
                            </el-table-column>

                            <el-table-column type="index" label="#" width="35px"></el-table-column>

                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <input-form
                                        v-if="scope.row.name"
                                        :key="scope.row.name"
                                        v-model="scope.row.options"
                                        :meta="template.action[scope.row.name].inputs"
                                        label-position="left"
                                    />
                                </template>
                            </el-table-column>

                            <el-table-column label="类型">
                                <template slot-scope="scope">
                                    <el-select
                                        v-model="scope.row.name"
                                        @change="select_action(scope.row,$event)"
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="one in template.action"
                                            :key="one.name"
                                            :label="one.title"
                                            :value="one.name"
                                        ></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>

                            <el-table-column label="操作" width="100px" align="right">
                                <template slot="header">
                                    <el-button icon="el-icon-plus" @click="add_action" />
                                </template>
                                <template slot-scope="scope">
                                    <el-button
                                        icon="el-icon-delete"
                                        @click="del_action(scope.$index)"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-container>
                </el-tab-pane>
            </el-tabs>
        </el-main>

        <el-footer>
            <el-row type="flex" justify="center" align="middle" class="full">
                <el-button @click="save" icon="el-icon-check" style="width:200px">保存</el-button>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
import Sortable from 'sortablejs'
import InputForm from "@/components/InputForm"

export default {
    components: { InputForm },
    data()    {
        return {
            name: "",
            new_action_name: null,
            condition: { name: null, options: {} },
            actions: [],
        }
    },
    computed: {

        template()
        {
            return this.$store.getters.template
        },
    },
    mounted()    {
        const tbody = this.$refs.actions.$el.querySelector('.el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
            handle: ".el-icon-rank",
            onEnd({ newIndex, oldIndex })            {
                const currRow = _this.actions.splice(oldIndex, 1)[0]
                _this.actions.splice(newIndex, 0, currRow)
            }
        })
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
                name: null,
                options: null
            })
            this.new_action_name = null
        },
        select_action(action, name)
        {
            action.name = name
            action.options = {}
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

            if (this.actions.length == 0)
            {
                return
            }

            for (let i = this.actions.length - 1; i >= 0; --i)
            {
                let action = this.actions[i]
                if (action.name == null)
                {
                    this.actions.splice(i, 1)
                }
            }

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