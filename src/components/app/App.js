import React from 'react'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-purple/theme.css'

import './app.css'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Chat from '../chat/Chat'
import EnterChatForm from '../form/EnterChatForm'
import useApi from '../../hooks/useApi'

export default function App() {
    const [chatConfig, setChatConfig] = React.useState({
        chat_entered: false,
        offset: 1,
        iterations_amount: 1,
        username: '',
        chat_code: '',
        chat_code_client: ''
    })

    const callApi = useApi()

    React.useEffect(() => {
        const classes = '.p-button-label'
        document.querySelectorAll(classes).forEach(item => {
            item.classList.add('semi-header-text')
        })

        window.onbeforeunload = () => {
            if (chatConfig.chat_code.length != 0) {
                const bodyData = {
                    chat_code: chatConfig.chat_code
                }
                const headers = {
                    'Content-Type': 'application/json'
                }
                const url = 'http://localhost:8000/api/chats/delete/'
    
                callApi(url, 'PUT', JSON.stringify(bodyData), headers).then(() => {
                    
                })
            }
        }
    }, [chatConfig])

    return (
        <div id='App'>
            <Header config={chatConfig} />
            {
                chatConfig.chat_entered ? 
                    <Chat config={ chatConfig } /> : 
                    <EnterChatForm callback={(newChatConfig) => {
                        setChatConfig({...newChatConfig})
                    }} />
            }
            <Footer />
        </div>
    )
}