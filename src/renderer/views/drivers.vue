<template>
    <el-table :data="filter" size="medium" height="100%">
        <el-table-column prop="name" label="名称">
            <template slot="header" slot-scope="scope">
                <el-row type="flex">
                    <el-button icon="el-icon-plus" style="margin-right:20px"></el-button>
                    <el-input v-model="search" placeholder="输入关键字搜索" />
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
                        <el-button icon="el-icon-setting" type="text">设置</el-button>
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
</template>

<script>


export default {
    data()    {
        return {
            search: "",
        }
    },
    mounted()    {

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

                array.push({ ...one, template: this.$store.getters.template.driver[one.template] })
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

    }

}
</script>