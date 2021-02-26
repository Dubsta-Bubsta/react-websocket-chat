import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { MessageType } from '../../../types';
import { PencilIcon, TrashIcon } from '../../../assets/images';


type PropsType = {
    username: String
    messages: Array<MessageType>

    handleDelete: (id: number) => void
    handleSetMessageEdit: (message: MessageType) => void
}

const MessagesList = ({ username, messages, handleDelete, handleSetMessageEdit }: PropsType) => {
    if (!messages.length) {
        return null
    }

    return (
        <table className="messages-list">
            <tbody>
                {messages.map(message => {
                    const isMyMessage = username === message.username
                    console.log(isMyMessage)
                    return (
                        <tr key={message.id} className="message">
                            <td colSpan={isMyMessage ? 1 : 2}>
                                <p className={`mb-0 mt-0 ${isMyMessage ? 'text-left' : 'text-right'}`}>{message.username} - {message.content}</p>
                            </td>
                            { (isMyMessage) &&
                                <td className="buttons-cell">
                                    <div className="d-flex buttons justify-content-end">
                                        <Button onClick={() => { handleSetMessageEdit(message) }} className="btn btn-light">
                                            <PencilIcon />
                                        </Button>
                                        <Button onClick={() => { handleDelete(message.id) }} className="btn btn-light">
                                            <TrashIcon />
                                        </Button>
                                    </div>
                                </td>}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default MessagesList;
