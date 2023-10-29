import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://biwomenquarterly:JumboCode2324@biwomenquarterly.17vcngj.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default client;
