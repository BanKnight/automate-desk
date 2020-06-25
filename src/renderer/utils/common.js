export function deep_clone(target)
{
    return JSON.parse(JSON.stringify(target))
}
