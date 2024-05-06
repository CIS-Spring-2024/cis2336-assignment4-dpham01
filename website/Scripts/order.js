let orderNum = 0;

window.addEventListener('load', () => {
    var form = document.getElementById("orderForm");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
});

function getOrderDetails(orderNumber) {
    fetch(`http://localhost:8000/menu/orderDetails/${orderNumber}`)
    .then(response => response.json())
    .then(orderDetails => {
        if(confirm("Please confirm your order details\nOrder #" + orderDetails.orderNumber + "\nOrder Location: " + orderDetails.location + "\nTotal: $" + orderDetails.total)){
            alert("Order number " + orderDetails.orderNumber + " successfully placed");
        }
        else{
            alert("Order Canceled");
        }
    })
    .catch(error => console.error('Error fetching order details:', error));
}

function sendOrderDetails(orderDetails){
    fetch('http://localhost:8000/menu/processOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
    })
    .then(response => response.json())  
    .then(data => {
        if (data.orderNumber) {
            getOrderDetails(data.orderNumber);
        }
        alert(data.message);
    })  
    .catch(error => {
        console.error('Error:', error);
    });
}

async function validateForm() {

    const orderData = {
        location: document.getElementById("location").value,
        breakfastBurrito: document.getElementById("breakfastBurrito").value,
        breakfastSandwich: document.getElementById("breakfastSandwich").value,
        friedChickenWaffles: document.getElementById("friedChickenWaffles").value,
        friedChickenSandwich: document.getElementById("friedChickenSandwich").value,
        chickenCaesarSalad: document.getElementById("chickenCaesarSalad").value,
        cheeseburger: document.getElementById("cheeseburger").value,
        chickenRiceBowl: document.getElementById("chickenRiceBowl").value,
        tofuRiceBowl: document.getElementById("tofuRiceBowl").value,
        steakRiceBowl: document.getElementById("steakRiceBowl").value
    };

    sendOrderDetails(orderData);
}
