import * as functions from 'firebase-functions'
import * as yup from 'yup'

import { IFirebaseFunction, IResponse } from '../../Response/Response.model'

class UserValidator {
  public readonly createUserValidator = (fn: IFirebaseFunction) => {
    return async (req: functions.https.Request, res: functions.Response<IResponse<string>>) => {
      try {
        const schema = this.buildCreateUserValidator()
        await schema.validate(req.body)
        return fn(req, res)
      } catch (error) {
        const safeError = error as yup.ValidationError

        return res.status(400).send({
          status: false,
          errors: safeError.errors || ['Um ou mais parâmetros enviados estão inconsistentes'],
          message: 'Dados enviados inconsistentes',
        })
      }
    }
  }

  private readonly buildCreateUserValidator = () => {
    return yup.object().required().shape({
      name: yup.string().strict().required(),
      email: yup.string().strict().required().email(),
      password: yup.string().strict().required(),
    })
  }
}

export const { createUserValidator } = new UserValidator()
