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
                return
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
                return
            })
    })

    it('should sign in an existing user with username', async ()=> {
        return request(app).post('/users/signin')
            .send({
                "identifier": "efjuer",
                "password": "44e#rR"
            })
            .expect(200)
            .then(res => {
                expect(res.body.token)
                return
            })
    })

})

describe('Test Accessing Protected User Endpoints anonymously', ()=>{
    let efjuer_token:string

    it('should not fetch users without a valid token', async ()=>{
        return request(app).get('/users')
            .expect('Content-Type', /json/)
            .expect(401)
            .then(res => {
                expect(res.body).toEqual({
                    message: "Unauthorized"
                })
                return
            })
    })

    it('should not delete a user without an admin or the specific user to be deleted token', async ()=> {
        return request(app).delete('/users/delete/someID45-thqxd9-2wrsfedf-fed')
            .expect(401)
    })

    it('should not fetch user without providing a token', async ()=> {
        return request(app).get('/users/u/efjuer')
        .expect(401)
    })
    it('should return a 403 if token is expired or invalid', async ()=> {
        return request(app).get('/users/u/efjuer')
        .set("token", 'shdjcduhvnsduiv invalid token')
        .expect(403)
    })
})