import React from 'react'
import 'primeicons/primeicons.css'

import './app.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Chat from '../chat/Chat'
import EnterChatForm from '../form/EnterChatForm'

export default function App() {
    const [chatEntered, setChatEntered] = React.useState(false)

    return (
        <div id='App'>
            <Header chat_entered={ chatEntered } chat_code={ '' } />
            {
                chatEntered ? 
                    <Chat /> : 
                    <EnterChatForm callback={(value) => setChatEntered(value)} />
            }
            <Footer />
        </div>
    )
}