/* Copyright (c) 2020 Richard Rodger, MIT License */
/* $lab:coverage:off$ */

// TODO: implement sibling mixin for yup: https://github.com/jquense/yup

import Joi from 'joi'
import Nua from 'nua'

/* $lab:coverage:on$ */

const reals: any = {
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
}

function JoiProps(schema: object) {
  let joischema: any = Joi.isSchema(schema, { legacy: true })
    ? schema
    : Joi.object(schema).unknown().default()
  let props: any = {}

  // Magic below ensures prop types and defaults are correctly defined
  // for Vue (otherwise they get obliterated by reactivity).
  joischema.$_terms.keys.forEach((term: any) => {
    let key = term.key
    let type = term.schema.type
    let real = reals[type] || Object

    props[key] = {
      type: real,
      default:
        'object' !== type
          ? term.schema._flags.default
          : () => {
              // NOTE: this will fail for schemas that do not provide full defaults,
              // which is what you want - required values are, you know, required.
              return Joi.attempt({}, term.schema)
            },
    }
  })

  return {
    props,
    beforeCreate() {
      let props = this.$options.propsData

      // Nua is an object-preserving merge, and thus
      // does not destroy Vue observers.
      Nua(
        props,
        Joi.attempt(
          props,
          joischema,
          'JoiProps:' +
            resolve_component_name(this.$options) +
            ' props validation failed:'
        )
      )
    },
  }
}

function resolve_component_name(options: any) {
  let cn: string =
    (options &&
      (options.name || options._componentTag || options.__file || '')) ||
    ''
  return 0 === cn.length ? '' : ' ' + cn
}

JoiProps.Joi = Joi
JoiProps.Nua = Nua

const jb = Joi.boolean()
const js = Joi.string()
const jn = Joi.number()
const jo = Joi.object()
const ja = Joi.array()

const Jr = Symbol('Joi_required')
const JT = (JoiProps.JT = jb.default(true))
const JF = (JoiProps.JF = jb.default(false))
const JB = (JoiProps.JB = (b: boolean | Symbol) =>
  null == b ? jb : Jr === b ? jb.required() : jb.default(b))
const JS = (JoiProps.JS = (s: string | Symbol) =>
  null == s ? js : Jr === s ? js.required() : js.default(s))
const JN = (JoiProps.JN = (n: number | Symbol) =>
  null == n ? jn : Jr === n ? jn.required() : jn.default(n))
const JO = (JoiProps.JO = (o: any | Symbol) =>
  null == o ? jo : Jr === o ? jo.required() : Joi.object(o).default())
const JA = (JoiProps.JA = (a: any | Symbol) =>
  null == a ? ja : Jr === a ? ja.required() : ja.items(a).default([]))
const JOu = (JoiProps.JOu = (o: any) =>
  null == o ? jo.unknown().default() : Joi.object(o).unknown().default())
const JAd = (JoiProps.JAd = (a: any) => ja.default(a))
const JOd = (JoiProps.JOd = (o: any) => jo.unknown().default(o))

export { JoiProps, Joi, Nua, JT, JF, JB, JS, JN, JO, JA, JOu, JOd, JAd, Jr }
