<template>
    <el-menu mode="horizontal" :show-timeout="200" :default-active="$route.name" router>
        <el-menu-item
            v-for="route in routes"
            :key="route.name"
            :index="route.name"
            :style="{width:width}"
        >{{route.meta.title}}</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    computed: {
        routes()        
        {
            return this.$router.options.routes[0].children;
        },
        width()
        {
            return `${100 / this.routes.length}%`
        }
    }
}
</script>