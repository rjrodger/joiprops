// Validate TypeScript usage

import { expect } from '@hapi/code'
import { JoiProps, Joi } from '../joiprops'

const s = {
  a: Joi.string().required(),
  b: Joi.string().default('B')
}

const mixin = JoiProps(s)

//console.log(mixin)

expect(Object.keys(mixin.props)).equal(['a', 'b'])

let vc0 = {
  $options: {
    propsData: {
      a: 'A'
    }
  }
}

mixin.beforeCreate.call(vc0)
// console.log(vc0)

expect(vc0.$options.propsData as object).equal({ a: 'A', b: 'B' })

