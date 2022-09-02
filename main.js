const newCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  // console.log(categories);
  const allCategories = document.getElementById("all-Categories");
  categories.forEach((category) => {
    // console.log(category);
    // <div class="fs-5 fw-semibold ms-2">${category.category_name}</div>
    const categoryUl = document.createElement("ul");
    categoryUl.innerHTML = `
        <li class="list-unstyled">
            <a class="text-decoration-none fs-5 fw-bolder" href="#">${category.category_name}</a>
        </li>
    `;
    allCategories.appendChild(categoryUl);
  });
};
newCategory();

const allNews = () => {
  const url = `https://openapi.programming-hero.com/api/news/category/01`;
  fetch(url)
    // console.log(url);
    .then((res) => res.json())
    // .then((data) => console.log(data.data[0]));
    .then((data) => dispalyNews(data.data));
};

const dispalyNews = (allNews) => {
  // console.log(allNews);
  const newsContainer = document.getElementById("news-container");
  allNews.forEach((news) => {
    console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>

    `;
    newsContainer.appendChild(newsDiv);
  });
};
allNews();
