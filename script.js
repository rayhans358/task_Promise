// Masukkan API
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=0f7b330cb3e047c0b412d11043ea08c3`;


// Create fetch
fetch(apiUrl)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Network response was not ok');
  })
  .then(data => {
    const newsArticles = data.articles;
    const newsCont = document.querySelector('.newsCont');

    // Masukkan ke dalam HTML
    function renderArticles(articles) {
      newsCont.innerHTML = '';
      articles.forEach(article => {
        const createdDate = new Date(article.publishedAt);
        const changetoString = `${createdDate.getDate()}/${createdDate.getMonth()+1}/${createdDate.getFullYear()}`

        const articleMarkup = `
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src="${article.urlToImage}" alt="${article.title}">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p style="color: #909090;">${article.source.name}, ${article.author} - ${changetoString}</p>
                
                <p class="card-text">${article.description}</p>
                <a href="${article.url}" target="_blank" class="btn btn-primary" rel="noopener noreferrer">Read more...</a>
              </div>
            </div>
          </div>
        `;
        newsCont.insertAdjacentHTML('beforeend', articleMarkup);
      });
    }

    renderArticles(newsArticles);

    const searchInput = document.querySelector('.searchNews');
    searchInput.addEventListener('keyup', inputKeyword => {
      const searchTerm = inputKeyword.target.value.toLowerCase();
      const filteredArticles = newsArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm)
      );
      renderArticles(filteredArticles);
    });
  })
  .catch(err => {
    console.err('Error fetching news:', err);
  });
