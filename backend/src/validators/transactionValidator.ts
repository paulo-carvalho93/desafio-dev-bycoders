import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    tipo: Joi.string().required(),
    valor: Joi.number().required(),
    cpf: Joi.string().required(),
    cartao: Joi.string().required(),
    data: Joi.date().required(),
    hora: Joi.string().required(),
    dono: Joi.string().required(),
    loja: Joi.string().required(),
  }),
});
