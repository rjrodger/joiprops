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
    var JB: (b: boolean) => Joi.BooleanSchema;
    var JS: (s: string) => Joi.StringSchema;
    var JN: (n: number) => Joi.NumberSchema;
    var JO: (o: any) => Joi.ObjectSchema<any>;
    var JA: (a: any) => Joi.ArraySchema;
}
declare const JT: Joi.BooleanSchema;
declare const JF: Joi.BooleanSchema;
declare const JB: (b: boolean) => Joi.BooleanSchema;
declare const JS: (s: string) => Joi.StringSchema;
declare const JN: (n: number) => Joi.NumberSchema;
declare const JO: (o: any) => Joi.ObjectSchema<any>;
declare const JA: (a: any) => Joi.ArraySchema;
export { JoiProps, Joi, Nua, JT, JF, JB, JS, JN, JO, JA };
