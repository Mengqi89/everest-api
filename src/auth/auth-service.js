const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')


const AuthService = {
    getSchoolUsername(db, username) {
        return db('everest_schools')
            .where({ username })
            .first()
    },
    getAdminUsername(db, username) {
        return db('everest_admins')
            .where({ username })
            .first()
    },
    getTeacherWithUsername(db, username) {
        return db('everest_teachers')
            .where({ username })
            .first()
    },
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            algorithm: 'HS256',
        })
    },
    verifyJwt(token) {
        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256'],
        })
    },
    parseBasicToken(token) {
        return Buffer
            .from(token, 'base64')
            .toString()
            .split(':')
    },
}

module.exports = AuthService