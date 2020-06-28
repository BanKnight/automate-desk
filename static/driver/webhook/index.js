
const events = require("events")
const Koa = require('koa');
const Router = require("koa-router")

exports.start = function () 
{
    const event = new events.EventEmitter();
    const koa = new Koa()
    const router = new Router()

    router.post("/event/:name", async (ctx, next) =>
    {
        const name = ctx.params.name
        const data = ctx.request.body

        event.emit(name, data)

        ctx.body = {}
    })

    koa.use(router.routes())
        .use(router.allowedMethods())

    const server = koa.listen(this.options.port)

    const http = {
        on(name, func)
        {
            event.on(name, func)
        },
        off(name, func)
        {
            event.off(name, func)
        },
    }

    this.event = event
    this.router = router
    this.server = server

    return http
}

exports.stop = function () 
{
    this.event.removeAllListeners()
    this.server.unref()
}