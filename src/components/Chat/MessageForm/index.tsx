import React, { FormEvent } from 'react';
import { MessageType } from '../../../types';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


type PropsType = {
    content: string
    setContent: (content: string) => void

    editingMessage: MessageType
    handleSubmit: (e?: FormEvent) => void
    handleDisardMessageEdit: () => void
}

const MessageForm = ({ content, setContent, editingMessage, handleSubmit, handleDisardMessageEdit }: PropsType) => {
    return (
        <Form onSubmit={handleSubmit} className="mt-6">
            <Form.Group>
                <Form.Label>Сообщение</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.currentTarget.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === 'Enter') {
                            handleSubmit()
                        }
                    }}
                />


                {editingMessage.id ?
                    <div className="mt-3" >
                        <Button className="mr-3" onClick={handleDisardMessageEdit} type="button">Отменить</Button>
                        <Button type="submit">Изменить</Button>
                    </div> :
                    <Button type="submit" disabled={content.length === 0} className="mt-3">Отправить</Button>
                }
            </Form.Group>
        </Form>
    )
}

export default MessageForm;
