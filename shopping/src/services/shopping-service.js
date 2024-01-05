const { v4: uuidv4 } = require('uuid');
const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");
const { OrderModel } = require("../database/models/index")

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async GetCart({ _id }){

    try {
      const cartItems = await this.repository.Cart(_id);

      return FormateData(cartItems);
    } catch(err) {
      throw err
    }
  }

  async PlaceOrder(userInput) {

    try {
      const { _id, txnNumber } = userInput;
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);

      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrders(customerId) {

    try {
      const orders = await this.repository.Orders(customerId);

      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrderDetails({ _id,orderId }){

    try {
      const orders = await this.repository.Orders(productId);
      
      return FormateData(orders)
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetOrderPayload(customerId, {txnId}, event) {
    let amount = 0; 
    const orderId = uuidv4();

    const order = new OrderModel({
      orderId,
      customerId,
      amount,
      txnId,
      status: 'received'
    })

    console.log(order);

    if(order) {
        const payload = {
            event: event,
            data: { userId: customerId, order: order }
        }
        return FormateData(payload)
    } else{
        return FormateData({error: 'No product available'})
    }
  }
}

module.exports = ShoppingService;
