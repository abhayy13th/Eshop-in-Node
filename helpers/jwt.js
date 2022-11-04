const { expressjwt: expressJwt } = require('express-jwt')
const { User } = require("../models/user")

function authJwt(){
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked:isRevoked
    })
    .unless({
        path: [
            {url: /\/public\/uploads(.*)/ , methods: ['GET','OPTIONS']},
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET','OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET','OPTIONS']},
            
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}
async function isRevoked(req, token) {   
    if(!token.payload.isAdmin) {
        return true
    }
    return undefined;
}

module.exports = authJwt