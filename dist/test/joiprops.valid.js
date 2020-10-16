"use strict";
// Validate TypeScript usage
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("@hapi/code");
const joiprops_1 = require("../joiprops");
const s = {
    a: joiprops_1.Joi.string().required(),
    b: joiprops_1.Joi.string().default('B')
};
const mixin = joiprops_1.JoiProps(s);
//console.log(mixin)
code_1.expect(Object.keys(mixin.props)).equal(['a', 'b']);
let vc0 = {
    $options: {
        propsData: {
            a: 'A'
        }
    }
};
mixin.beforeCreate.call(vc0);
// console.log(vc0)
code_1.expect(vc0.$options.propsData).equal({ a: 'A', b: 'B' });
//# sourceMappingURL=joiprops.valid.js.map