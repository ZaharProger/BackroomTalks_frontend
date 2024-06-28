import React from 'react'

import './chat.css'
import Message from './Message'

export default function Chat(props) {
    const messages = [
        'feojeijfioewj\nfioewhjfwehfuewhfuehfuowhgu\nrhgurehgiue',
        'jferijgierjgirejgirejgirjgijergijrigjr\nijgirjgrijgirjgirjgirjgirjgirjgirjgirj',
        'fkrokgreo',
        'kforejgoejrgojrgoerjgir\njgirigrigjriogjrijgirjgirj\ngirjgirjigjrigjrigjrijgr',
        'jgrojgorjgorgjrojgrojgorjgrojgrojgrojgrojgorjgorjgorjgorjgorjgojrogjrogjroj',
        'krkgorkgrokgrokgrokgrokgorkgo\nrkgrokgorkgrokgrokgorkgorkgorkgorkgokrogkrogkor',
        'rkgkrogrkgorkogkrogkrokgorkgorkgorkgorkgorkg',
        'feojeijfioewjfioewhjfwehfuewhfuehfuowhgurhgurehgiue',
        'jferijgierjgirejgirejgirjgijergijrigjrijgirjgrijgirjgirjgirjgirjgirjgirjgirj',
        'fkrokgreo',
        'kforejgoejrgojrgoerjgirjgirigrigjriogjrijgirjgirjgirjgirjigjrigjrigjrijgr',
        'jgrojgorjgorgjrojgrojgorjgrojgro\njgrojgrojgorjgorjgorjgorjgorjgojrogjrogjroj',
        'krkgorkgrokgrokgrokgrokgorkgorkgrokgorkgrokgrokg\norkgorkgorkgorkgokrogkrogkor',
        'rkgkrogrkgorkog\nkrogkrokgorkgorkgorkgorkgorkg',
        'feojeijfioewjfioewhjfwehfuewhfuehfuowhgurhgurehgiue',
        'jferijgierjgirejgirejgirjgijergijrigjrijgirjgrijgirjgirjgirjgirjgirjgirjgirj',
        'fkrokgreo',
        'kforejgoejrgojrgoerjgirjgirigrigjriogjrijgirjgirjgirjgirjigjrigjrigjrijgr',
        'jgrojgorjgorgjrojgrojgorjgrojgrojgr\nojgrojgorjgorjgorjgorjgorjgojrogjrogjroj',
        'krkgorkgrok\ngrokgrokgrokgorkgorkgrokgorkgrokgrokgorkgorkgorkgorkgokrogkrogkor',
        'rkgkrogrkgorkogkrogkrokgo\n\nrkgorkgorkgorkgo\nrkg'
    ]
    return (
        <div id='Chat' className='d-flex flex-column'>
            {
                messages.map((message, i) => {
                    return <Message key={i} is_opposite={i % 10 <= 4} 
                        text={message} sender={props.config.username} />
                })
            }
        </div>
    )
}