// Api connection and interaction


function myOnLoad(){

	// Cargar Producto
	var request = new XMLHttpRequest();
	request.open("GET","https://private-70cb45-aobara.apiary-mock.com/product/list",true);
	request.send();

	request.onload = function () {
			var data = JSON.parse(this.response);

		data.forEach(function(list,index) {
			if(index==0){ 
				var selected = "selected"; 

				var price = "$"+convertPrice(list.unitPriceInCents);
				showPrice(price);
				var productId = list.id;

				sessionStorage.setItem("productId", productId);		
				document.getElementById('product-quantity').value = list.minQuantity;

				unitMeasure(list.minQuantity);
			}
				else { 
					selected = "";
				}

			document.getElementById("product-detail").innerHTML += "<option value='"+list.id+","+list.minQuantity+","+convertPrice(list.unitPriceInCents)+"'"+selected+">"+list.description+"</option>";
		});


	}
	if(sessionStorage.getItem("productId") != ''){
		productImage(sessionStorage.getItem("productId"));
	}
	else {
		setTimeout(function(){
			productImage();
		}, 1500); 
	}
	

	// Cargar Listado
	var request = new XMLHttpRequest();
	request.open("GET","https://private-70cb45-aobara.apiary-mock.com/product/list",true);
	request.send();

	request.onload = function () {
			var data = JSON.parse(this.response);

		data.forEach(function(list,index) {
			document.getElementById("product-detail").innerHTML += "<option value='"+list.id+"'>"+list.description+"</option>";
		});

	}


	// Productos Relacionados
	request.open("GET","https://private-70cb45-aobara.apiary-mock.com/related-product/list",true);
	request.send();

	request.onload = function () {
			var data = JSON.parse(this.response);

		data.forEach(function(list,index) {
			document.getElementById("related-products").innerHTML += "<div class='col-md-4'><div class='related-inner'><a href='#''><img src='"+list.pictureUrl+"'></a><div class='related-block'><h5>"+list.title+"</h5><p class='product-price'>desde $"+convertPrice(list.fromPrice)+"</p><p class='description'>"+list.description+"</p><button>Contratar</button></div></div></div>";

		});

	}

}


function productImage(productId) {

	if(productId === null){
		productId = obtainData(3);
	}

	// Imágenes de productos
	var request = new XMLHttpRequest();
	var url = "https://private-70cb45-aobara.apiary-mock.com/product/"+productId+"/photos";
	request.open("GET",url,true);
	request.send();

	request.onload = function () {
		var data = JSON.parse(this.response);
	
		data.forEach(function(list,index) {
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

function showPrice(price,quantity) {
	document.getElementById('product-price').innerHTML = "";

	unitMeasure(quantity);

	var theDiv = document.getElementById("product-price");
	var content = document.createTextNode(price);
	theDiv.appendChild(content);
}

function reloadPrice(selectObject) {

	document.getElementById("product-thumbs").innerHTML = "";
	productImage(obtainData(3));

	var quantity = document.getElementById('product-quantity').value;
	if(quantity <= 0 || quantity < obtainData(2)){
		quantity = obtainData(2);
	}

	showPrice("$"+calcPrice(obtainData(1),quantity));
	document.getElementById('product-quantity').value = quantity;
}

function reloadQuantityPrice(selectObject) {
	showPrice("$"+calcPrice(obtainData(1),selectObject.value),selectObject.value);
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

	showPrice("$"+calcPrice(obtainData(1),quantity),quantity);
	document.getElementById('product-quantity').value = quantity;
}

function obtainData(selection) {
	var e = document.getElementById("product-detail");
	var info = e.options[e.selectedIndex].value;
	var array = info.split(",");

	if(selection == 1){
		// Price
		return array[2];
	}
	if(selection == 2){
		// Quantity
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

function unitMeasure(quantity) {
	if(quantity == 1){
		document.getElementById("product-unit").innerHTML = "unidad";
	}
	else {
		document.getElementById("product-unit").innerHTML = "unidades";
	}
}
