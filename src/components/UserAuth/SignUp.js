import React, { useState } from 'react'
import firebase from "gatsby-plugin-firebase"

export default function SignUp() {
  const [imageFile, setImageFile] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (password !== passConf) {
        setNotification(
          'Password and password confirmation does not match'
        )
        setTimeout(() => {
          setNotification('')
        }, 2000);

        setPassword('');
        setPassConf('');
        return null;
      }

      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (userCredentials.user) {
        const user = firebase.auth().currentUser;
        const storage = firebase.storage();
        const uploadTask = storage.ref(`${user.uid}/avatar/${imageFile.name}`).put(imageFile);

        await userCredentials.user.updateProfile({
          displayName: displayName,
        });
        await userCredentials.user.reload();

        uploadTask.on('state_changed',
          () => {
            // complete function ....
            storage.ref(`${user.uid}/avatar/${imageFile.name}`).getDownloadURL().then(url => {
              userCredentials.user.updateProfile({
                photoURL: url,
              });
              userCredentials.user.reload();
            });
          },
          (error) => {
            // error function ....
            console.log(error);
          });

        console.warn(userCredentials.user);
      }
    } catch (error) {
      console.warn(`error:, ${error}`);
    }
  }

  return (
    <form onSubmit={handleLogin} className="fb-form">
      <label>
        Display Name:
          <input
          type="text"
          value={displayName}
          onChange={({ target }) => setDisplayName(target.value)}
          required />
      </label>
      <label>
        Avatar:
        <input
          type="file"
          onChange={({ target }) => target.files[0] && setImageFile(target.files[0])}
          required />
      </label>
      <label>
        Email:
          <input
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
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
      <label>
        Confirm password:
          <input
          type="password"
          value={passConf}
          onChange={({ target }) => setPassConf(target.value)}
          required />
      </label>
      {notification && <p className="notification-msg">{notification}</p>}

      <div className="form-submit-block">
        <button type="submit">Register</button>
      </div>
    </form>
  )
}
