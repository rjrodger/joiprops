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

export { JoiProps, Joi, Nua }
