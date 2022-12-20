const {Strategy} = require('passport-local');
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UsersService = require('../../../services/users.service')

const service = new UsersService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
},async (email, password, done)=>{
    try{
        const user = await service.findByEmail(email);
        if(!user){
            done(boom.unauthorized(), false)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            done(boom.unauthorized(), false)
        }
        done(null, user)
    }
    catch(err){
        done(err, false)
    }
});

module.exports = LocalStrategy;