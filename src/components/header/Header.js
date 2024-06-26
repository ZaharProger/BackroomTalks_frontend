import React from 'react'

import './header.css'

export default function Header(props) {
    const { chat_entered, chat_code_client } = props.config
    return (
        <header id='Header' className='d-flex flex-column justify-content-center align-items-center p-2 position-fixed w-100'>
            <h4 className='header-text mb-2'>
                {
                    chat_entered ? 
                    `Backroom #${chat_code_client}` : 
                    'BACKROOM TALKS'
                }
            </h4>
            <h6 className='semi-header-text m-0'>
                {
                    chat_entered ? 
                        'reload the page to leave chat' : 
                        'within the worldwide web'
                }
            </h6>
        </header>
    )
}