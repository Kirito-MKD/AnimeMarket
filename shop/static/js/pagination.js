class SakuraPagination {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.currentPage = document.getElementById("currentPage").value;
        this.totalPages = document.getElementById("totalPages").value;
        this.onPageChange = options.onPageChange || (() => {});
        this.maxVisiblePages = options.maxVisiblePages || 5;
        this.currentUrl = "http://127.0.0.1:8000/ru/events/";
        console.log(this.currentPage)
        this.init();
    }

    init() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.container.innerHTML = '';

        // Кнопка "Назад"
        const prevBtn = this.createButton('prev', '❮', this.currentPage > 1);
        this.container.appendChild(prevBtn);

        // Первая страница
        if (this.currentPage > Math.floor(this.maxVisiblePages / 2) + 1) {
            this.container.appendChild(this.createButton(1, '1'));
            if (this.currentPage > Math.floor(this.maxVisiblePages / 2) + 2) {
                this.container.appendChild(this.createEllipsis());
            }
        }

        // Видимые страницы
        const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
        const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            this.container.appendChild(this.createButton(i, i.toString(), this.currentPage, true, i === this.currentPage, true));
        }

        // Последняя страница
        if (this.currentPage < this.totalPages - Math.floor(this.maxVisiblePages / 2)) {
            if (this.currentPage < this.totalPages - Math.floor(this.maxVisiblePages / 2) - 1) {
                this.container.appendChild(this.createEllipsis());
            }
            this.container.appendChild(this.createButton(this.totalPages, this.totalPages.toString()));
        }

        // Кнопка "Вперед"
        const nextBtn = this.createButton('next', '❯', this.currentPage < this.totalPages);
        this.container.appendChild(nextBtn);
    }

    createButton(page, text, currentPage, enabled = true, active = false, num_button=false) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${page == currentPage ? 'active' : ''} ${!enabled ? 'disabled' : ''}`;
        btn.textContent = text;
        btn.dataset.page = page;

        if (page == currentPage) {
            btn.disabled = true;
        }

        return btn;
    }

    createEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'page-ellipsis';
        ellipsis.textContent = '...';
        return ellipsis;
    }

    addEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn') && !e.target.classList.contains('disabled')) {
                const page = e.target.dataset.page;

                if (page === 'prev') {
                    this.goToPage(this.currentPage - 1);
                    window.location.replace(this.currentUrl + document.getElementById("prevPage").value);
                } else if (page === 'next') {
                    this.goToPage(this.currentPage + 1);
                    window.location.replace(this.currentUrl + document.getElementById("nextPage").value);
                } else {
                    window.location.replace(this.currentUrl + "?page=" + page)
                    this.goToPage(parseInt(page));
                }
            }
        });
    }

    goToPage(page) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.currentPage = page;
            this.render();
            this.onPageChange(page);

            // Анимация перехода
            this.container.style.animation = 'none';
            setTimeout(() => {
                this.container.style.animation = 'page-flip 0.6s ease';
            }, 10);
        }
    }

    update(options) {
        if (options.currentPage !== undefined) {
            this.currentPage = options.currentPage;
        }
        if (options.totalPages !== undefined) {
            this.totalPages = options.totalPages;
        }
        if (options.maxVisiblePages !== undefined) {
            this.maxVisiblePages = options.maxVisiblePages;
        }

        this.render();
    }
}

// Инициализация пагинации
document.addEventListener('DOMContentLoaded', function() {
    const pagination = new SakuraPagination('pagination', {
        currentPage: document.getElementById("currentPage").value,
        totalPages: document.getElementById("totalPages").value,
        maxVisiblePages: 5,
    });
})