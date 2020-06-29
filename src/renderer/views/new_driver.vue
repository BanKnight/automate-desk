<template>
    <el-container class="full">
        <el-header>
            <el-row type="flex" justify="space-between" align="middle" class="full">
                <el-page-header @back="$router.push('/drivers')" content="Drivers"></el-page-header>
            </el-row>
        </el-header>
        <el-main>
            <el-card class="box-card">
                <el-form label-position="top">
                    <el-form-item label="选择">
                        <el-select
                            v-model="curr"
                            value-key="name"
                            placeholder="请选择"
                            @change="select"
                            style="width:100%;"
                        >
                            <el-option
                                v-for="option in options"
                                :key="option.name"
                                :label="option.title"
                                :value="option"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <input-form
                    v-if="curr && curr.inputs.length > 0"
                    :key="curr.name"
                    v-model="inputs"
                    :meta="curr.inputs"
                    label-position="top"
                />
            </el-card>
        </el-main>

        <el-footer>
            <el-row type="flex" justify="center" align="middle" class="full">
                <el-button style="width:200px" @click="save">保存</el-button>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>

import InputForm from "@/components/InputForm"

export default {
    components: { InputForm },
    data()    {
        return {
            curr: null,
            inputs: {},
        }
    },
    computed: {
        template()
        {
            return this.$store.getters.template
        },
        drivers()        {
            return this.$store.getters.drivers
        },
        options()
        {
            const options = []

            for (let name in this.template.driver)
            {
                let one = this.template.driver[name]
                if (this.drivers[name])
                {
                    continue
                }

                options.push(one)
            }

            console.log(this.drivers, options)

            return options
        }
    },
    methods: {
        select(value)
        {
            this.inputs = {}
        },
        async save()
        {
            await this.$store.dispatch("new_driver", {
                name: this.curr.name,
                options: this.inputs,
            })
            this.$router.push('/drivers')
        }
    }

}
</script>