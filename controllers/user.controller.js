const UserService = require('../services/UserService')

module.exports = {
    getUser: async (req, res) => {
        try{
            const getUser = await UserService.getUser(req.params.id);
            res.json({
                email: getUser["email"]
            });
        }
        catch(err){
            res.status(500).send({error: err})
        }
    }
}