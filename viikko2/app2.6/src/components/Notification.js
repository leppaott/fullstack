import React from 'react'

const Notification = ({ message }) => {
    return message && (
        <div className='error'>
            {message}
        </div>
    )
}

export default Notification