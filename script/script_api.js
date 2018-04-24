// Api connection and interaction

function myOnLoad(){

	// Cargar Producto
	var request = new XMLHttpRequest();
	request.open("GET","https://private-70cb45-aobara.apiary-mock.com/product/list",true);
	request.send();

	request.onload = function () {
			var data = JSON.parse(this.response);

		data.forEach((list,index) => {
			
			if(index==0){ 
				var selected = "selected"; 

				var price = "$"+convertPrice(list.unitPriceInCents);
				showPrice(price);
				var productId = list.id;
			}
				else { 
					selected = "";
				}

			document.getElementById("product-detail").innerHTML += "<option value='"+list.id+","+list.minQuantity+","+convertPrice(list.unitPriceInCents)+"'"+selected+">"+list.description+"</option>";
		});

	}
	setTimeout(function(){
		productImage();
	}, 1000); 
	

	// Cargar Listado
	var request = new XMLHttpRequest();
	request.open("GET","https://private-70cb45-aobara.apiary-mock.com/product/list",true);
	request.send();

	request.onload = function () {
			var data = JSON.parse(this.response);

		data.forEach(list => {
			document.getElementById("product-detail").innerHTML += "<option value='"+list.id+"'>"+list.description+"</option>";
		});

	}


	// Productos Relacionados
	request.open("GET","https://private-70cb45-aobara.apiary-mock.com/related-product/list",true);
	request.send();

	request.onload = function () {
			var data = JSON.parse(this.response);

		data.forEach((list,index) => {
			document.getElementById("related-products").innerHTML += "<div class='col-md-4'><div class='related-inner'><a href='#''><img src='"+list.pictureUrl+"'></a><div class='related-block'><h5>"+list.title+"</h5><p class='product-price'>desde $"+convertPrice(list.fromPrice)+"</p><p class='description'>"+list.description+"</p><button>Contratar</button></div></div></div>";

		});

	}

}


function productImage() {

	// Imágenes de productos
	var request = new XMLHttpRequest();
	var url = "https://private-70cb45-aobara.apiary-mock.com/product/"+obtainData(3)+"/photos";
	request.open("GET",url,true);
	request.send();

	request.onload = function () {
		var data = JSON.parse(this.response);
	
		data.forEach((list,index) => {
			if(index==0){ 
				document.getElementById("product-image").innerHTML = "<img src='"+list.url+"'>";				
			}
			document.getElementById("product-thumbs").innerHTML += "<a onclick='changeImage(\""+list.url+"\")'><img src='"+list.url+"'></a>";
		});

	}
}

function changeImage(url) {
	document.getElementById("product-image").innerHTML = "<img src='"+url+"'>";
}

function setSelectValue (id, val) {
    document.getElementById(id).value = val;
}

function convertPrice(price) {
	var new_price = price / 100; 
	return new_price;
}

function showPrice(price) {
	document.getElementById('product-price').innerHTML = "";

	var theDiv = document.getElementById("product-price");
	var content = document.createTextNode(price);
	theDiv.appendChild(content);
}

function reloadPrice(selectObject) {

	document.getElementById("product-thumbs").innerHTML = "";
	productImage(3);

	var quantity = document.getElementById('product-quantity').value;
	if(quantity <= 0 || quantity < obtainData(2)){
		quantity = obtainData(2);
	}

	showPrice("$"+calcPrice(obtainData(1),quantity));
	document.getElementById('product-quantity').value = quantity;
}

function reloadQuantityPrice(selectObject) {
	showPrice("$"+calcPrice(obtainData(1),selectObject.value));
	document.getElementById('product-quantity').value = selectObject.value;
}

function amount(operator) {
	var quantity = document.getElementById('product-quantity').value;

	if(operator == 1){
		quantity--;
		if(quantity <= 0 || quantity < obtainData(2)){
			quantity = obtainData(2);
		}
	}
	else {
		quantity++;
	}
	
	showPrice("$"+calcPrice(obtainData(1),quantity));
	document.getElementById('product-quantity').value = quantity;
}

function obtainData(selection) {
	var e = document.getElementById("product-detail");
	var info = e.options[e.selectedIndex].value;
	var array = info.split(",");

	if(selection == 1){
		// Quantity
		return array[2];
	}
	if(selection == 2){
		// Price
		return array[1];
	}
	if(selection == 3){
		// Product id
		return array[0];
	}
}

function calcPrice(price,quantity) {
	return price * quantity;
}
