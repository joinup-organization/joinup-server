export interface IGenericDatabase {
    readonly id: string
    readonly createdAt: string
    readonly updatedAt: string
}

export enum ECollections {
    plan = 'plan',
    project = 'project',
    vacancy = 'vacancy',
    user = 'user',
    projectOwner = 'projectOwner'
}