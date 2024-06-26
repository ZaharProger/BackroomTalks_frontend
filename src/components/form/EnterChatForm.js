import React from 'react'
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { InputOtp } from 'primereact/inputotp'
import { FloatLabel } from "primereact/floatlabel"
import { InputNumber } from 'primereact/inputnumber'

import './form.css'
import useApi from '../../hooks/useApi'

export default function EnterChatForm(props) {
    const stepperRef = React.useRef(null)
    const errorMessageRef = React.useRef(null)
    const [stepperOrientation, setStepperOrientation] = React.useState(
        window.innerWidth <= 850 ? 'vertical' : 'horizontal'
    )

    const [seed, setSeed] = React.useState(['', '', '', '', '', '', '', ''])
    const [offset, setOffset] = React.useState(1)
    const [iterationsAmount, setIterationsAmount] = React.useState(1)
    const [username, setUsername] = React.useState('')

    const callApi = useApi()

    React.useEffect(() => {
        window.onresize = () => {
            setStepperOrientation(window.innerWidth <= 850 ? 'vertical' : 'horizontal')
        }

        const classes = '.p-stepper-number, .p-stepper-title'
        document.querySelectorAll(classes).forEach(item => {
            item.classList.add('semi-header-text')
        })
    }, [])

    const changeSeedHandler = React.useCallback((index, newSeedPart) => {
        setSeed(seed.map((item, i) => {
            return i == index ? newSeedPart : item
        }))
    }, [setSeed, seed])

    const enterChatButtonHandler = React.useCallback(() => {
        const bodyData = {
            seed: Array.from(document.querySelectorAll('.seed'))
                .map(input => input.value.toUpperCase())
                .join('')
        }
        const headers = {
            'Content-Type': 'application/json'
        }

        errorMessageRef.current.show({
            severity: 'error',
            summary: 'Unexpected Error',
            detail: 'Please, try again later :(',
            life: 3000
        })
        // callApi('http://localhost:8000/api/chats/', 'POST', bodyData, headers)
        //     .then(response => {
        //         if (response.status == 200) {
        //             props.callback(true)
        //         }
        //         else {
        //             errorMessageRef.current.show({ 
        //                 severity: 'error', 
        //                 summary: 'Unexpected Error', 
        //                 detail: 'Please, try again later :(', 
        //                 life: 3000 
        //             })
        //         }
        //     })
    }, [props])

    return (
        <div id='EnterChatForm'>
            <Stepper ref={stepperRef} linear orientation={stepperOrientation}>
                <StepperPanel header="Enter seed-phrase" className="semi-header-text">
                    <div className='d-flex justify-content-center flex-column pt-4 pb-2 ps-2 pe-2'>
                        <label htmlFor="seed" className='regular-text m-auto'>
                            Enter 8 secret words to create new chat or enter existing
                        </label>
                        <div className='seed-table d-flex m-auto mt-4'>
                            <div className='seed-table-left d-flex flex-column'>
                                {
                                    seed.map((part, i) => {
                                        let component = null
                                        if (i < 4) {
                                            component = <InputOtp key={i} value={part}
                                                className='seed regular-text'
                                                onChange={(e) => changeSeedHandler(i, e.value)}
                                                length={4} />
                                        }

                                        return component
                                    })
                                }
                            </div>
                            <div className='seed-table-right d-flex flex-column'>
                                {
                                    seed.map((part, i) => {
                                        let component = null
                                        if (i >= 4) {
                                            component = <InputOtp key={i} value={part}
                                                className='seed regular-text'
                                                onChange={(e) => changeSeedHandler(i, e.value)}
                                                length={4} />
                                        }

                                        return component
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex pt-4 justify-content-center">
                        <Button label="Next" icon="pi pi-arrow-right"
                            iconPos="right" className='chat-button me-1 ms-1'
                            onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Setup encryption" className="semi-header-text">
                    <div className="d-flex flex-column justify-content-center pt-4 pb-2 ps-2 pe-2">
                        <FloatLabel className="d-flex m-auto">
                            <InputNumber id="offset" value={offset}
                                className="regular-text" min={-100} max={100}
                                aria-describedby="offset-help" showButtons
                                onValueChange={(e) => setOffset(e.target.value)} />
                            <label htmlFor="offset" className='regular-text'>
                                Offset
                            </label>
                        </FloatLabel>
                        <small id="offset-help" className='caption-text mt-1 me-auto ms-auto d-flex'>
                            A number between -100 and 100
                        </small>
                        <FloatLabel className="d-flex me-auto ms-auto mt-5">
                            <InputNumber id="iterations-amount" value={iterationsAmount}
                                className="regular-text" min={0} max={30000}
                                aria-describedby="iterations-amount-help" showButtons
                                onValueChange={(e) => setIterationsAmount(e.target.value)} />
                            <label htmlFor="iterations-amount" className='regular-text'>
                                Iterations amount
                            </label>
                        </FloatLabel>
                        <small id="iterations-amount-help" className='caption-text mt-1 me-auto ms-auto d-flex'>
                            A number between 1 and 30000
                        </small>
                    </div>
                    <div className="d-flex pt-4 justify-content-center">
                        <Button label="Back" severity="secondary"
                            icon="pi pi-arrow-left" className='chat-button me-3 ms-3'
                            onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Next" icon="pi pi-arrow-right"
                            iconPos="right" className='chat-button ms-3 me-3'
                            onClick={() => stepperRef.current.nextCallback()} />
                    </div>
                </StepperPanel>
                <StepperPanel header="Introduce yourself" className="semi-header-text">
                    <div className="d-flex justify-content-center pt-4 pb-2 ps-2 pe-2">
                        <FloatLabel className="d-flex m-auto">
                            <InputText id="username" value={username}
                                className='regular-text'
                                onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username" className='regular-text'>
                                Your name
                            </label>
                        </FloatLabel>
                    </div>
                    <div className="d-flex pt-4 justify-content-center">
                        <Button label="Back" severity="secondary"
                            icon="pi pi-arrow-left" className='chat-button me-3 ms-3'
                            onClick={() => stepperRef.current.prevCallback()} />
                        <Button label="Enter chat" icon="pi pi-sign-in"
                            iconPos="right" className='chat-button me-3 ms-3'
                            onClick={() => enterChatButtonHandler()} />
                    </div>
                </StepperPanel>
            </Stepper>
            <Toast ref={errorMessageRef} position="bottom-center"
                className='regular-text' />
        </div>
    )
}
