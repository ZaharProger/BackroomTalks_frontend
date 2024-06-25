import React from 'react'

import './footer.css'
import icon from '../../assets/logo.svg'

export default function Footer() {
    const footerText = `BACKROOM TALKS. Copyright © ${new Date().getFullYear()}`

    return (
        <footer id='Footer' className='d-flex justify-content-center align-items-center p-2 position-fixed w-100'>
            <img src={icon} alt='Backroom Talks logo' />
            <span className='caption-text'>
                {
                    footerText
                }
            </span>
        </footer>
    )
}