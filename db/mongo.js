// db/mongo.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!process.env.MONGO_URI) {
  throw new Error("Falta MONGO_URI en las variables de entorno");
}

if (process.env.NODE_ENV === "development") {
  // Reutilizar conexión en desarrollo
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Nueva conexión en producción (Vercel)
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

module.exports = clientPromise;
