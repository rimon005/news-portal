const newCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    // .then((data) => console.log(data.data.news_category));
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  // console.log(categories);
  const allCategories = document.getElementById("all-Categories");
  categories.forEach((category) => {
    // console.log(category.category_id);
    const categoryUl = document.createElement("ul");
    categoryUl.innerHTML = `
        <li class="list-unstyled">
            <a class="text-decoration-none fs-5 fw-bolder" onclick="allNews('${category.category_id}')" >${category.category_name}</a>
        </li>
    `;
    allCategories.appendChild(categoryUl);
  });
};
newCategory();

const allNews = (newsCategory) => {
  const newsUrl = `https://openapi.programming-hero.com/api/news/category/${newsCategory}`;
  // fetch(`https://openapi.programming-hero.com/api/news/category/08`);
  // console.log(newsUrl);
  fetch(newsUrl)
    .then((res) => res.json())
    .then((data) => dispalyNews(data.data));
};

const dispalyNews = (allNews) => {
  // console.log(allNews);
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  allNews.forEach((news) => {
    // console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-3">
        <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
      </div>
      <div class="col-md-9 mt-3">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text details">${news.details}</p>
          <div class="d-flex justify-content-between">
            <div class="row g-0">
              <div class="col-md-2 mt-4">
                  <img src="${news.author.img}"  class="img-fluid rounded-circle " alt="..." width="56" height="56">
              </div>
              <div class="col-md-10">
                  <div class="card-body">
                      <h5 class="card-title">${news.author.name}</h5>
                      <p class="card-text">${news.author.published_date}</p>
                  </div>
              </div>
          </div>
          <div class="mt-5"><i class="fa fa-light fa-eye"></i>  ${news.total_view}</div>
          <div class="mt-5">
          <i class="fa fa-light fa-star"></i>
          <i class="fa fa-light fa-star"></i>
          <i class="fa fa-light fa-star"></i>
          <i class="fa fa-light fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          </div>
          <div  class="mt-5"> <i class="fa-sharp fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" onclick="loadNewsDetails('${news._id}')" ></i></div>
          
          </div>
        </div>
      </div>
    </div>
</div>
    `;
    newsContainer.appendChild(newsDiv);
  });
};

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  allNews(searchText);
  searchField.value = "";
};

allNews("01");

const loadNewsDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data[0]);
};
const displayNewsDetails = (news) => {
  console.log(news);
  const modalTitle = document.getElementById("newsDetailsModalLabel");
  modalTitle.innerText = news.title;
  const newsDetails = document.getElementById("news-details");
  newsDetails.innerHTML = `
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-12">
        <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100 h-100" alt="...">
      </div>
      <div class="col-md-9 mt-3">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.details}</p>
          <div class="d-flex justify-content-between">
            <div class="row g-0">
              <div class="col-md-2 mt-4">
                  <img src="${news.author.img}"  class="img-fluid rounded-circle " alt="..." width="56" height="56">
              </div>
              <div class="col-md-10">
                  <div class="card-body">
                      <h5 class="card-title">${news.author.name}</h5>
                      <p class="card-text">${news.author.published_date}</p>
                  </div>
              </div>
          
          </div>
        </div>
      </div>
    </div>
</div>
  
  `;
};
