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

const toggleSpinner = (isLoading) => {
  const loadingSection = document.getElementById("spinners");
  if (isLoading) {
    loadingSection.classList.remove("d-none");
  } else {
    loadingSection.classList.add("d-none");
  }
};

const allNews = (newsCategory) => {
  toggleSpinner(true);
  const newsUrl = `https://openapi.programming-hero.com/api/news/category/${newsCategory}`;
  // fetch(`https://openapi.programming-hero.com/api/news/category/08`);
  // console.log(newsUrl);
  fetch(newsUrl)
    .then((res) => res.json())
    .then((data) => dispalyNews(data.data));
};

const dispalyNews = (allNews) => {
  console.log(allNews);
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  const searchTotal = document.getElementById("toral-search-field");
  searchTotal.innerHTML = `
  <h4 class="border border-info p-2 w-50">${allNews.length} items found for category</h4>
   `;

  const noNewsFound = document.getElementById("no-news-message");
  if (allNews.length === 0) {
    noNewsFound.classList.remove("d-none");
  } else {
    noNewsFound.classList.add("d-none");
  }
  allNews.forEach((news) => {
    // console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-3">
        <img src="${
          news.thumbnail_url
        }" class="img-fluid rounded-start w-100" alt="...">
      </div>
      <div class="col-md-9 mt-3">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text details">${news.details}</p>
          <div class="d-flex justify-content-between">
            <div class="row g-0">
              <div class="col-md-2 mt-4">
                  <img src="${
                    news.author.img
                  }"  class="img-fluid rounded-circle " alt="..." width="56" height="56">
              </div>
              <div class="col-md-10">
                  <div class="card-body">
                      <h5 class="card-title">${
                        news.author.name
                          ? news.author.name
                          : "No author name found"
                      }</h5>
                      <p class="card-text">${
                        news.author.published_date
                          ? news.author.published_date
                          : " No publsihed date found"
                      }</p>
                  </div>
              </div>
          </div>
          <div class="mt-5"><i class="fa fa-light fa-eye"></i>  ${
            news.total_view ? news.total_view : "No one has been the post yet"
          }</div>
          <div class="mt-5">
          <i class="fa fa-light fa-star"></i>
          <i class="fa fa-light fa-star"></i>
          <i class="fa fa-light fa-star"></i>
          <i class="fa fa-light fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
          </div>
          <div  class="mt-5"> <i class="fa-sharp fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" onclick="loadNewsDetails('${
            news._id
          }')" ></i></div>
          
          </div>
        </div>
      </div>
    </div>
</div>
    `;
    newsContainer.appendChild(newsDiv);
  });
  toggleSpinner(false);
};

allNews("08");

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
        <img src="${
          news.thumbnail_url
        }" class="img-fluid rounded-start w-100 h-100" alt="...">
      </div>
      <div class="col-md-9 mt-3">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.details}</p>
          <div class="d-flex justify-content-between">
            <div class="row g-0">
              <div class="col-md-2 mt-4">
                  <img src="${
                    news.author.img
                  }"  class="img-fluid rounded-circle " alt="..." width="56" height="56">
              </div>
              <div class="col-md-10">
                  <div class="card-body">
                      <h5 class="card-title">${
                        news.author.name
                          ? news.author.name
                          : "No author name found"
                      }</h5>
                      <p class="card-text">${
                        news.author.published_date
                          ? news.author.published_date
                          : " No publsihed date found"
                      }</p>
                  </div>
              </div>
              <div class="mt-5"><i class="fa fa-light fa-eye"></i>  ${
                news.total_view
                  ? news.total_view
                  : "No one has been the post yet"
              }</div>

          </div>
        </div>
      </div>
    </div>
</div>
  
  `;
};
