const config = {
  node_env: (process.env.NODE_ENV),
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 3001,
  mongo: {
    url: process.env.MONGOOSE_CONNECTION_URL || `mongodb://localhost:27017/test`,
  },
  firestore: {
    collections: {
      customers: `${process.env.GOOGLE_FIRESTORE_COLLECTION_CUSTOMERS}`,
      issues: `${process.env.GOOGLE_FIRESTORE_COLLECTION_ISSUES}`,
      counterLogs: `${process.env.GOOGLE_FIRESTORE_COLLECTION_COUNTER_LOGS}`,
    }
  }
}

exports.config = config