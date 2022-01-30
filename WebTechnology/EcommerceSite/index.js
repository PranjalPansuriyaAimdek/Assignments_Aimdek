
//make cardGrandTotal Display None
document.getElementById('cardGrandTotal').style.display = "none";


//declare arrays and other variables
let arrProducts = [];
let arrCart = [];

var imageURL;

//function for loadImage
function loadImage(e) {
    imageURL = URL.createObjectURL(e.target.files[0]);
}


//AddtoCartBtnclicked
function btnRemoveFromCartClicked(id, quantity, idInInventory) {

    swal({
        title: "Are you sure want to remove your product?",
        icon: "warning",
        buttons: true,

    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Your product is removed from cart", { icon: "success" });
                //quantity update in inventory and load inventory
                arrProducts[idInInventory].productQuantity = arrProducts[idInInventory].productQuantity + quantity;
                loadInventory();

                //remove product from cart and load cart
                arrCart.splice(id, 1);
                loadCart();
            }

        });



}

//updateInventory
function updateInventory(id, quantity) {
    arrProducts[id].productQuantity = arrProducts[id].productQuantity - quantity;
    loadInventory();
}

//load Cart 
function loadCart() {
    var list = document.getElementById('ulCart');
    list.innerHTML = "";

    var grandTotal = 0;

    if (arrCart.length != 0) {
        for (var i = 0; i < arrCart.length; i++) {
            const liItem = document.createElement("li")
            liItem.classList.add("list-group-item")
            document.getElementById('ulCart').appendChild(liItem);
            var content = ' <div class="row"><div class="col-3"><img src="' +
                arrCart[i].productImage
                + '" class="imgCart rounded float-left" > </div><div class="col"><div class="row"><div class="font-weight-bold" id="lblProductNameCart"> Product :</div><div class="col" id="valProductNameCart">' +
                arrCart[i].productName +
                '</div> </div><div class="row"><div class="font-weight-bold" id="lblProductPriceCart"> Price :</div><div class="col" id="valProductPriceCart">' +
                arrCart[i].productPrice +
                '</div><div class="font-weight-bold" id="lblProductQuantityCart">Quantity : </div><div class="col" id="valProductQuantityCart">' +
                arrCart[i].productQuantity +
                '</div></div><hr> <div class="row"><div class="font-weight-bold" id="lblProductTotalCart">Total :</div><div class="col" id="valProductTotalCart">' +
                arrCart[i].productQuantity * arrCart[i].productPrice +
                '</div><div cass="col"><button class=" btn btn-danger btn-sm mr-5"id="btnRemoveFromCart" onclick="btnRemoveFromCartClicked(' + i + ',' + arrCart[i].productQuantity + ',' + arrCart[i].idInInventory + ')">Remove<i class="fas fa-trash ml-2"></i></button></div> </div></div></div>'
            liItem.innerHTML = content;

            //update grandTotal and display it 
            grandTotal = grandTotal + arrCart[i].productQuantity * arrCart[i].productPrice;

            document.getElementById('valGrandTotal').innerHTML = grandTotal;
            document.getElementById('cardGrandTotal').style.display = "block";
        }

    }
    else {
        document.getElementById('valGrandTotal').innerHTML = 0;
        document.getElementById('cardGrandTotal').style.display = "none";
    }
}


// load Inventory
function loadInventory() {

    var list = document.getElementById('ulInventory');
    list.innerHTML = "";


    for (var i = 0; i < arrProducts.length; i++) {
        const liItem = document.createElement("li")
        liItem.classList.add("list-group-item")
        document.getElementById('ulInventory').appendChild(liItem);
        var content = '<div class="row"><div class="col-md-3 productImageInventory"><img src="' +
            arrProducts[i].productImage
            + '"class="imgInventory rounded float-left"alt="shirt"> </div><div class="col"><div class="row"><div class="font-weight-bold" id="lblProductNameInventory"> Product :' +

            '</div><div class="col"> <div id="valProductNameInventory">' +
            arrProducts[i].productName +
            '</div></div> </div><div class="row"><div class="font-weight-bold" id="lblProductDescrptionInventory"> Description : ' +

            '</div><div class="col"> <div id="valProductDescrptionInventory small">' +
            arrProducts[i].productDescription +
            '</div></div></div></div><div class="col"><div class="row"><div class="font-weight-bold" id="lblQuantityInventory"> AvailableQuantity : ' +

            '</div><div class="col"><div id="valQuantityInventory ">' +
            arrProducts[i].productQuantity +
            '</div></div></div><div class="row"><div class="font-weight-bold" id="lblPriceInventory"> Price : ' +

            '</div><div class="col"><div id="valPriceInventory  ">' +
            arrProducts[i].productPrice +
            '</div></div></div><br><div class="row"><div class="col-md-6"><button class=" btn btn-submit btn-block btn-sm" id="btnAddToCart" onclick="AddtoCartBtnclicked(' + arrProducts[i].id + ')">Add to Cart</button></div>' +
            '<div class="col-md-6"><button class=" btn btn-danger btn-block btn-sm" id="btnDeleteFromInventory" onclick="btnDeleteFromInventoryClicked(' + arrProducts[i].id + ')">Remove </button></div>' +
            '</div></div></div>'
        liItem.innerHTML = content;
    }


}



document.getElementById("btnAddToInventory").addEventListener('click', function () {

    var flag = 0;
    if (document.getElementById('valProductNameAdd').value.trim() == "") {
        flag = 1;
    }
    if (document.getElementById('valProductImageAdd').value.trim() == "") {
        flag = 1;
    }
    if (document.getElementById('valProductDescriptionAdd').value.trim() == "") {
        flag = 1;
    }
    if (document.getElementById('valProductQuantityAdd').value.trim() == "" || parseInt(document.getElementById('valProductQuantityAdd').value) <= 0) {
        flag = 1;
    }
    if (document.getElementById('valProductPriceAdd').value.trim() == "" || parseInt(document.getElementById('valProductPriceAdd').value) <= 0) {
        flag = 1;
    }
    if (flag == 0) {
        let product = {
            id: arrProducts.length,
            productName: document.getElementById('valProductNameAdd').value,
            productImage: imageURL,
            productDescription: document.getElementById('valProductDescriptionAdd').value,
            productQuantity: document.getElementById('valProductQuantityAdd').value,
            productPrice: document.getElementById('valProductPriceAdd').value,
        }
        arrProducts.push(product);

        loadInventory();

        document.getElementById('valProductNameAdd').value = "";
        document.getElementById('valProductImageAdd').value = null;
        document.getElementById('valProductDescriptionAdd').value = "";
        document.getElementById('valProductQuantityAdd').value = "";
        document.getElementById('valProductPriceAdd').value = "";
    }
    else {
        alert("Enter Data Properly.")
    }

})

//AddtoCartBtnclicked 
function AddtoCartBtnclicked(id) {

    //get and validate the quantity use want to buy
    var v = parseInt(prompt("Quantity : ", 0));

    if (v) {
        //if quantity is not appropriate then alert to user
        if (v > arrProducts[id].productQuantity) {
            alert("Not enough quantity availabe.")
        }

        else if (v <= 0) {
            alert("Please Add more Quantity")
        }

        //if quantity is appropriate then add it to cart
        else {

            let productForCart = {
                idInCart: arrCart.length,
                idInInventory: id,
                productName: arrProducts[id].productName,
                productImage: arrProducts[id].productImage,
                productQuantity: v,
                productPrice: arrProducts[id].productPrice,
            }

            arrCart.push(productForCart)
            loadCart();

            //Decrease quantity from inventory
            updateInventory(id, arrCart[arrCart.length - 1].productQuantity);
        }
    }
}


//btnDeleteFromInventoryClicked
function btnDeleteFromInventoryClicked(id) {
    swal({
        title: "Are you sure want to remove your product?",
        icon: "warning",
        buttons: true,

    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Your product is removed from Inventory", { icon: "success" });
                arrProducts.shift(id, 1);
                loadInventory();
            }

        });

}

//btnPlaceOrderClicked
function btnPlaceOrderClicked() {
    swal({ title: "Thank You For Shopping.", text: "Your order is placed", icon: "success" });
}