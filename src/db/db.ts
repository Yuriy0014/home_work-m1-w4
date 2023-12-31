import {MongoClient} from "mongodb";
import {blogTypeInput} from "./types/blog-types";
import {postTypeInput} from "./types/post-types";
import {postCommentInput} from "./types/comments-types";
import {userAccountDBType} from "./types/user-types";

const mongoUri = process.env.mongoURI || 'mongodb+srv://Julian871:datajulianbase2023@julian871.cehbrfy.mongodb.net/hw3?retryWrites=true&w=majority'

export const client = new MongoClient(mongoUri);

export const db = client.db('hw3')
export const blogsCollection = db.collection<blogTypeInput>('blogs')
export const postsCollection = db.collection<postTypeInput>('posts')
export const usersCollection = db.collection<userAccountDBType>('users')
export const postsCommentsCollection = db.collection<postCommentInput>('postsComments')
export const blackListCollection = db.collection<any>('blackList')

export async function runDb() {
    try {
        await client.connect()
        await client.db('blogs').command({ping: 1})
        console.log('Connected successful to server')
    } catch {
        console.log('Error connect to server')
        await client.close()
    }
}