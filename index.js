let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood ='create';
let tmp;

// get total
function getTotal()
{
	if (price.value !='') {
		let result =(+price.value + +taxes.value + +ads.value) - +discount.value;
		total.innerHTML = result;
		total.style.background='#040';
	} else {
		total.innerHTML = '';
		total.style.background ='#a00d02';
	}
}

// create product


let datapro;
if (localStorage.product !=null) {
	datapro=JSON.parse(localStorage.product);
} else {
	datapro = [];
}

submit.onclick = function() {
	let newPro ={
		title:title.value.toLowerCase(),
		price:price.value,
		taxes:taxes.value,
		ads:ads.value,
		discount:discount.value,
		total:total.innerHTML,
		count:count.value,
		category:category.value.toLowerCase(),

	}


	if (mood =='create') {
		if (newPro.count>1) {
			for (let i =0; i<newPro.count;i++) {
				datapro.push(newPro);
			}
		} else {
			datapro.push(newPro);
		}
	} else {
		datapro[tmp]=newPro;
		mode='create';
		submit.innerHTML='Create';
		count.style.display='block';
	}

	//save localStorage
	localStorage.setItem('product',JSON.stringify(datapro));
	cleardata()
	showData()


}


//clear inputs
function cleardata()
{
	title.value ='';
	price.value ='';
	taxes.value ='';
	ads.value ='';
	discount.value ='';
	total.innerHTML ='';
	count.value ='';
	category.value ='';
}




//read

function showData()
{
	getTotal()
	let table='';
	for (let i=0;i<datapro.length;i++) {
		table +=`
		<tr>
			<td>${i}</td>
			<td>${datapro[i].title}</td>
			<td>${datapro[i].price}</td>
			<td>${datapro[i].taxes}</td>
			<td>${datapro[i].ads}</td>
			<td>${datapro[i].discount}</td>
			<td>${datapro[i].total}</td>
			<td>${datapro[i].category}</td>
			<td><button onclick='updateData(${i})' id="update">Update</button></td>
			<td><button onclick='deletedata(${i})' id="delete">Delete</button></td>
		</tr>`
	}
	document.getElementById('tbody').innerHTML = table;

	let btndelete=document.getElementById('deleteAll')
	if (datapro.length > 0) {
		btndelete.innerHTML=`
		<button onclick='deleteall()'>Delete All (${datapro.length})</botton>
		`
	} else {
		btndelete.innerHTML='';
	}
}
showData()


//delete

function deletedata(i)
{
	datapro.splice(i,1);
	localStorage.product = JSON.stringify(datapro)
	showData()
}

//clear data

function deleteall()
{
	localStorage.clear()
	datapro.splice(0)
	showData()
}


//update

function updateData(i)
{
	title.value=datapro[i].title;
	price.value=datapro[i].price;
	taxes.value=datapro[i].taxes;
	ads.value=datapro[i].ads;
	discount.value=datapro[i].discount;
	getTotal()
	count.style.display='none';
	category.value=datapro[i].category;
	submit.innerHTML='Update';
	mood='update';
	tmp=i;
	scroll({
		top:0,
		behavior:'smooth',
	})
}

//search

let searchmode='title';

function getSearchMode(id)
{
	let search = document.getElementById('search');
	if (id=='searchTitle') {
		searchmode='title';
		search.placeholder='Search By Title';
	} else {
		searchmode='category';
		search.placeholder='Search By Category';
	}
	search.focus()
	search.value='';
	showData()
}

function searchdata(value)
{
	let table='';
	if (searchmode=='title') {
		for (let i=0;i<datapro.length;i++) {
			if (datapro[i].title.includes(value.toLowerCase())) {
				table +=`
					<tr>
						<td>${i}</td>
						<td>${datapro[i].title}</td>
						<td>${datapro[i].price}</td>
						<td>${datapro[i].taxes}</td>
						<td>${datapro[i].ads}</td>
						<td>${datapro[i].discount}</td>
						<td>${datapro[i].total}</td>
						<td>${datapro[i].category}</td>
						<td><button onclick='updateData(${i})' id="update">Update</button></td>
						<td><button onclick='deletedata(${i})' id="delete">Delete</button></td>
					</tr>`
			}
		}
	} else {
		for (let i=0;i<datapro.length;i++) {
			if (datapro[i].category.includes(value.toLowerCase())) {
				table +=`
					<tr>
						<td>${i}</td>
						<td>${datapro[i].title}</td>
						<td>${datapro[i].price}</td>
						<td>${datapro[i].taxes}</td>
						<td>${datapro[i].ads}</td>
						<td>${datapro[i].discount}</td>
						<td>${datapro[i].total}</td>
						<td>${datapro[i].category}</td>
						<td><button onclick='updateData(${i})' id="update">Update</button></td>
						<td><button onclick='deletedata(${i})' id="delete">Delete</button></td>
					</tr>`
			}
		}
	}
	document.getElementById('tbody').innerHTML = table;
}
