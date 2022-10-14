const orderModel = require("../Models/orderModel.js")


const addDataToDatabase = async (req , res) => {
    const orderDetails = req.body;

    //console.log(orderDetails)
    // const uuidv1 = require('uuid/v1');
    // const order_id = uuidv1();

    const makeString = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const d = new orderModel(
        {
            useId: req.body.userId,
            orderId : makeString(9),
            address : req.body.address,
            product : {
                productIdArr : orderDetails["arr"][0],
                priceArr: orderDetails["arr"][2],
                quantity:orderDetails["arr"][1]
                // productId : orderDetails["arr"][0],
                // price: orderDetails["arr"][3],
                // numberOfDays:orderDetails["arr"][2]
            },
            totalprice : req.body.totalPrice
        }
    )
    d.save()

    res.status(200).send(
        {
            message: "Order added",
            success: true
        }
    )


    //console.log(orderDetails["arr"][0])

    // console.log(orderDetails["arr"][1])
    // console.log(orderDetails["arr"][0])
    // console.log(orderDetails["arr"][2])
    // console.log(orderDetails["address"])
    // console.log(orderDetails["totalPrice"])
}

module.exports = {
    addDataToDatabase
};