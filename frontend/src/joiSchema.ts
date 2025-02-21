import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().max(40),
    
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Mots de passe requise',
            'string.min': 'Au moins 6 caracteres',
          }),

    email: Joi.string()
        .email({ tlds: { allow: false }, minDomainSegments: 2 })
        .required()
        .messages({
            'string.empty': 'Email est requise',
            'string.email': "Ce n'est pas une correcte email",
          }),
})

export default schema;