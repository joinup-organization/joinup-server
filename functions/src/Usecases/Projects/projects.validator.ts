import * as functions from 'firebase-functions'
import * as yup from 'yup'

import { IFirebaseFunction, IResponse } from '../../Response/Response.model'

class CreateProjectValidator {
  public readonly createProjectValidator = (fn: IFirebaseFunction) => {
    return async (req: functions.https.Request, res: functions.Response<IResponse<null>>) => {
      try {
        const schema = this.buildCreateLanguageValidator()
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

  private readonly buildCreateLanguageValidator = () => {
    return yup
      .object()
      .required()
      .shape({
        name: yup.string().strict().required(),
        description: yup.string().strict().required(),
        POId: yup.string().strict().required(),
        enterpriseName: yup.string().strict().required(),
        vacancies: yup
          .array()
          .required()
          .of(
            yup
              .object()
              .strict()
              .shape({
                id: yup.string().strict().required(),
                name: yup.string().strict().required(),
                level: yup
                  .string()
                  .strict()
                  .required()
                  .matches(/(intern|trainee|junior|middle|senior|specialist)/),
                description: yup.string().strict().required(),
                experienceYears: yup.number().strict().required(),
                higherEducation: yup.boolean().strict().required(),
                salaryRange: yup.object().required().shape({
                  min: yup.number().strict().required(),
                  max: yup.number().strict().required(),
                }),
              }),
          )
          .min(1),
        benefits: yup.object().optional().shape({
          transportationVoucher: yup.number().strict().optional(),
          mealTicket: yup.number().strict().optional(),
          homeOfficeVoucher: yup.number().strict().optional(),
          others: yup.string().strict().optional(),
        }),
      })
  }
}

export const { createProjectValidator } = new CreateProjectValidator()
