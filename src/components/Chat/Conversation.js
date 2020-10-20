import React, { useState, useEffect } from 'react'
import firebase from "gatsby-plugin-firebase"
import Messages from './Messages';

export default function Conversation() {
  const currUser = firebase.auth().currentUser;
  const [loggedIn, setLoggedIn] = useState(false);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState('');

  firebase.auth()
    .onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });

  useEffect(() => {
    try {
      firebase.database().ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChats(chats);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await firebase.database().ref("chats").push({
        content: content,
        timestamp: Date.now(),
        uid: currUser.uid,
        avatar: currUser.photoURL,
        displayName: currUser.displayName
      });
      setContent('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      {loggedIn ?
        <div>
          <Messages messages={chats} currentUser={currUser} />
          <form onSubmit={handleSubmit} className="fb-form">
            <textarea
              type="message"
              value={content}
              onChange={({ target }) => setContent(target.value)}
              required
              placeholder="Enter message" />
            <div className="form-submit-block">
              <button type="submit" className="button-send-message">Send</button>
            </div>
          </form>
        </div>
        : ''}
    </React.Fragment>
  )
}
