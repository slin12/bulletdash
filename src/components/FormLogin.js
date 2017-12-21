import React from 'react'

const FormLogin = () => {
  return (
    <div className="container">
      <h1 id="title">bulletdash</h1>
      <div id="login">
        <h2>login</h2>
        <form>
          <fieldset>
            <label className="form" for="nameField">Name</label>
            <input type="text" id="nameField" />
            <label className="form" for="password">Password</label>
            <input type="password" id="password" />
            <button className="form-button" type="submit">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default FormLogin
