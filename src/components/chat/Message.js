import React from 'react'

export default function Message(props) {
    const messageWrapAlignment = props.is_opposite ? 
        'opposite-message-wrap' : 'message-wrap'
    const senderAlignment = props.is_opposite ? 
        'opposite-message-sender' : 'message-sender'
    const messageAlignment = props.is_opposite ? 
        'opposite-message' : 'message'
    const messageTimeAlignment = props.is_opposite ? 
        'opposite-message-time' : 'message-time'

    return (
        <div className={`Message ${messageWrapAlignment}`}>
            <span className={`${senderAlignment} bold-caption-text`}>
                {
                    props.data.sender
                }
            </span>
            <div className={messageAlignment}>
                <p className='regular-text'>
                    {
                        props.data.text
                    }
                </p>
                <span className={`${messageTimeAlignment} caption-text`}>
                    {
                        props.data.send_time
                    }
                </span>
            </div>
        </div>
    )
}
