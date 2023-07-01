import request from 'supertest'
import app from '../app'


describe('Perform CRUD operations on questions', ()=> {
    let token = ''
    let swaliID = ''

    beforeAll(async ()=>{
        // sign up and in user to access question endpoints
        const res = await request(app).post('/users')
            .send({
                "username": "testerquestions",
                "email": "testerquestions@example.com",
                "password": "44e#rR"
            })
        const res_1 = await request(app).post('/users/signin')
            .send({
                "identifier": "testerquestions",
                "password": "44e#rR"
            })
        token = res_1.body.token
        return
    }, 20000)

    it('should add a question', async ()=> {
        const res = await request(app).post('/questions')
            .send({
                "summary": "swali",
                "details": "ni swali tu",
                "tags": ["javascript", "angular"]
            })
            .set('token', token)
            .set('token', token)
            .expect(201)
        expect(res.body.id)
        expect(res.body.message).toBe('question posted successfully.')
        swaliID = res.body.id
        return
    })

    it('should fetch an existing question by id', async ()=> {
        const res = await request(app).get('/questions/q/' + swaliID)
            .set('token', token)
            .expect(200)
        expect(res.body.id).toBe(swaliID)
        expect(res.body.summary).toBe('swali')
        expect(res.body.details).toBe('ni swali tu')
        return
    })

    it('should return 404 for non existent question ID', async ()=> {
        const res = await request(app).get('/questions/q/net-nonexistent-question-404id')
            .set('token', token)
            .expect(404)
        expect(res.body).toEqual({ message: 'question not found. ID net-nonexistent-question-404id' })
        return
    })

    it('should update a question', async ()=> {
        const res = await request(app).put('/questions/q/' + swaliID)
            .send({
                "summary": "swali updated",
                "details": "sio swali tu",
                "tags": ["javascript", "angular", "typescript"]
            })
            .set('token', token)
            .expect(200)
        expect(res.body.message).toBe('question updated successfully.')
        const res_1 = await request(app).get('/questions/q/' + swaliID)
            .set('token', token)
            .expect(200)
        expect(res_1.body.id).toBe(swaliID)
        expect(res_1.body.summary).toBe('swali updated')
        return
    })

    it('should add an answer to an existing question', ()=> {
        console.log(swaliID);
        
        return request(app).post('/answers/' + swaliID)
            .send({
                "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia, enim ut molestie porttitor."
            })
            .set('token', token)
            .expect(201)
    })

    it('should upvote a question', async ()=> {
        const res = await request(app).post('/votes')
            .send({
                "target": "question",
                "voteFor": swaliID,
                "positive": true
            })
            .set('token', token)
            .expect(201)
        expect(res.body).toEqual({ message: `question upvoted` })
    })

    it('should downvote a question', async ()=> {
        const res = await request(app).post('/votes')
            .send({
                "target": "question",
                "voteFor": swaliID,
                "positive": false
            })
            .set('token', token)
            .expect(201)
        expect(res.body).toEqual({ message: `question downvoted` })
    })

    it('should add a comment to a question', ()=> {
        return request(app).post('/comments')
            .send({
                "details": "my ipsum answer comment",
                "commentFor": swaliID,
                "target": "question"
            })
            .set('token', token)
            .expect(201)
    })

    it('should delete a question', async ()=> {
        const res = await request(app).delete('/questions/q/' + swaliID)
            .set('token', token)
            .expect(200)
        return await request(app).get('/questions/q/' + swaliID)
            .set('token', token)
            .expect(404)
    })
})