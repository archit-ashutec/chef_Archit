import View from './view.js';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._data.page === 1 && numPages > 1) {
      return this.generateMarkupButtonNext();
    }
    if (this._data.page === numPages && numPages > 1) {
      return this.generateMarkupButtonprevious();
    }
    if (this._data.page < numPages) {
      return this.generateMarkupButtonboth();
    }
    return '';
  }
}

export default new paginationView();
