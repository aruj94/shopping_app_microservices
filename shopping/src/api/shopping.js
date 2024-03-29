const ShoppingService = require("../services/shopping-service");
const { SubscribeMessages, PublishMessages } = require('../utils/index');
const UserAuth = require('./middlewares/auth');
const { CUSTOMER_BINDING_KEY } = require('../config');

module.exports = (app, channel) => {
    
    const service = new ShoppingService();
    SubscribeMessages(channel, service)

    app.post('/order',UserAuth, async (req,res,next) => {

        const { _id } = req.user;
        const { txnNumber } = req.body;

        try {
            const { data } = await service.PlaceOrder({_id, txnNumber});
            const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER');
            await PublishMessages(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payload));
            //PublishCustomerEvent(payload);
            
            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }
    });

    app.get('/orders',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.GetOrders(_id);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });
    
    app.get('/cart', UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.GetCart({ _id });
            return res.status(200).json(data[0].items);
        } catch (err) {
            next(err);
        }
    });
}