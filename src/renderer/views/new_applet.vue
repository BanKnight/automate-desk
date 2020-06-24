<template>
    <el-container class="full">
        <el-header>
            <el-row type="flex" align="middle" class="full">
                <el-page-header @back="$router.go(-1)" content="主界面"></el-page-header>
            </el-row>
        </el-header>

        <el-main>
            <el-card class="full scroll-if-need">
                <el-form label-width="80px" label-position="top" class="full">
                    <el-form-item label="基础">
                        <el-input v-model="name" placeholder="请输入名称" />
                    </el-form-item>

                    <el-form-item label="触发器">
                        <el-select v-model="condition_name" placeholder="请选择" @change="select_cond">
                            <el-option
                                v-for="one in template.condition"
                                :key="one.name"
                                :label="one.title"
                                :value="one.name"
                            ></el-option>
                        </el-select>

                        <el-button :disabled="condition_name == null" icon="el-icon-setting" />

                        <input-form
                            style="margin-left:10px"
                            size="small"
                            :key="condition_name"
                            v-if="condition_name "
                            v-model="condition[condition_name]"
                            :meta="get_cond_meta_inputs(condition_name)"
                        />
                    </el-form-item>

                    <el-form-item label="动作">
                        <el-row>
                            <el-select v-model="new_action_name" placeholder="请选择">
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

                        <el-row>
                            <el-tag
                                v-for="one in actions"
                                :key="one.name"
                                type="success"
                                effect="dark"
                            >{{ one.template.title }}</el-tag>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-card>
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
                inputs: this.new_action,
                template: this.template.action[this.new_action_name],
            })

            this.new_action = {}
        }
    }

}
</script>