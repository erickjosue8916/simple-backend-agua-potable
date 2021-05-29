const {Firestore} = require('@google-cloud/firestore')
const dayjs = require('dayjs')
const { parseRowResponse } = require('../../../utils/firebase')

const db = new Firestore()

const getCollectionPath = (customer) => {
  return `customers/${customer.id}/counter_logs`
}

const getCustomerReferencePath = (customer) => {
  return `customers/${customer.id}`
}


exports.list = async ({customer}) => {
  const query = await db.collection(getCollectionPath(customer)).get()
  const data = parseRowResponse(query)
  return data
}

/**
 * Create Counter log for customer
 * @param {*} param0 {customer, data}
 * @returns 
 */
exports.create = async ({customer, data}) => {
  const currentDate = dayjs().format("YYYY-MM-DD")
  const totalFacture = data.count - customer.totalCount
  const newLog = await db.collection(getCollectionPath(customer)).doc(currentDate).set(data)
  const customerUpdatePayload = {
    totalCount: data.count,
    count: totalFacture,
    lastUpdate: dayjs().format(),
    monthlyCapturePending: false
  }

  const customerRef = await db.collection('customers').doc(customer.id)
  await db.runTransaction(async (t) => {
    t.update(customerRef, customerUpdatePayload)
  })
  const customerWithDataUpdated = Object.assign(customer, customerUpdatePayload)
  return customerWithDataUpdated
}