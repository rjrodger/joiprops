import Joi from 'joi';
import Nua from 'nua';
declare function JoiProps(schema: object): {
    props: any;
    beforeCreate(): void;
};
declare namespace JoiProps {
    var Joi: Joi.Root;
    var Nua: typeof import("nua");
}
export { JoiProps, Joi, Nua };
