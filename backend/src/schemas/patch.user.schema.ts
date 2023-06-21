import joi from 'joi'

const patchUserSchema = joi.object({
    firstname: joi.string().allow(null),
    lastname: joi.string().allow(null),
    location: joi.string().allow(null),
    website: joi.string().allow(null).uri({ scheme: ['http', 'https'] }),
    github: joi.string().allow(null).pattern(new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)).messages({
        'string.pattern.base': 'Github username may only contain alphanumeric characters or hyphens. Github username cannot have multiple consecutive hyphens. Github username cannot begin or end with a hyphen. Maximum is 39 characters.',
      }),
    avatar: joi.string().allow(null).uri({ scheme: ['http', 'https'] })
})

export default patchUserSchema