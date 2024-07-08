const apiUrl =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
const tabs = document.querySelectorAll(".tab-button");
const productContainer = document.getElementById("product-container");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    displayProducts(tab.getAttribute("data-category"));
  });
});
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts("Men");
  });
function displayProducts(category) {
  productContainer.innerHTML = "";
  products.categories
    .filter((product) => product.category_name === category)
    .forEach((product) => {
      const category = product.category_products;
      category.forEach((singleProduct) => {
        const discount =
          ((singleProduct.compare_at_price - singleProduct.price) /
            singleProduct.compare_at_price) *
          100;
        productContainer.innerHTML += `
          <div class="product-card">
            <div class="badge">${singleProduct.badge_text}</div>
            <img src="${singleProduct.image}" alt="${singleProduct.title}">
            <div class="title">
              <div class="product-title">${singleProduct.title}</div>
              <div class="product-vendor">&nbsp• &nbsp${
                singleProduct.vendor
              }</div>
            </div>
            <div class="price">
              <div class="product-price">Rs ${singleProduct.price}.00</div>
              <div class="product-compare-at-price">${
                singleProduct.compare_at_price
              }.00</div>
              <div class="product-discount">${discount.toFixed(0)}% Off</div>
            </div>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        `;
      });
    });
}
