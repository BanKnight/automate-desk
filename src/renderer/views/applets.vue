<template>
    <el-container class="full">
        <el-header>
            <el-row type="flex" class="full" justify="space-between" align="middle">
                <el-button icon="el-icon-plus" style="margin-right:20px" @click="try_add"></el-button>
                <el-input v-model="search" placeholder="输入关键字搜索" />
            </el-row>
        </el-header>

        <el-main>
            <el-table :data="filter" size="medium" height="100%">
                <el-table-column label="开关">
                    <template slot-scope="scope">
                        <el-switch
                            :value="scope.row.state =='running'"
                            @change="change_state(scope.row,$event)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称">
                    <template slot-scope="scope">
                        <el-card :body-style="{ padding: '0px' }">
                            <el-row
                                type="flex"
                                justify="space-between"
                                align="middle"
                                style="padding-left:20px;"
                            >
                                <span>
                                    <el-switch
                                        :value="scope.row.state =='running'"
                                        @change="change_state(scope.row,$event)"
                                    ></el-switch>

                                    <el-link
                                        type="primary"
                                        :title="gen_applet_desc(scope.row)"
                                        @click="check(scope.row)"
                                    >{{scope.row.name}}</el-link>
                                </span>

                                <el-button-group>
                                    <el-button
                                        :disabled="scope.row.state !='running'"
                                        icon="el-icon-video-play"
                                        @click="trigger_ui(scope.row)"
                                        style="height:50px;font-size:30px;"
                                    ></el-button>
                                    <el-button
                                        icon="el-icon-delete"
                                        @click="try_del(scope.row)"
                                        style="height:50px;font-size:30px;"
                                    ></el-button>
                                </el-button-group>
                            </el-row>
                        </el-card>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-dialog v-if="editing" :visible.sync="visible_editing" center width="80%">
            <el-container style="height:400px" class="full-width">
                <el-header style="padding:0">
                    <el-row type="flex" justify="space-around" align="middle" class="full">
                        <el-input v-model="editing.name" placeholder="请输入名称" class="full-width" />
                    </el-row>
                </el-header>
                <el-main style="padding:0">
                    <el-tabs value="condition" stretch class="full">
                        <el-tab-pane label="条件" name="condition">
                            <el-container class="full scroll-if-need">
                                <el-header style="padding:0">
                                    <el-row
                                        class="full"
                                        type="flex"
                                        justify="space-between"
                                        align="middle"
                                    >
                                        <el-select
                                            v-model="editing.condition.name"
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
                                    :key="editing.condition.name"
                                    v-if="editing.condition.name "
                                    v-model="editing.condition.options"
                                    label-position="top"
                                    :meta="editing.condition.template.inputs"
                                />
                            </el-container>
                        </el-tab-pane>
                        <el-tab-pane label="动作" name="actions">
                            <el-container class="full scroll-if-need">
                                <el-header style="padding:0">
                                    <el-row
                                        class="full"
                                        type="flex"
                                        justify="space-between"
                                        align="middle"
                                    >
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
                                </el-header>

                                <el-table
                                    :data="editing.actions"
                                    height="100%"
                                    size="medium"
                                    row-key="id"
                                    ref="actions"
                                    class="full-width"
                                >
                                    <el-table-column width="35px">
                                        <template slot-scope="scope">
                                            <i
                                                class="el-icon-rank"
                                                style="font-size:25px;cursor:move"
                                            ></i>
                                        </template>
                                    </el-table-column>

                                    <el-table-column type="index" label="#" width="35px"></el-table-column>

                                    <el-table-column label="操作" width="100px">
                                        <template slot-scope="scope">
                                            <el-button
                                                icon="el-icon-delete"
                                                type="text"
                                                @click="del_action(scope.$index)"
                                            >删除</el-button>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="name" label="名称">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.template.title}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column type="expand">
                                        <template slot-scope="scope">
                                            <input-form
                                                :key="scope.row.id"
                                                v-model="scope.row.options"
                                                :meta="scope.row.template.inputs"
                                                label-position="left"
                                                style="padding:10px 20px"
                                            />
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-container>
                        </el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>

            <span slot="footer">
                <el-button style="width:200px" icon="el-icon-check" @click="save">保存</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import Sortable from 'sortablejs'
import InputForm from "@/components/InputForm"

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
    mounted()    {


    },
    methods: {
        gen_applet_desc(applet)
        {
            const array = ["如果"]

            array.push("'")
            array.push(applet.condition.template.title)
            array.push("',执行")

            for (let action of applet.actions)
            {
                array.push(" '")
                array.push(action.template.title)
                array.push("'")
            }

            return array.join("")
        },
        try_add()
        {
            this.$router.push({ name: 'new_applet' })
        },
        check(applet)
        {
            this.editing = applet.clone()

            console.log("check ---------", this.editing.actions)

            this.visible_editing = true

            this.$nextTick(() =>
            {
                this.make_draggable()
            })
        },

        make_draggable()        {
            const tbody = this.$refs.actions.$el.querySelector('.el-table__body-wrapper tbody')
            const _this = this
            Sortable.create(tbody, {
                handle: ".el-icon-rank",
                onEnd({ newIndex, oldIndex })                {
                    const currRow = _this.editing.actions.splice(oldIndex, 1)[0]
                    _this.editing.actions.splice(newIndex, 0, currRow)
                }
            })
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
        async change_state(applet)
        {
            if (applet.state == "running")
            {
                await this.$store.dispatch("operate_applet", {
                    id: applet.id,
                    op: "stop"
                })
            }
            else
            {
                await this.$store.dispatch("operate_applet", {
                    id: applet.id,
                    op: "start"
                })
            }
        },
        trigger_ui(applet)
        {
            this.$store.dispatch("trigger_ui", applet.name)
        }
    }
}
</script>