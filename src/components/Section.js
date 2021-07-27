import { initialCards } from "../components/initial-сards.js"

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

  addItem(element) {
    this._containerSelector.prepend(element)
  }
}