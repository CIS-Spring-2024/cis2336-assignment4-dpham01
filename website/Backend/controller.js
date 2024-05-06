const ordersFilePath = './orders.json'; // Path to your JSON file
import fs from 'fs'

function saveOrder(orders) {

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (writeErr) => {
        if (writeErr) {
            console.error('Error writing to file:', writeErr);
        }
    });

}

export const processOrder = async (req, res) => {
    const { location, breakfastBurrito, breakfastSandwich, friedChickenWaffles, friedChickenSandwich, chickenCaesarSalad, cheeseburger, chickenRiceBowl, tofuRiceBowl, steakRiceBowl } = req.body;

    // Calculate total cost
    const total = (parseInt(breakfastBurrito) * 7) +
                   (parseInt(breakfastSandwich) * 6) +
                   (parseInt(friedChickenWaffles) * 10) +
                   (parseInt(friedChickenSandwich) * 8) +
                   (parseInt(chickenCaesarSalad) * 9) +
                   (parseInt(cheeseburger) * 7) +
                   (parseInt(chickenRiceBowl) * 13) +
                   (parseInt(tofuRiceBowl) * 10) +
                   (parseInt(steakRiceBowl) * 15);

    if (total <= 0) {
        res.status(400).json({ message: "Your order was not processed due to an empty cart." });
    } else {
        let orderNum = 0;
        fs.readFile(ordersFilePath, (err, data) => {
            let orders = [];
            if (!err && data.length > 0) {
                try {
                    orders = JSON.parse(data.toString()); 
                    if (!Array.isArray(orders)) { 
                        orders = []; 
                    }
                } catch (parseErr) {
                    console.error('Error parsing JSON from file:', parseErr);
                    orders = [];
                }
            }
            
            orderNum = orders.length + 1

            const orderDetails = {
                orderNumber: orderNum, 
                total: total,
                location: location
            };

            orders.push(orderDetails);
            
            saveOrder(orders); 

            const confirmationMessage = 'Your order is being processed.';
            res.status(200).json({ message: confirmationMessage, orderNumber: orderNum });
        });
    }
}

export const returnOrder = async (req, res) => {

    const orderNumber = parseInt(req.params.orderNumber);

    fs.readFile(ordersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Failed to read orders file." });
        }

        let orders;
        try {
            orders = JSON.parse(data.toString());
        } catch (parseErr) {
            return res.status(500).json({ message: "Error parsing orders file." });
        }

        const order = orders.find(o => o.orderNumber === orderNumber);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found." });
        }
    });
}