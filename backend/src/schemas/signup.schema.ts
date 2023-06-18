import joi from 'joi'

const signupSchema = joi.object({
username: joi.string().required().min(2),
email: joi.string().email().required(),
password: joi.string().required().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$`)).messages({
    'string.pattern.base': 'Invalid password. Please ensure it has at least 6 characters, including uppercase and lowercase letters, numbers, and special characters.',
  })
})

export default signupSchema