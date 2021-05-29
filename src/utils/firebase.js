exports.parseRowResponse = async (queryResponse) => {
  const data = []
  queryResponse.forEach(doc => {
    data.push({
      id: doc.id, 
      ...doc.data()
    })
  })
  return data
}