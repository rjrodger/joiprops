/* Copyright (c) 2013-2020 Richard Rodger and other contributors, MIT License */
'use strict'

let Lab = require('@hapi/lab')
Lab = null != Lab.script ? Lab : require('hapi-lab-shim')

const Code = require('@hapi/code')

const lab = (exports.lab = Lab.script())
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const { JoiProps, Joi, JO, JA, JS, JN, JB, JT, JF, JOu, Jr } = require('..')

describe('joiprops', function () {
  it('happy', () => {
    const s = {
      a: Joi.string().required(),
      b: Joi.string().default('B'),
      m: Joi.object({ n: Joi.number().default(1) }).default(),
    }

    const mixin = JoiProps(s)

    expect(Object.keys(mixin.props)).equal(['a', 'b', 'm'])

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
      m: { n: 1 },
      x: { y: { z: 1 } },
    })
  })

  it('accepts-joi-schema', () => {
    const s = Joi.object({
      a: Joi.string().required(),
      b: Joi.string().default('B'),
    })

    const mixin = JoiProps(s)

    expect(Object.keys(mixin.props)).equal(['a', 'b'])

    let vc0 = {
      $options: {
        propsData: {
          a: 'A',
        },
      },
    }

    mixin.beforeCreate.call(vc0)

    expect(vc0.$options.propsData).equal({
      a: 'A',
      b: 'B',
    })
  })

  it('errors', () => {
    const s0 = {
      a: Joi.string().required(),
    }

    const mixin = JoiProps(s0)

    let vc0 = {
      $options: {
        name: 'foo',
        propsData: {
          a: 1,
        },
      },
    }

    try {
      mixin.beforeCreate.call(vc0)
      Code.fail()
    } catch (e) {
      expect(e.message).equals(
        'JoiProps: foo props validation failed: "a" must be a string'
      )
    }
  })

  it('shortcuts', () => {
    let s = JO({
      a: JS('A'),
      b: JN(1).min(0),
      c: JS(),
      d: JB(Jr),
      e: JB(false),
      f: JT,
      g: JF,
      h: JO(),
      i: JA(),
      j: JA(JO({ jj: JT })),
      k: JOu(),
      l: JS(Jr),
      m: JN(Jr),
      n: JA(Jr),
    })

    expect(Joi.attempt(
      {
        d: true,
        k: {
          kk: 1
        },
        l: 'L',
        m: 10,
        n: [],
      }, s))
      .equal({
        a: 'A',
        b: 1,
        d: true,
        e: false,
        f: true,
        g: false,
        j: [],
        k: { kk: 1},
        l: 'L',
        m: 10,
        n: [],
      })

    try {
      Joi.attempt({ b: -1 }, s)
      Code.fail()
    } catch (e) {
      expect(e.message).equal('"b" must be greater than or equal to 0')
    }

    try {
      Joi.attempt({ d: true, l:'L', m: 10, n: [], j: [{ jj: 0 }] }, s)
      Code.fail()
    } catch (e) {
      expect(e.message).equal('"j[0].jj" must be a boolean')
    }
  })
})
