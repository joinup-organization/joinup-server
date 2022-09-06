import * as admin from 'firebase-admin'
import { firestore } from 'firebase-admin'

import { ECollections, optionWhere } from '../../Database/database.model'
import { DefaultError } from '../../Errors/DefaultError'

import { IFirestoreAdapter } from './firestore.model'

class FirestoreAdapter implements IFirestoreAdapter {
  public async getItems<T>(collection: ECollections) {
    const data = await admin.firestore().collection(collection).get()
    return this.parseData<T>(data)
  }

  public async getItem<T>(collection: ECollections, id: string) {
    const doc = await admin.firestore().collection(collection).doc(id).get()
    if (!doc.exists) throw new DefaultError('Documento não encontrado', 400)
    return { ...(doc.data() as T), id: doc.id }
  }

  public async getItemsByParams<T>(
    collection: ECollections,
    options: optionWhere[],
    orderBy?: string,
    sort?: 'desc' | 'asc',
    limit?: number,
  ) {
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = admin
      .firestore()
      .collection(collection)
    options.forEach(op => {
      query = query.where(op.key, op.type, op.value)
    })
    if (orderBy) {
      query = query.orderBy(orderBy, sort ?? 'asc')
    }
    if (limit) {
      query = query.limit(limit)
    }
    const response = await query.get()
    if (!response) {
      throw new Error('Erro ao buscar os dados')
    }
    if (response.empty) {
      return []
    }
    return this.parseData<T>(response)
  }

  public async updateItemById<T>(
    collection: ECollections,
    id: string,
    updatedItem: { [fieldPath: string]: any },
  ) {
    const dataRef = admin.firestore().collection(collection).doc(id)
    const data = await dataRef.get()
    if (!data.exists) throw new DefaultError('Não foi possivel atualizar', 404)
    await dataRef.update(updatedItem)
  }

  public async createItem(collection: ECollections, params: { [fieldPath: string]: any }) {
    const ref = admin.firestore().collection(collection)
    const response = await ref.add(params)
    return response.id
  }

  public async createItemWithId(collection: ECollections, id: string, params: { [fieldPath: string]: any }) {
    const ref = admin.firestore().collection(collection).doc(id)
    const doc = await ref.get()
    if (doc.exists) {
      throw new DefaultError('Documento já existe', 400)
    }
    await ref.set({ id, ...params })
    return id
  }

  public getReference(collection: ECollections, id: string) {
    return admin.firestore().collection(collection).doc(id)
  }

  public getCollectionReference(collection: ECollections) {
    return admin.firestore().collection(collection)
  }

  public updateItemByIdWithBatch(
    batch: firestore.WriteBatch,
    collection: ECollections,
    id: string,
    updatedItem: { [fieldPath: string]: any },
  ) {
    const ref = this.getReference(collection, id)
    batch.update(ref, updatedItem)
  }

  public deleteItemByIdWithBatch(batch: firestore.WriteBatch, collection: ECollections, id: string) {
    const ref = this.getReference(collection, id)
    batch.delete(ref)
  }

  public createItemByIdWithBatch(
    batch: firestore.WriteBatch,
    collection: ECollections,
    id: string,
    doc: { [fieldPath: string]: any },
  ) {
    const ref = this.getReference(collection, id)
    batch.create(ref, doc)
  }

  public async batchCommit(batch: firestore.WriteBatch) {
    await batch.commit()
  }

  public getBatch() {
    return admin.firestore().batch()
  }

  public getItemsByInnerCollection = async <T>(
    collection: ECollections,
    id: string,
    innerCollection: ECollections,
  ) => {
    const data = await admin.firestore().collection(collection).doc(id).collection(innerCollection).get()
    return this.parseData<T>(data)
  }

  public createItemInInnerCollection = async <T>(
    collection: ECollections,
    id: string,
    innerCollection: ECollections,
    item: T,
  ) => {
    const document = await admin
      .firestore()
      .collection(collection)
      .doc(id)
      .collection(innerCollection)
      .add(item as firestore.DocumentData)

    return document as unknown as T
  }

  public createItemInInnerCollectionWithId = async <T>(
    collection: ECollections,
    id: string,
    innerCollection: ECollections,
    item: T & { id: string },
  ) => {
    const documentRef = await admin
      .firestore()
      .collection(collection)
      .doc(id)
      .collection(innerCollection)
      .doc(item.id)
    const doc = await documentRef.get()
    if (doc.exists) {
      throw new DefaultError('Documento já existe', 400)
    }
    await documentRef.set(item)
  }

  public deleteItemInInnerCollection = async (
    collection: ECollections,
    id: string,
    innerCollection: ECollections,
    itemId: string,
  ) => {
    await admin.firestore().collection(collection).doc(id).collection(innerCollection).doc(itemId).delete()
  }

  private parseData<T>(data: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) {
    return data.docs.map(el => ({
      ...(el.data() as T),
      id: el.id,
    }))
  }
}

export const firestoreAdapter = new FirestoreAdapter()
