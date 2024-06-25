import React from 'react'

import './header.css'

export default function Header() {
    return (
        <header id='Header' className='d-flex flex-column justify-content-center align-items-center p-2 position-fixed w-100'>
            <h4 className='header-text mb-2'>
                BACKROOM TALKS
            </h4>
            <h6 className='semi-header-text m-0'>
                within the worldwide web
            </h6>
        </header>
    )
}