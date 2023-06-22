import joi from 'joi'

const voteSchema = joi.object({
    target: joi.string().required(),
    voter: joi.string().required(),
    voteFor: joi.string().required(),
    positive: joi.boolean().required()
})

export default voteSchema