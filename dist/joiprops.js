"use strict";
/* Copyright (c) 2020 Richard Rodger, MIT License */
/* $lab:coverage:off$ */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nua = exports.Joi = exports.JoiProps = void 0;
// TODO: implement sibling mixin for yup: https://github.com/jquense/yup
const joi_1 = __importDefault(require("joi"));
exports.Joi = joi_1.default;
const nua_1 = __importDefault(require("nua"));
exports.Nua = nua_1.default;
/* $lab:coverage:on$ */
const reals = {
    string: String,
    number: Number,
    date: Date,
    bool: Boolean,
    boolean: Boolean,
    func: Function,
    function: Function,
    array: Array,
    symbol: Symbol,
    object: Object,
};
function JoiProps(schema) {
    let joischema = joi_1.default.isSchema(schema, { legacy: true })
        ? schema
        : joi_1.default.object(schema).unknown().default();
    let props = {};
    // Magic below ensures prop types and defaults are correctly defined
    // for Vue (otherwise they get obliterated by reactivity).
    joischema.$_terms.keys.forEach((term) => {
        let key = term.key;
        let type = term.schema.type;
        let real = reals[type] || Object;
        props[key] = {
            type: real,
            default: 'object' !== type
                ? term.schema._flags.default
                : () => {
                    // NOTE: this will fail for schemas that do not provide full defaults,
                    // which is what you want - required values are, you know, required.
                    return joi_1.default.attempt({}, term.schema);
                },
        };
    });
    return {
        props,
        beforeCreate() {
            let props = this.$options.propsData;
            // Nua is an object-preserving merge, and thus
            // does not destroy Vue observers.
            nua_1.default(props, joi_1.default.attempt(props, joischema, 'JoiProps:' +
                resolve_component_name(this.$options) +
                ' props validation failed:'));
        },
    };
}
exports.JoiProps = JoiProps;
function resolve_component_name(options) {
    let cn = (options &&
        (options.name || options._componentTag || options.__file || '')) ||
        '';
    return 0 === cn.length ? '' : ' ' + cn;
}
JoiProps.Joi = joi_1.default;
JoiProps.Nua = nua_1.default;
//# sourceMappingURL=joiprops.js.map