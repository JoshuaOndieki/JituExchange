import request from 'supertest'
import app from '../app'


describe('Test Auth endpoints', ()=>{
    let efjuer_token:string

    it('should sign up a user', async ()=>{
        return request(app).post('/users')
            .send({
                "username": "efjuer",
                "email": "jhdvcrtd@example.com",
                "password": "44e#rR"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then(res => {
                expect(res.body).toEqual({
                    message: "sign up successful."
                })
            })
    })

    it('should sign in an existing user with email', async ()=> {
        return request(app).post('/users/signin')
            .send({
                "identifier": "jhdvcrtd@example.com",
                "password": "44e#rR"
            })
            .expect(200)
            .then(res => {
                efjuer_token = res.body.token
            })
    })

    it('should fetch user with username', async ()=> {
        return request(app).get('/users/u/efjuer')
        .set("token", efjuer_token)
        .expect(200)
        .then(res => {
            expect(res.body.username).toBe("efjuer")
        })
    })
})