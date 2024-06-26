import React from 'react'

import './header.css'

export default function Header(props) {
    return (
        <header id='Header' className='d-flex flex-column justify-content-center align-items-center p-2 position-fixed w-100'>
            <h4 className='header-text mb-2'>
                {
                    props.chat_entered ? 
                    `Backroom #${props.chat_code}` : 
                    'BACKROOM TALKS'
                }
            </h4>
            <h6 className='semi-header-text m-0'>
                {
                    props.chat_entered ? 
                        'reload the page to leave chat' : 
                        'within the worldwide web'
                }
            </h6>
        </header>
    )
}