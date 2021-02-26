import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { AxiosResponse } from 'axios'
import { WSclient, AxiosInstance } from '../../constants'
import { MessageType, WSMessageData, WSMessageActionEnum } from '../../types';

import Container from 'react-bootstrap/Container'

import MessagesList from './MessagesList';
import MessageForm from './MessageForm';


type PropsType = {
    username: String
}


const Chat = ({ username }: PropsType) => {
    const [content, setContent] = useState('')

    const [messages, setMessages] = useState<Array<MessageType>>([])
    const [editingMessage, setEditingMessage] = useState<MessageType>({} as MessageType)

    useEffect(() => {
        WSclient.onopen = () => {
            
        };
        WSclient.onmessage = (message: MessageEvent<WSMessageData>) => {
            if (typeof message.data === 'string') {
                const data = JSON.parse(message.data)

                if (data.status === 200) {
                    handleWSActionStatus(data.action, data.body)
                }
            }
        }
    }, [username])

    useEffect(() => {
        getMessages()
    }, [])


    const getMessages = async () => {
        const response = await AxiosInstance.get('/messages/') as AxiosResponse<Array<MessageType>>
        if (response.status === 200) {
            setMessages(response.data)
        }
    }

    const handleSubmit = (e?: FormEvent) => {
        if (editingMessage.id) {
            handleEdit()
        } else {
            handleSend()
        }
        e?.preventDefault()
    }


    const handleSend = async () => {
        if (content.length !== 0) {
            const messageObject = {
                username,
                content,
            }

            const response = await AxiosInstance.post('/messages/', messageObject)

            if (response?.status === 201) {
                setContent('')
            }
        }
    }

    const handleEdit = async () => {
        const message = {
            ...editingMessage,
            content
        }

        if (message.content === '') {
            handleDelete(message.id)
        } else {
            await AxiosInstance.patch(`/messages/${message.id}/`, message)
        }

    }

    const handleDelete = async (id: number) => {
        await AxiosInstance.delete(`/messages/${id}/`)
    }


    const handleSetMessageEdit = (message: MessageType) => {
        setEditingMessage(message);
        setContent(message.content)
    }

    const handleDisardMessageEdit = () => {
        setEditingMessage({} as MessageType);
        setContent('')
    }



    const handleWSActionStatus = (action: WSMessageActionEnum, body: MessageType) => {
        switch (action) {
            case WSMessageActionEnum.create: {
                handleWSMessageCreate(body)
                break;
            }
            case WSMessageActionEnum.update: {
                handleWSMessageEdit(body)
                break;
            }
            case WSMessageActionEnum.delete: {
                handleWSMessageDelete(body.id)
                break;
            }
            default: {
                break;
            }
        }
    }

    const handleWSMessageCreate = (messageBody: MessageType) => {
        setMessages(messages => [...messages, messageBody])
    }

    const handleWSMessageEdit = (messageBody: MessageType) => {
        setMessages((messages) => {
            const messagesCopy = messages.map(message => {
                if (message.id === messageBody.id) {
                    return messageBody
                }
                return message
            })
            return messagesCopy
        })
    }

    const handleWSMessageDelete = (id: number) => {
        setMessages((messages) => messages.filter(message => message.id !== id))
    }


    return (
        <Container fluid="md" className="mt-3 mb-3 pt-4 pb-2 card">
            <MessagesList 
                messages={messages}
                username={username}
                handleDelete={handleDelete}
                handleSetMessageEdit={handleSetMessageEdit}
            />

            <MessageForm 
                content={content}
                setContent={setContent}
                handleSubmit={handleSubmit}

                editingMessage={editingMessage}
                handleDisardMessageEdit={handleDisardMessageEdit}
            />
        </Container>
    )
}

export default Chat;
