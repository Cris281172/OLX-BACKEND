const User = require('../models/User');
const ResetToken = require('../models/ResetToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {sendTextEmail, sendHTMLEmail} = require('../config/email');

module.exports = class Auth{
    static register = (async(req, res) => {
        try{
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(400).send('All fields are required');
            }

            const checkEmail = await User.findOne({
                email: {
                    $eq: email
                }
            })

            if(checkEmail){
                return res.status(409).send('Email already exists');
            }

            const bcryptPassword = await bcrypt.hash(password, 12);

            const user = await User.create({
                email: email.toLowerCase(),
                password: bcryptPassword,
            })

            const token = jwt.sign(
                {
                    user_id: user._id,
                    email: user.email
                },
                process.env.JWT_TOKEN,
                {
                    expiresIn: '1h'
                }
            )
            user.token = token;
            return res.status(201).send(user);
        }
        catch(err){
            res.send(err);
        }
    })
    static login = (async(req, res) => {

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: 'All fields are required'});
        }


        const user = await User.findOne({
            email: {
                $eq: email
            }
        })


        if(!user){
            return res.status(400).json({error: 'Invalid password or email'});
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).json({error: 'Invalid password or email'});
        }

        const token = jwt.sign(
            {
                user_id: user._id,
                email: user.email,
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: '1h'
            }
        )
        user.token = token;
        return res.status(200).send(user);
    })
    static sendResetMail = (async(req, res) => {
        const {email} = req.body;

        const user = await User.findOne({
            email: {
                $eq: email
            }
        })

        if(!user){
            return res.status(400).send('Invalid email')
        }

        const randomToken = () => {
            let token = '';
            const arrayOfSigns = 'qwetyuiopasdfghjklzxcvbnm'.split('');
            for(let i = 0; i <= 30; i++){
                token += arrayOfSigns[Math.floor(Math.random() * arrayOfSigns.length)];
            }
            return token;
        }

        const token = randomToken();

        if(!email){
            return res.status(400).send('Email is required');
        }

        const checkUserToken = await ResetToken.findOne({
            userId: {
                $eq: user._id
            }
        })
        console.log(checkUserToken);
        let resetTokenUser = {}
        if(checkUserToken){
            checkUserToken.token = token;
            checkUserToken.save();
        }
        else{
            resetTokenUser = await ResetToken.create({
                token: token,
                userId: user._id
            })
        }







        const locals = {
            token: token,
            host: process.env.HOST,
            port: process.env.PORT
        };

        const options = {
            from: "olx@gmail.com",
            to: email,
            subject: "Moja nowa wiadomość!",
            text: "Elo wariacie jaki useEffect"
        }


        sendHTMLEmail(options, locals);
        return res.status(201).send(resetTokenUser);

    })

    static checkResetToken = (async(req, res) => {

        const resetTokenUser = await ResetToken.findOne({
            token: {
                $eq: req.params.id
            }
        })

        if(!resetTokenUser){
            return res.status(400).send('Invalid reset token');
        }


    })

    static changePassword = (async(req, res) => {
        try{
            const {password} = req.body;

            if(!password){
                return res.status(400).send('All fields are required');
            }

            const resetTokenUser = await ResetToken.findOne({
                token: {
                    $eq: req.params.id
                }
            })

            if(!resetTokenUser){
                return res.status(400).send('Invalid reset token');
            }

            const user = await User.findOne({
                _id: {
                    $eq: resetTokenUser.userId
                }
            })

            const bcryptPassword = await bcrypt.hash(password, 12);

            user.password = bcryptPassword;
            user.save();

            return res.status(201).send(user);
        }
        catch(err){
            res.send(err);
        }
    })
}