class ProjectCreatorController extends IProjectCreatorController {
    constructor(private readonly projectCreatorService: IProjectCreatorService = new projectCreatorService()) { }

    public readonly createPJPO = compose(
        functions.https.onRequest,
        createPJPOValidator,
        corsMiddleware,
    )(async (req: functions.https.Request, res: functions.Response<IResponse<string>>) => {
        try {
            const poData: IPJPOData = req.body
            const id = await this.projectCreatorService.createPJPO(poData)
            responseController(res, responseMessageDefault.post, showMessageMap.true, id)
        } catch (error) {
            errorController(error, res)
        }
    })

    public readonly createPFPO = compose(
        functions.https.onRequest,
        createPFPOValidator,
        corsMiddleware,
    )(async (req: functions.https.Request, res: functions.Response<IResponse<string>>) => {
        try {
            const poData: IPJPOData = req.body
            const id = await this.projectCreatorService.createPFPO(poData)
            responseController(res, responseMessageDefault.post, showMessageMap.true, id)
        } catch (error) {
            errorController(error, res)
        }
    })

    public readonly getPJPO = compose(
        functions.https.onRequest,
        getByIdValidator,
        corsMiddleware,
    )(async (req: functions.https.Request, res: functions.Response<IResponse<IProjectOwnerPJ>>) => {
        try {
            const id = req.query
            const po = await this.projectCreatorService.getPJPO(id)
            responseController(res, responseMessageDefault.post, showMessageMap.true, po)
        } catch (error) {
            errorController(error, res)
        }
    })

    public readonly getPFPO = compose(
        functions.https.onRequest,
        getByIdValidator,
        corsMiddleware,
    )(async (req: functions.https.Request, res: functions.Response<IResponse<IProjectOwnerPF>>) => {
        try {
            const id = req.query
            const po = await this.projectCreatorService.getPFPO(id)
            responseController(res, responseMessageDefault.post, showMessageMap.true, po)
        } catch (error) {
            errorController(error, res)
        }
    })

    public readonly listPO = compose(
        functions.https.onRequest,
        corsMiddleware,
    )(async (req: functions.https.Request, res: functions.Response<IResponse<IProjectOwner[]>>) => {
        try {
            const projectOwners = await this.projectCreatorService.listPO(id)
            responseController(res, responseMessageDefault.post, showMessageMap.true, projectOwners)
        } catch (error) {
            errorController(error, res)
        }
    })
}