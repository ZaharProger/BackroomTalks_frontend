import React from 'react'
import { w3cwebsocket as WebSocket } from 'websocket'
import { FloatLabel } from 'primereact/floatlabel'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

import './chat.css'
import Message from './Message'

export default function Chat(props) {
    const { offset, iterations_amount, chat_code, username } = props.config

    const [messages, setMessages] = React.useState(Array())
    const [enteredMessage, setEnteredMessage] = React.useState('')

    const disconnectRef = React.useRef(null)

    const client = React.useMemo(() => {
        return new WebSocket(`ws://127.0.0.1:8000/ws/${chat_code}/`)
    }, [chat_code])

    React.useEffect(() => {
        client.onmessage = (message) => {
            const responseData = JSON.parse(message.data)
            if (responseData) {
                if (responseData.sender == '' && responseData.text == '') {
                    setMessages(Array())
                    disconnectRef.current.show({
                        severity: 'secondary',
                        summary: 'Disconnected',
                        detail: 'Some of your chatmates left chat. Messages history has been cleared',
                        life: 3000
                    })
                }
                else {
                    const newMessage = {
                        sender: responseData.sender,
                        text: responseData.text
                    }
                    setMessages([...messages, newMessage])
                }
            }
        }
    }, [messages, client, disconnectRef])

    React.useEffect(() => {
        const messagesContainers = document.querySelectorAll('.Message')
            if (messagesContainers.length != 0) {
                const lastMessage = messagesContainers[messagesContainers.length - 1]
                lastMessage.scrollIntoView({
                    behavior: 'instant',
                    block: 'start',
                    inline: 'nearest'
                })
            }
    }, [messages])

    const prepareHexCode = React.useCallback(data => {
        let hexCode = data.codePointAt(0).toString(16).toUpperCase()
        while (hexCode.length < 4) {
            hexCode = `0${hexCode}`
        }

        return hexCode
    }, [])

    const encodeMessage = React.useCallback(message => {
        let encodedText = message.split('')

        for (let i = 0; i < iterations_amount; ++i) {
            encodedText = encodedText.reverse()

            for (let j = 0; j < encodedText.length; ++j) {
                let hexCode = prepareHexCode(encodedText[j])
                const encodedCode = parseInt(hexCode, 16) + offset
                encodedText[j] = String.fromCharCode(encodedCode)
            }
        }

        return encodedText.join('')
    }, [offset, iterations_amount])

    const decodeMessage = React.useCallback(message => {
        let decodedText = message.split('')

        for (let i = 0; i < iterations_amount; ++i) {
            for (let j = 0; j < decodedText.length; ++j) {
                let hexCode = prepareHexCode(decodedText[j])
                const decodedCode = parseInt(hexCode, 16) - offset
                decodedText[j] = String.fromCharCode(decodedCode)
            }

            decodedText = decodedText.reverse()
        }

        return decodedText.join('')
    }, [offset, iterations_amount])

    const sendButtonHandler = React.useCallback(() => {
        const messageData = JSON.stringify({
            type: "message",
            text: encodeMessage(enteredMessage),
            sender: username
        })
        setEnteredMessage('')
        client.send(messageData)
    }, [enteredMessage, username, client])

    const validateMessage = React.useCallback(() => {
        const regex = new RegExp(/^[\s]+$/)
        return regex.test(enteredMessage) || enteredMessage == ''
    }, [enteredMessage])

    return (
        <div id='Chat' className='d-flex flex-column'>
            <div id="messages-container" className='d-flex flex-column'>
                {
                    messages.map((message, i) => {
                        const preparedMessage = {
                            sender: message.sender,
                            text: decodeMessage(message.text)
                        }
                        const isOpposite = username !== message.sender

                        return <Message key={i} is_opposite={isOpposite}
                            data={preparedMessage} />
                    })
                }
            </div>
            <div id="chat-input" className='d-flex align-items-center position-fixed w-100'>
                <FloatLabel>
                    <InputTextarea autoResize id="message" name='message'
                        value={enteredMessage}
                        onChange={(e) => setEnteredMessage(e.target.value)}
                        className="regular-text d-flex w-100" rows={2} />
                    <label htmlFor="message" className='regular-text'>Your message</label>
                </FloatLabel>
                <Button label="Send" icon="pi pi-send" disabled={validateMessage()}
                    iconPos="top" className='chat-button ms-1 mt-auto'
                    onClick={() => sendButtonHandler()} />
            </div>
            <Toast ref={disconnectRef} position="bottom-center"
                className='regular-text' />
        </div>
    )
}