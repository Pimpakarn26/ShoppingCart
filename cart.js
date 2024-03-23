const cart = {};

// เพิ่มสินค้าเข้าในตะกร้า
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        if (!cart[productId]) {
            cart[productId] = { name: name, quantity: 1, price: price };
        } else {
            cart[productId].quantity++;
        }
        updateCartDisplay();
    });
});

// ลบสินค้าออกจากตะกร้า
function removeFromCart(productId) {
    if (cart[productId]) {
        cart[productId].quantity--;
        if (cart[productId].quantity === 0) {
            delete cart[productId];
        }
        updateCartDisplay();
    }
}

// เพิ่มสินค้าในตะกร้า
function increaseQuantity(productId) {
    if (cart[productId]) {
        cart[productId].quantity++;
        updateCartDisplay();
    }
}

// อัพเดทการแสดงผลตะกร้า
function updateCartDisplay() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    let totalPrice = 0;
    for (const productId in cart) {
        const item = cart[productId];
        const itemTotalPrice = item.quantity * item.price;
        totalPrice += itemTotalPrice;
        const productElement = document.createElement('div');
        const productNameElement = document.createElement('p');
        productNameElement.textContent = `Product: ${item.name}, Price: ฿${item.price}, Quantity: ${item.quantity}, Total: ฿${itemTotalPrice}`;
        productElement.appendChild(productNameElement);

        // เพิ่มปุ่มบวกสินค้า
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
            increaseQuantity(productId);
        });
        productElement.appendChild(addButton);

        // เพิ่มปุ่มลบสินค้า
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => {
            removeFromCart(productId);
        });
        productElement.appendChild(removeButton);

        cartElement.appendChild(productElement);
    }

    // เพิ่มปุ่ม "Save Receipt" เข้าไปในตะกร้า
    const saveReceiptButton = document.createElement('button');
    saveReceiptButton.textContent = 'Save Receipt';
    saveReceiptButton.addEventListener('click', () => {
        printReceipt();
    });
    cartElement.appendChild(saveReceiptButton);

    if (Object.keys(cart).length === 0) {
        cartElement.innerHTML = '<p>No items in cart.</p>';
    } else {
        const totalPriceElement = document.createElement('p');
        totalPriceElement.textContent = `Total Price: ฿${totalPrice}`;
        cartElement.appendChild(totalPriceElement);
    }
}

function getCustomerInfo() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    return { name, phone };
}


function printReceipt() {
    // สร้างฟอร์มรับข้อมูลชื่อและเบอร์โทร
    const name = prompt("Please enter your name:");
    const phoneNumber = prompt("Please enter your phone number:");

    // สร้าง HTML สำหรับใบเสร็จ
    let receiptContent = `
        <html>
            <head>
                <title>Receipt</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h1 {
                        text-align: center;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Receipt for ${name}</h1> <!-- แสดงชื่อลูกค้า -->
                <h2>Phone Number: ${phoneNumber}</h2> <!-- แสดงเบอร์โทรลูกค้า -->
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    let totalPrice = 0;
    for (const productId in cart) {
        const item = cart[productId];
        const itemTotalPrice = item.quantity * item.price;
        totalPrice += itemTotalPrice;
        receiptContent += `
            <tr>
                <td>${item.name}</td>
                <td>฿${item.price}</td>
                <td>${item.quantity}</td>
                <td>฿${itemTotalPrice}</td>
            </tr>
        `;
    }

    receiptContent += `
                    </tbody>
                </table>
                <p>Total Price: ฿${totalPrice}</p>
            </body>
        </html>
    `;

    // เปิดหน้าต่างใหม่เพื่อแสดงใบเสร็จ
    const printWindow = window.open("", "_blank");
    printWindow.document.write(receiptContent);
    printWindow.print(); // เรียกใช้งานการพิมพ์
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('menu-search-input');
    const searchButton = document.getElementById('menu-search-button');
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(function(product) {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});
