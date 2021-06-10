const dayjs = require('dayjs')
const {Firestore} = require('@google-cloud/firestore')
const { parseRowResponse } = require('../../utils/firebase')

const db = new Firestore()

const collection = 'users'

exports.list = async () => {
  const query = await db.collection(collection).get()
  const data = parseRowResponse(query)
  return data
}



exports.create = async (data) => {
  const newCustomer = await db.collection(collection).add(data)
  return newCustomer
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