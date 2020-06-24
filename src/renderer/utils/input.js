import _default from "vuex"

function default_setter(target, key, val)
{
    target[key] = val
}

const inputs =
{
    is_basic_type(type)
    {
        if (type == "string" || type == "text"
            || type == "number" || type == "file"
            || type == "folder")
        {
            return true
        }
    },
    is_array_type(type)
    {
        return type == "array"
    },
    is_object_type(type)
    {
        return type instanceof Array
    },
    is_json_type(type)
    {
        return type == "json"
    },
    init(target, meta, setter = default_setter)
    {
        for (let i = 0, len = meta.length; i < len; ++i)
        {
            let one = meta[i]

            inputs.init_one(target, one, setter)
        }
    },
    init_one(container, one, setter)
    {
        if (container[one.key])
        {
            return
        }

        let default_ = inputs.make_default(one, setter)

        setter(container, one.key, default_)
    },
    make_default(meta, setter = default_setter)
    {
        let default_ = null

        if (meta.type == "string" || meta.type == "text")
        {
            default_ = meta.default || ""
        }
        else if (meta.type == "number")
        {
            default_ = meta.default || 0
        }
        else if (meta.type == "file" || meta.type == "folder")
        {
            default_ = meta.default || ""
        }
        else if (meta.type == "array")     //一个类似input的结构
        {
            default_ = []
        }
        else if (meta.type == "json")
        {
            default_ = {}
        }
        else
        {
            default_ = {}
            inputs.init(default_, meta, setter)
        }

        return default_
    }
}

export default inputs