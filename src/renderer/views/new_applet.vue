<template>
    <el-container class="full">
        <el-header>
            <el-row type="flex" align="middle" class="full">
                <el-page-header @back="$router.go(-1)" content="主界面"></el-page-header>
            </el-row>
        </el-header>

        <el-main>
            <el-card>
                <el-form label-width="80px" label-position="top">
                    <el-form-item label="基础">
                        <el-input v-model="name" placeholder="请输入名称" />
                    </el-form-item>

                    <el-form-item label="触发器">
                        <el-select v-model="condition.name" placeholder="请选择">
                            <el-option
                                v-for="one in template.condition"
                                :key="one.name"
                                :label="one.title"
                                :value="one.name"
                            ></el-option>
                        </el-select>

                        <el-button :disabled="condition.name == null" icon="el-icon-setting" />
                    </el-form-item>

                    <el-form-item label="动作">
                        <el-row>
                            <el-select v-model="new_action.name" placeholder="请选择">
                                <el-option
                                    v-for="one in template.action"
                                    :key="one.name"
                                    :label="one.title"
                                    :value="one.name"
                                ></el-option>
                            </el-select>

                            <el-button
                                :disabled="new_action.name == null"
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
export default {
    data()    {
        return {
            name: "",
            condition: { name: null, },
            actions: [],
            new_action: { name: null }
        }
    },
    computed: {

        template()
        {
            return this.$store.getters.template
        },
    },
    methods: {
        add_action()
        {


            this.actions.push({
                ...this.new_action,
                template: this.template.action[this.new_action.name]
            })

            this.new_action = { name: null }
        }
    }

}
</script>