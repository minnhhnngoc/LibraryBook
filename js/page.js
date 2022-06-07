const value = document.querySelector("#value");
const btn = document.querySelectorAll(".add-cart");
const total = document.querySelector("#in-total");
var sum = 0;
var carts = new Array()
btn.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
        var btnItem = event.target;
        var infItem = btnItem.parentElement;
        var imgItem = infItem.querySelector("img").src;
        var titleItem = infItem.querySelector(".title-book").innerText;
        var priceItem = infItem.querySelector(".price-sale").innerText;
        var amountItem = 1;
        var item = new Array(imgItem, titleItem, priceItem, amountItem);
        var kt = 0;
        for (i = 0; i < carts.length; i++) {
            if (carts[i][1] === titleItem) {
                kt = 1;
                amountItem += parseInt(carts[i][3]);
                carts[i][3] = amountItem;
                break;
            }
        }
        if (kt == 0) {
            carts.push(item);
        }
        countItem();
        sessionStorage.setItem("carts", JSON.stringify(carts));
    })
})
function countItem() {
    document.getElementById("value").innerHTML = carts.length;
}


function showCart() {
    var gh = sessionStorage.getItem("carts");
    var carts = JSON.parse(gh);
    var ttgh = "";
    for (let i = 0; i < carts.length; i++) {
        sum += parseInt(carts[i][2]) * parseInt(carts[i][3]);
        ttgh += '<tr>' +
            '<td><img src="' + carts[i][0] + '" alt=""></td>' +
            '<td>' + carts[i][1] + '</td>' +
            '<td>' + carts[i][2] + '</td>' +
            '<td>' + carts[i][3] + '</td>' +
            '<td><button style="cursor: pointer;" onclick="deleteItem(this)">Xoá</button></td>' +
            '</tr>';
    }
    total.textContent = new Intl.NumberFormat().format(sum * 1000);
    document.getElementById("mycart").innerHTML = ttgh;
}
function deleteItem(x) {
    var tr = x.parentElement.parentElement;
    var nameBook = tr.children[1].innerText;
    var price = tr.children[2].innerText;
    var amount = tr.children[3].innerText;
    var sum1 = (parseInt(price) * parseInt(amount));
    sum -= sum1;
    total.textContent = new Intl.NumberFormat().format((sum * 1000));
    console.log(price);
    console.log(amount);
    console.log(sum);
    tr.remove();
    for (i = 0; i < carts.length; i++) {
        if (carts[i][1] == nameBook) {
            carts.splice(i, 1);
        }
    }
}