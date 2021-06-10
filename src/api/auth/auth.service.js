const dayjs = require('dayjs')
const {Firestore} = require('@google-cloud/firestore')
const { parseRowResponse } = require('../../utils/firebase')

const db = new Firestore()

const collection = 'users'

exports.login = async (username, password, type) => {
  const query = await db.collection(collection).where("username", "==", username).where("password", "==", password).where("type", "==", type).get()
  const data = parseRowResponse(query)
  return data
}