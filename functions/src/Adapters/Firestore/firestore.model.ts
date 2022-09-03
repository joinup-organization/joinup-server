import { firestore } from 'firebase-admin'

import { ECollections, optionWhere } from '../../Database/database.model'

export interface IFirestoreAdapter {
  getItem: <T>(collection: ECollections, id: string) => Promise<T>
  getReference: (collection: ECollections, id: string) => firestore.DocumentReference<firestore.DocumentData>
  getCollectionReference: (collection: ECollections) => firestore.CollectionReference<firestore.DocumentData>
  getItems: <T>(collection: ECollections) => Promise<T[]>
  getItemsByParams: <T>(
    collection: ECollections,
    options: optionWhere[],
    orderBy?: string,
    sort?: 'desc' | 'asc',
    limit?: number,
  ) => Promise<Array<T & { id: string }>>
  createItem: <T>(collection: ECollections, params: { [fieldPath: string]: any }) => Promise<string>
  createItemWithId: <T>(
    collection: ECollections,
    id: string,
    params: { [fieldPath: string]: any },
  ) => Promise<string>
  updateItemById: <T>(
    collection: ECollections,
    id: string,
    updatedItem: { [fieldPath: string]: any },
  ) => Promise<void>
  updateItemByIdWithBatch: (
    batch: firestore.WriteBatch,
    collection: ECollections,
    id: string,
    updatedItem: { [fieldPath: string]: any },
  ) => void
  deleteItemByIdWithBatch: (batch: firestore.WriteBatch, collection: ECollections, id: string) => void
  createItemByIdWithBatch: (
    batch: firestore.WriteBatch,
    collections: ECollections,
    id: string,
    doc: { [fieldPath: string]: any },
  ) => void
  batchCommit: (batch: firestore.WriteBatch) => Promise<void>
  getBatch: () => firestore.WriteBatch
  getItemsByInnerCollection: <T>(
    collection: ECollections,
    id: string,
    innerCollection: ECollections,
  ) => Promise<T[]>
  createItemInInnerCollection: <T>(
    collection: ECollections,
    id: string,
    innerCollection: ECollections,
    item: T,
  ) => Promise<T>
  deleteItemInInnerCollection: <T>(
    collection: ECollections,
    id: string,
    innerCollection: ECollections,
    itemId: string,
  ) => Promise<void>
}
