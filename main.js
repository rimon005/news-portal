const newCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  console.log(categories);
  const allCategories = document.getElementById("all-Categories");
  categories.forEach((category) => {
    console.log(category);
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <div class="fs-5 fw-semibold ms-2">${category.category_name}</div>
    `;
    allCategories.appendChild(categoryDiv);
  });
};

newCategory();
