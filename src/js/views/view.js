import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._Message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  generateMarkupButtonNext(e) {
    return `<p class = "mid_btn" data-goto="${this._data.page}"
    class="page-no middle pagination__btn--mid">
  <span>Page ${this._data.page}</span>
</p>
<button data-goto="${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${this._data.page + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  generateMarkupButtonprevious(e) {
    return `
<button data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
  <span>Page ${this._data.page - 1}</span>
</button><p class = "mid_btn" data-goto="${this._data.page}"
class="page-no middle pagination__btn--mid ">
<span>Page ${this._data.page}</span>
</p>`;
  }
  generateMarkupButtonboth(e) {
    return `<button data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
  <span>Page ${this._data.page - 1}</span>
</button><button data-goto="${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
<span>Page ${this._data.page + 1}</span>
<svg class="search__icon">
  <use href="${icons}#icon-arrow-right"></use>
</svg>
</button> <p class = "mid_btn" data-goto="${this._data.page}"
class="page-no middle pagination__btn--mid ">
<span>Page ${this._data.page}</span>
</p>`;
  }
}
