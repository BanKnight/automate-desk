export function deep_clone(target)
{
    return JSON.parse(JSON.stringify(target))
}


export function debounce(fn, delay = 300)
{   //默认300毫秒
    var timer;
    return function ()
    {
        var args = arguments;
        if (timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(() =>
        {
            fn.apply(this, args);   // this 指向vue
        }, delay);
    };
}

export function throttle(fn, delay = 300)
{
    let last = 0
    return function ()
    {
        const curr = new Date()
        if (curr - last > delay)
        {
            fn.apply(this, arguments)
            last = curr
        }
    }
}
