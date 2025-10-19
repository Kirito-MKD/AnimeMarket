const searchCSS = `
.search-results-container {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(145deg, #ffffff 0%, #fff5f7 100%);
    border: 2px solid #ffd1dc;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(255, 182, 193, 0.4);
    margin-top: 10px;
    padding: 20px;
    z-index: 1000;
    backdrop-filter: blur(10px);
    min-width: 450px;
    max-width: 600px;
    width: 90vw;
}

.search-results-grid {
    display: grid;
    gap: 15px;
}

.search-result-card {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ffd1dc;
    border-radius: 15px;
    padding: 18px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.search-result-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 182, 193, 0.1), transparent);
    transition: left 0.5s ease;
}

.search-result-card:hover::before {
    left: 100%;
}

.search-result-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
    border-color: #ff9eb3;
}

/* Product Card Styles */
.product-card-search {
    border-left: 4px solid #ff6b93;
}

.product-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    gap: 12px;
}

.product-name {
    color: #8a2d52;
    font-weight: 700;
    font-size: 1.1rem;
    margin: 0;
    flex: 1;
    line-height: 1.3;
    word-wrap: break-word;
    min-width: 0;
}

.product-price {
    background: linear-gradient(135deg, #ff6b93 0%, #ff85a1 100%);
    color: white;
    padding: 6px 14px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.95rem;
    white-space: nowrap;
    flex-shrink: 0;
}

.product-description {
    color: #6b4c4c;
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Event Card Styles */
.event-card-search {
    border-left: 4px solid #9c3d64;
}

.event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    gap: 12px;
}

.event-title {
    color: #8a2d52;
    font-weight: 700;
    font-size: 1.1rem;
    margin: 0;
    flex: 1;
    line-height: 1.3;
    word-wrap: break-word;
    min-width: 0;
}

.event-description {
    color: #6b4c4c;
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.event-dates {
    display: flex;
    gap: 20px;
    font-size: 0.85rem;
    color: #ff6b93;
    margin-bottom: 8px;
    flex-wrap: wrap;
}

.event-date {
    display: flex;
    align-items: center;
    gap: 6px;
}

.date-icon {
    font-size: 0.8rem;
}

/* Type Badge */
.type-badge {
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid;
    flex-shrink: 0;
    white-space: nowrap;
}

.product-badge {
    background: linear-gradient(135deg, #ff6b93 0%, #ff85a1 100%);
    color: white;
    border-color: #ff6b93;
}

.event-badge {
    background: linear-gradient(135deg, #9c3d64 0%, #8a2d52 100%);
    color: white;
    border-color: #9c3d64;
}

/* View More Card */
.view-more-card {
    background: linear-gradient(135deg, #ffd1dc 0%, #ffb6c1 100%);
    border: 2px dashed #ff85a1;
    text-align: center;
    padding: 25px;
    margin-top: 8px;
}

.view-more-content {
    color: #8a2d52;
    font-weight: 700;
    font-size: 1.1rem;
}

.view-more-icon {
    font-size: 1.4rem;
    margin-bottom: 8px;
    display: block;
}

.search-result-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.search-result-link:hover {
    color: inherit;
}

/* Loading State */
.search-loading {
    text-align: center;
    padding: 30px;
    color: #ff6b93;
    font-size: 1.1rem;
}

.search-loading::after {
    content: '🌸';
    animation: blossom 1.5s ease-in-out infinite;
}

@keyframes blossom {
    0%, 100% { opacity: 0.5; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
}

/* No Results */
.search-no-results {
    text-align: center;
    padding: 30px;
    color: #c4a1a1;
    font-style: italic;
    font-size: 1.1rem;
    margin-bottom: 15px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .search-results-container {
        min-width: 350px;
        max-width: 400px;
        width: 85vw;
        padding: 15px;
    }

    .product-name,
    .event-title {
        font-size: 1rem;
    }

    .product-card-header,
    .event-header {
        gap: 8px;
    }

    .event-dates {
        gap: 15px;
        font-size: 0.8rem;
    }
}
`;

// Добавляем CSS в документ
const style = document.createElement('style');
style.textContent = searchCSS;
document.head.appendChild(style);

var options = {
    method: 'POST',
    mode: 'same-origin'
}

var url = 'search/get/'

// Основной скрипт поиска
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchContainer = document.getElementById('scroll-search');
    let timeoutId;
    let currentRequest = null;

    //для отмены fetch
    const controller = new AbortController();
    const signal = controller.signal;

    // Создаем контейнер для результатов
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results-container';
    resultsContainer.style.display = 'none';
    searchContainer.appendChild(resultsContainer);

    // Обработчик ввода
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();

        // Очищаем предыдущий таймер и запрос
        clearTimeout(timeoutId);
        if (currentRequest) {
            controller.abort();
        }

        // Скрываем результаты если запрос короткий
        if (query.length < 2) {
            hideResults();
            return;
        }

        // Устанавливаем новый таймер для отправки запроса
        timeoutId = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

    // Скрываем результаты при клике вне области поиска
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            hideResults();
        }
    });

    // Обработчик клавиш
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideResults();
        }
    });

    function performSearch(query) {
        // Показываем индикатор загрузки
        showLoading();

        // Отправляем запрос на сервер
        const formData = new FormData();
        formData.append('search', query);
        options['body'] = formData;
        options['signal'] = signal;


        // отправляем fetch-запрос
        //отправить http-Запрос
        console.log('send')
        fetch(url, options, ).then(response => response.json())
        .then(data => {
            const results = data;
            console.log(results);
            displayResults(results, query);
        })

    }

    function showLoading() {
        resultsContainer.innerHTML = '<div class="search-loading"></div>';
        resultsContainer.style.display = 'block';
    }

    function showError() {
        resultsContainer.innerHTML = '<div class="search-no-results">Error loading results 🌸</div>';
        resultsContainer.style.display = 'block';
    }

    function displayResults(results, query) {
        if (!results || results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-no-results">No results found 🌸</div>';
            resultsContainer.style.display = 'block';
            return;
        }

        const resultsGrid = document.createElement('div');
        resultsGrid.className = 'search-results-grid';

        // Показываем максимум 3 результата + кнопку "смотреть еще"
        const displayResults = results.slice(0, 3);

        displayResults.forEach(result => {
            const card = createResultCard(result);
            resultsGrid.appendChild(card);
        });

        // Добавляем карточку "смотреть еще"
        const viewMoreCard = createViewMoreCard(query);
        resultsGrid.appendChild(viewMoreCard);

        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(resultsGrid);
        resultsContainer.style.display = 'block';
    }

    function createResultCard(result) {
        const card = document.createElement('div');
        const link = document.createElement('a');
        link.href = result.url;
        link.className = 'search-result-link';

        if (result.model_type === 'Product') {
            card.className = 'search-result-card product-card-search';
            link.innerHTML = `
                <div class="product-card-header">
                    <h3 class="product-name">${escapeHtml(result.name)}</h3>
                    <div class="type-badge product-badge">Product</div>
                </div>
                <p class="product-description">${escapeHtml(truncateDescription(result.description, 120))}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <div class="product-price">$${result.price}</div>
                    <div style="font-size: 0.8rem; color: #ff6b93;">Click to view →</div>
                </div>
            `;
        } else {
            card.className = 'search-result-card event-card-search';
            link.innerHTML = `
                <div class="event-header">
                    <h3 class="event-title">${escapeHtml(result.title)}</h3>
                    <div class="type-badge event-badge">Event</div>
                </div>
                <p class="event-description">${escapeHtml(truncateDescription(result.description, 120))}</p>
                <div class="event-dates">
                    <div class="event-date">
                        <span class="date-icon">📅</span>
                        <span>${formatDate(result.start_event)}</span>
                    </div>
                    <div class="event-date">
                        <span class="date-icon">→</span>
                        <span>${formatDate(result.finish_event)}</span>
                    </div>
                </div>
                <div style="text-align: right; font-size: 0.8rem; color: #ff6b93; margin-top: 8px;">Click to view →</div>
            `;
        }

        card.appendChild(link);
        return card;
    }

    function submit_form(e) {
        document.getElementById('search-form').submit()
    }

    function createViewMoreCard(query) {
        const card = document.createElement('div');
        card.className = 'search-result-card view-more-card';

        const link = document.createElement('a');
        link.href = `#`;
        link.className = 'search-result-link';
        link.innerHTML = `
            <div class="view-more-content">
                <span class="view-more-icon">🔍</span>
                View all results for "${escapeHtml(query)}"
            </div>
        `;
        link.onclick = submit_form;

        card.appendChild(link);
        return card;
    }

    function hideResults() {
        resultsContainer.style.display = 'none';
    }

    // Вспомогательные функции
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function truncateDescription(description, maxLength = 100) {
        if (!description) return 'No description available';
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    }

    function formatDate(dateString) {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
});