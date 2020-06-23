<template>
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
                        style="padding:10px;border-bottom: 1px solid #EBEEF5;"
                    >
                        <span>{{scope.row.name}}</span>
                        <el-button icon="el-icon-setting" type="text">设置</el-button>
                    </el-row>

                    <el-button
                        style="width:100%;height:80px;font-size:50px;border:0"
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
            applets: [],
            search: "",
        }
    },
    mounted()    {

        for (let i = 0; i < 10; ++i)
        {
            this.applets.push({
                name: i.toString(),
                state: "running",
            })
        }
    },
    computed: {
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
            this.$router.push({ name: 'new_applet' })
        }

    }
}
</script>