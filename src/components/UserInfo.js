export default class UserInfo {
  constructor(nameInput, jobInput, profileAvatar) {
    this._nameInput = nameInput
    this._jobInput = jobInput
    this._avatar = profileAvatar
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

  setAvatar(avatar) {
    this._avatar.src = avatar
  }
}