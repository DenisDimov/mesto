
export default class Section {
  constructor(container, {items, renderer}) {
    this._renderItems = items
    this._renderer = renderer
    this._container = document.querySelector(container)
  }

  renderItems() {
    this._renderItems.forEach(item => {
      this._renderer(item)
    })
  }

  addItem(element, order = true) {
    if (order) {
      this._container.append(element)
    } else {
      this._container.prepend(element)
    }
  }
}