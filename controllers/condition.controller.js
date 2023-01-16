const Condition = require('../models/Condition')
const ConditionService = require('../services/ConditionService')

module.exports = {
    getAllConditions: async(req, res) => {
        try{
            res.json(await ConditionService.getAllConditions());
        }
        catch(err){
            res.status(500).send({error: err})
        }
    },
    createCondition: async (req, res) => {
        try{
            const {name} = req.body;
            const checkCreatedCondition = await Condition.findOne({
                name: {
                    $eq: name
                }
            })
            if(checkCreatedCondition){
                return res.status(409).send('Category already exists');
            }
            const createdCondition = await ConditionService.createCondition(req.body);
            res.status(201).send(createdCondition);
        }
        catch(err){
            res.status(500).send({error: err})
        }
    },
    getCondition: async(req, res) => {
        try{
            res.json(await ConditionService.getCondition(req.params.id));
        }
        catch(err) {
            res.status(500).send({error: err})
        }
    }
}