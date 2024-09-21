let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

//بتحسب اجالي السعر
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = "" + result;
    total.style.background = "#040";
    t;
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

//create product
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clerData();
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  shwoData();
};

function clerData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

function shwoData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `   
         <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
  let benDelete = document.getElementById("deleteall");
  if (dataPro.length > 0) {
    benDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
        `;
  } else {
    benDelete.innerHTML = "";
  }
}
shwoData();

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  shwoData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  shwoData();
}

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  mood = "Update";
  tmp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitel") {
    searchMood = "titel";
    search.placeholder ='Search By Title'
  } else {
    searchMood = "Category";
    search.placeholder ='Search By Category'
  }
  search.focus();
}


function searchData(value) {

    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                table += `
                <tr>
                    <td>${i +1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}



