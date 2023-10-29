import { MongoClient } from "mongodb";

const uri: string =
    "mongodb+srv://biwomenquarterly:JumboCode2324@biwomenquarterly.17vcngj.mongodb.net/";
const client: MongoClient = new MongoClient(uri);

export default client;
