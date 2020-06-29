import _default from "vuex"
import { deep_clone } from "./common"

const empty_array = []
const empty_object = {}

const basic_types = ["string", "boolean", "number", "text", "file", "folder", "function"]
function default_setter(target, key, val)
{
    target[key] = val
}

const inputs =
{
    get basic_types()
    {
        return basic_types
    },
    is_basic_type(type)
    {
        return basic_types.includes(type) || !type
    },
    is_array_type(type)
    {
        return type == "array"
    },
    is_object_type(type)                    //自定义的object
    {
        return type == "object"
    },
    is_select_type(type)
    {
        return type == "select"
    },
    is_input_type(type)                     //固定字段的object
    {
        return type == "input"
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
        else if (meta.type == "boolean")
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
        else if (meta.type == "object")
        {
            default_ = deep_clone(meta.default || empty_object)
        }
        else if (meta.type == "select")
        {
            default_ = meta.default || meta.options[0].val
        }
        else if (meta.type == "input")                        
        {
            default_ = {}
            inputs.init(default_, meta, setter)
        }
        else if (meta.type == "function")
        {
            default_ = new Function(meta.default || "")
        }
        return default_
    },
    wrap_func(body)
    {
        return new Function(body)
    },
    pick_body(func)
    {
        const func_str = func.toString()
        let start = func_str.indexOf("{")
        let stop = func_str.indexOf("}")

        let body = func_str.substring(start + 1, stop)

        return body
    }
}

export default inputs
