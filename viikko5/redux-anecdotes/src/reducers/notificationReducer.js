
const notificationReducer = (state = 'initial', action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default notificationReducer
