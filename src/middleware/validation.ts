import express from 'express'
import { body, check, ValidationChain, validationResult } from 'express-validator'

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req)
      if (result.array.length) break
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}

const validateAuthInput = validate([
  body('username').isLength({ min: 6, max: 12 }),
  body('password').isLength({ min: 8, max: 12 })
])

export { validateAuthInput }
