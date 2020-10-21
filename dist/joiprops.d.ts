import Joi from 'joi';
import Nua from 'nua';
declare function JoiProps(schema: object): {
    props: any;
    beforeCreate(): void;
};
declare namespace JoiProps {
    var Joi: Joi.Root;
    var Nua: typeof import("nua");
    var JT: Joi.BooleanSchema;
    var JF: Joi.BooleanSchema;
    var JB: (b: boolean | Symbol) => Joi.BooleanSchema;
    var JS: (s: string | Symbol) => Joi.StringSchema;
    var JN: (n: number | Symbol) => Joi.NumberSchema;
    var JO: (o: any) => Joi.ObjectSchema<any>;
    var JA: (a: any) => Joi.ArraySchema;
    var JOu: (o: any) => Joi.ObjectSchema<any>;
}
declare const Jr: unique symbol;
declare const JT: Joi.BooleanSchema;
declare const JF: Joi.BooleanSchema;
declare const JB: (b: boolean | Symbol) => Joi.BooleanSchema;
declare const JS: (s: string | Symbol) => Joi.StringSchema;
declare const JN: (n: number | Symbol) => Joi.NumberSchema;
declare const JO: (o: any | Symbol) => Joi.ObjectSchema<any>;
declare const JA: (a: any | Symbol) => Joi.ArraySchema;
declare const JOu: (o: any) => Joi.ObjectSchema<any>;
export { JoiProps, Joi, Nua, JT, JF, JB, JS, JN, JO, JA, JOu, Jr };
