const dayjs = require('dayjs')
const { Firestore } = require('@google-cloud/firestore')
const { parseRowResponse } = require('../../utils/firebase')

const db = new Firestore()

exports.list = async () => {
  const query = await db.collection('customers').get()
  const data = parseRowResponse(query)
  return data
}

exports.listPending = async () => {
  const query = await db.collection('customers').where('monthlyCapturePending', '==', true).get()
  const data = parseRowResponse(query)
  return data
}


exports.create = async (id, data) => {
  const newCustomer = await db.collection('customers').doc(id).set(data)
  return newCustomer
}

exports.createPayloadForNew = (data) => {
  const id = data.dui
  delete data.dui
  return {
    id, payload: {
      ...data,
      totalCount: 0,
      count: 0,
      monthlyCapturePending: true,
      lastUpdate: dayjs().format()
    }
  }
}

exports.getCustomerById = async (id) => {
  try {
    const document = await db.collection('customers').doc(id).get()
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