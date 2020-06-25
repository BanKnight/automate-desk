import _default from "vuex"
import { deep_clone } from "./common"

function default_setter(target, key, val)
{
    target[key] = val
}

const empty_array = []
const empty_object = {}

const inputs =
{
    is_basic_type(type)
    {
        if (type == "string" || type == "text"
            || type == "number" || type == "file"
            || type == "folder" || type == "bool")
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
    is_select_type(type)
    {
        return type == "select"
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
        else if (meta.type == "bool")
        {
            default_ = !!meta.default || false
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
            default_ = deep_clone(meta.default || empty_array)
        }
        else if (meta.type == "json")
        {
            default_ = deep_clone(meta.default || empty_object)
        }
        else if (meta.type == "select")
        {
            default_ = meta.default || meta.options[0].val
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