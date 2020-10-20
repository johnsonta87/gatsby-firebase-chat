import React from 'react'

export default function Messages(props) {
  if (props.messages.displayName === props.currentUser.displayName) {
    console.log('MATCHES')
  }

  return (
    <div className="message-list">
      {props.messages.map(message =>
        <div key={message.timestamp} className={`message-item ${message.displayName === props.currentUser.displayName ? 'current' : ''}`}>
          <img src={message.avatar} className="message-avatar" alt="Avatar" />
          <div className="message-content">
            <p className="display-name">{message.displayName}</p>
            <p>{message.content}</p>
            <span className="timestamp">{message.timestamp}</span>
          </div>
        </div>
      )}
    </div>
  )
}
