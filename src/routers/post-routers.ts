import {Request, Response, Router} from "express";
import {postsReposetories} from "../repositories/posts-db-reposetories";
import {postsValidation} from "../middlewares/posts/posts-validation";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authorizationMiddleware} from "../middlewares/authorization";
import {postTypeOutput} from "../db/types/post-types";

export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const foundPosts: postTypeOutput[] = await postsReposetories.getAllPosts()
    res.send(foundPosts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    let post = await postsReposetories.getPostById(req.params.id)
    if (post) {
        res.status(200).send(post)
    } else {
        res.sendStatus(404)
    }
})

postsRouter.post('/',
    authorizationMiddleware,
    postsValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newPosts = await postsReposetories.createNewPost(req.body)
        res.status(201).send(newPosts)
    })

postsRouter.put('/:id',
    authorizationMiddleware,
    postsValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdate = await postsReposetories.updatePostById(req.params.id, req.body)
        if (isUpdate) {
            const post = await postsReposetories.getPostById(req.params.id)
            res.status(204).send(post)
        } else {
            res.sendStatus(404)
        }
    })

postsRouter.delete('/:id', authorizationMiddleware, async (req: Request, res: Response) => {
    const isDelete = await postsReposetories.deletePostById(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})