const dayjs = require('dayjs')
const { Firestore } = require('@google-cloud/firestore')
const { parseRowResponse } = require('../../utils/firebase')

const db = new Firestore()
const collection = `requests`

exports.list = async () => {
  const query = await db.collection(collection).get()
  const data = parseRowResponse(query)
  return data
}

exports.listPending = async () => {
  const query = await db.collection(collection).where('status', '==', `pending`).get()
  const data = parseRowResponse(query)
  return data
}


exports.create = async (id, data) => {
  const newCustomer = await db.collection(collection).doc(id).set(data)
  return newCustomer
}

exports.createPayloadForNew = (data) => {
  const id = data.dui
  delete data.dui
  return {
    id, payload: {
      ...data,
      created: dayjs().format(),
      status: `pending`,
      lastUpdate: dayjs().format()
    }
  }
}

exports.getCustomerById = async (id) => {
  try {
    const document = await db.collection(collection).doc(id).get()
    const data = {
      id: id,
      ...document.data()
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

exports.updateStatus = async (id, status) => {
  const result = db.collection(collection).doc(id).update({status})
  return result
}