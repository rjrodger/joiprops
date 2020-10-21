"use strict";
/* Copyright (c) 2020 Richard Rodger, MIT License */
/* $lab:coverage:off$ */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jr = exports.JAd = exports.JOd = exports.JOu = exports.JA = exports.JO = exports.JN = exports.JS = exports.JB = exports.JF = exports.JT = exports.Nua = exports.Joi = exports.JoiProps = void 0;
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
const jb = joi_1.default.boolean();
const js = joi_1.default.string();
const jn = joi_1.default.number();
const jo = joi_1.default.object();
const ja = joi_1.default.array();
const Jr = Symbol('Joi_required');
exports.Jr = Jr;
const JT = (JoiProps.JT = jb.default(true));
exports.JT = JT;
const JF = (JoiProps.JF = jb.default(false));
exports.JF = JF;
const JB = (JoiProps.JB = (b) => null == b ? jb : Jr === b ? jb.required() : jb.default(b));
exports.JB = JB;
const JS = (JoiProps.JS = (s) => null == s ? js : Jr === s ? js.required() : js.default(s));
exports.JS = JS;
const JN = (JoiProps.JN = (n) => null == n ? jn : Jr === n ? jn.required() : jn.default(n));
exports.JN = JN;
const JO = (JoiProps.JO = (o) => null == o ? jo : Jr === o ? jo.required() : joi_1.default.object(o).default());
exports.JO = JO;
const JA = (JoiProps.JA = (a) => null == a ? ja : Jr === a ? ja.required() : ja.items(a).default([]));
exports.JA = JA;
const JOu = (JoiProps.JOu = (o) => null == o ? jo.unknown().default() : joi_1.default.object(o).unknown().default());
exports.JOu = JOu;
const JAd = (JoiProps.JAd = (a) => ja.default(a));
exports.JAd = JAd;
const JOd = (JoiProps.JOd = (o) => jo.unknown().default(o));
exports.JOd = JOd;
//# sourceMappingURL=joiprops.js.map