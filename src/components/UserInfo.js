export default class UserInfo {
  constructor(nameInput, jobInput) {
    this._nameInput = nameInput
    this._jobInput = jobInput

  }

  getUserInfo() {
    this._userInfo = {
      Name: this._nameInput.textContent,
      Job: this._jobInput.textContent,
    }
    return this._userInfo

  }

  setUserInfo(name, job) {
    this._nameInput.textContent = name
    this._jobInput.textContent = job
  }

}