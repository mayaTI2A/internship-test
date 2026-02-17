const productList = document.getElementById("product-list");

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    tampilkanProduk(data);
  });

function tampilkanProduk(products) {
  let html = "";

  products.forEach(product => {
    html += `
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" class="card-img-top p-3" alt="produk">
          <div class="card-body">
            <h6 class="card-title">${product.title}</h6>
            <p class="card-text text-success fw-bold">$${product.price}</p>
          </div>
        </div>
      </div>
    `;
  });

  productList.innerHTML = html;
}
