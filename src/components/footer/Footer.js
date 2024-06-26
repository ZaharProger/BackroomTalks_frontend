import React from 'react'

import './footer.css'
import icon from '../../assets/logo.svg'

export default function Footer() {
    return (
        <footer id='Footer' className='d-flex justify-content-center align-items-center p-2 position-fixed w-100'>
            <img src={icon} alt='Backroom Talks logo' />
            <span className='caption-text'>
                {
                    `BACKROOM TALKS. Copyright © ${new Date().getFullYear()}`
                }
            </span>
        </footer>
    )
}