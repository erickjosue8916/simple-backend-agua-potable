const dayjs = require('dayjs')
const {Firestore} = require('@google-cloud/firestore')
const { parseRowResponse } = require('../../utils/firebase')

const db = new Firestore()

const collectionName = 'issues'

exports.list = async () => {
  const query = await db.collection(collectionName).get()
  const data = parseRowResponse(query)
  return data
}

exports.resolved = async (filter) => {
  const query = await db.collection(collectionName).where('isResolved', '==', filter).get()
  const data = parseRowResponse(query)
  return data
}


exports.create = async ({customerId, description}) => {
  const payload = {
    customerId,
    description,
    createAt: dayjs().format(),
    isResolved: false
  }
  const res = await db.collection(collectionName).add(payload)
  return res.id
}

exports.getIssueById = async (id) => {
  try {
    const document = await db.collection(collectionName).doc(id).get()
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

exports.getIssuesByCustomerId = async (customerId) => {
  const query = await db.collection(collectionName).where('customerId', '==', customerId).get()
  const data = parseRowResponse(query)
  return data
}