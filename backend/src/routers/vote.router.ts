import { Router } from "express";
import { userRequired } from "../middlewares/auth";
import { validateVoteData } from "../middlewares/vote.validator";
import { removeVote, vote } from "../controllers/vote.controller";


const voteRouter = Router()

voteRouter.post('', validateVoteData, userRequired, vote)
voteRouter.delete('', userRequired, removeVote)

export default voteRouter