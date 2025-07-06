import { Client, Account, ID } from "appwrite";

import { conf } from "../conf/conf.ts";


const client = new Client()
    .setEndpoint(conf.appwriteEndpoint)
    .setProject(conf.appwriteProjectId);
const account = new Account(client);

export { client, account, ID };