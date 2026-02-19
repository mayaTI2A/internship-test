document.addEventListener("DOMContentLoaded", function () {

  const wrapper = document.getElementById("produk-list");

  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => buatSectionProduk(data));

  function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function buatSectionProduk(products) {

    const kategoriMap = {
      "men's clothing": "Fashion Pria",
      "women's clothing": "Fashion Wanita",
      "jewelery": "Accessories",
      "electronics": "Electronics"
    };

    for (let key in kategoriMap) {

      const produkKategori = products.filter(p => p.category === key);

      const hargaTermurah = Math.min(...produkKategori.map(p => p.price * 15000));

      let html = `
        <div class="mb-5">

          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="section-title m-0">
              ${kategoriMap[key]}
              <span class="section-subtitle">
                Mulai dari ${formatRupiah(hargaTermurah)}
              </span>
            </h4>

            <a href="#" class="text-success small fw-bold">Lihat Semua</a>
          </div>

          <div class="row g-3">
      `;

      produkKategori.forEach(p => {
        html += `
          <div class="col-6 col-md-4 col-lg-2">
            <div class="card product-card h-100 border-0 shadow-sm">
              <img src="${p.image}" class="card-img-top p-3 product-img">
              <div class="card-body p-2">

                <p class="product-title mb-1">${p.title}</p>

                <p class="product-price mb-1">
                  Rp ${(p.price * 15000).toLocaleString("id-ID")}
                </p>

                <div class="product-meta d-flex align-items-center gap-1 mb-1">
                  <i class="bi bi-geo-alt"></i> Jakarta
                </div>

                <div class="product-rating">
                  ⭐ 4.8 | Terjual 1rb+
                </div>

              </div>

            </div>
          </div>
        `;
      });

      html += `</div></div>`;

      wrapper.innerHTML += html;
    }
  }

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("lang-btn")) {
    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
  }
});

});
