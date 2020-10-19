/* Copyright (c) 2013-2020 Richard Rodger and other contributors, MIT License */
'use strict'

let Lab = require('@hapi/lab')
Lab = null != Lab.script ? Lab : require('hapi-lab-shim')

const Code = require('@hapi/code')

const lab = (exports.lab = Lab.script())
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const { JoiProps, Joi } = require('..')

describe('joiprops', function () {
  it('happy', () => {
    const s = {
      a: Joi.string().required(),
      b: Joi.string().default('B'),
    }

    const mixin = JoiProps(s)

    expect(Object.keys(mixin.props)).equal(['a', 'b'])

    let vc0 = {
      $options: {
        propsData: {
          a: 'A',

          // to be left alone
          x: { y: { z: 1 } },
        },
      },
    }

    mixin.beforeCreate.call(vc0)

    expect(vc0.$options.propsData).equal({
      a: 'A',
      b: 'B',
      x: { y: { z: 1 } },
    })
  })
})
