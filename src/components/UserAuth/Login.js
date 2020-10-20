import React, { useState } from 'react'
import firebase from "gatsby-plugin-firebase"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message)
        setNotification(err.message)
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
    setUsername('');
    setPassword('');
  }

  return (
    <form onSubmit={handleLogin} className="fb-form">
      <label>
        Email:
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required />
      </label>
      <div className="form-submit-block">
        <button type="submit">Login</button>
      </div>
      {notification && <p className="notification-msg">{notification}</p>}
    </form>
  )
}
