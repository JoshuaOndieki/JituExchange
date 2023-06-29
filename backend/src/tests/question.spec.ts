import request from 'supertest'
import app from '../app'


describe('Perform CRUD operations on questions', ()=> {
    let token = ''
    let swaliID = ''

    beforeAll(()=>{
        // sign up and in user to access question endpoints
        return request(app).post('/users')
            .send({
                "username": "testerquestions",
                "email": "testerquestions@example.com",
                "password": "44e#rR"
            })
            .then(res => {
                return request(app).post('/users/signin')
                    .send({
                        "identifier": "testerquestions",
                        "password": "44e#rR"
                    })
                    .then(res => {
                        token = res.body.token
                        return
                    })
            })
    })

    it('should add a question', ()=> {
        return request(app).post('/questions')
            .send({
                "summary": "swali",
                "details": "ni swali tu",
                "tags": ["javascript", "angular"]
            })
            .set('token', token)
            .set('token', token)
            .expect(201)
            .then(res => {
                expect(res.body.id)
                expect(res.body.message).toBe('question posted successfully.')
                swaliID = res.body.id
                return
            })
    })

    it('should fetch an existing question by id', ()=> {
        return request(app).get('/questions/q/' + swaliID)
            .set('token', token)
            .expect(200)
            .then(res => {
                expect(res.body.id).toBe(swaliID)
                expect(res.body.summary).toBe('swali')
                expect(res.body.details).toBe('ni swali tu')
                return
            })
    })

    it('should return 404 for non existent question ID', ()=> {
        return request(app).get('/questions/q/net-nonexistent-question-404id')
            .set('token', token)
            .expect(404)
            .then(res => {
                expect(res.body).toEqual({message: 'question not found. ID net-nonexistent-question-404id'})
                return
            })
    })

    it('should update a question', ()=> {
        return request(app).put('/questions/q/' + swaliID)
            .send({
                "summary": "swali updated",
                "details": "sio swali tu",
                "tags": ["javascript", "angular", "typescript"]
            })
            .set('token', token)
            .expect(200)
            .then(res => {
                expect(res.body.message).toBe('question updated successfully.')
                return request(app).get('/questions/q/' + swaliID)
                    .set('token', token)
                    .expect(200)
                    .then(res => {
                        expect(res.body.id).toBe(swaliID)
                        expect(res.body.summary).toBe('swali updated')
                        return
                    })
            })
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

    it('should upvote a question', ()=> {
        return request(app).post('/votes')
            .send({
                "target": "question",
                "voteFor": swaliID,
                "positive": true
            })
            .set('token', token)
            .expect(201)
            .then(res => {
                expect(res.body).toEqual({message: `question upvoted`})
            })
    })

    it('should downvote a question', ()=> {
        return request(app).post('/votes')
            .send({
                "target": "question",
                "voteFor": swaliID,
                "positive": false
            })
            .set('token', token)
            .expect(201)
            .then(res => {
                expect(res.body).toEqual({message: `question downvoted`})
            })
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

    it('should delete a question', ()=> {
        return request(app).delete('/questions/q/' + swaliID)
            .set('token', token)
            .expect(200)
            .then(res => {
                return request(app).get('/questions/q/' + swaliID)
                    .set('token', token)
                    .expect(404)
            })
    })
})