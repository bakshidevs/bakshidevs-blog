import { Client, Account, ID, Databases, Storage } from "appwrite";

import { conf } from "../conf/conf.ts";


const client = new Client()
    .setEndpoint(conf.appwriteEndpoint)
    .setProject(conf.appwriteProjectId);
const account = new Account(client);
const databases = new Databases(client)
const storage = new Storage(client);

export { client, account, databases, storage, ID };