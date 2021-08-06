
export default class Section {
  constructor(containerSelector, {items, renderer}) {
    this._renderItems = items
    this._renderer = renderer
    this._containerSelector = document.querySelector(containerSelector)
  }

  renderItems() {
    this._renderItems.forEach(item => {
      this._renderer(item)
    })
  }

  addItem(element, order = true) {
    if (order) {
      this._containerSelector.append(element)
    } else {
      this._containerSelector.prepend(element)
    }
  }
}