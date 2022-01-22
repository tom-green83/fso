import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification.text
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // console.log(notification)
  if (notification.length === 0) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToTops = (state) => {
  return { notification: state.notification }
}
const ConnectedNotification = connect(mapStateToTops)(Notification)
export default ConnectedNotification