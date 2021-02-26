import React, { useState, FormEvent } from 'react';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

type PropsType = {
    setUserName: (username: string) => void
}

const Auth = ({ setUserName: setAppUserName }: PropsType) => {
    const [username, setUserName] = useState('')



    const handleAuth = (e: FormEvent) => {
        localStorage.setItem('username', username)
        setAppUserName(username)
        e.preventDefault()
    }

    return (
        <Container fluid="md" className="mt-3 mb-3 pt-4 pb-2 card">
            <Form onSubmit={handleAuth} className="mt-6">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Имя пользователя</Form.Label>
                    <input 
                        className="form-control" 
                        placeholder="Имя пользователя" 
                        value={username} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUserName(e.target.value) } } 
                    />

                    <Button type="submit" disabled={username.length <= 3} className="mt-2">Войти</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Auth;
