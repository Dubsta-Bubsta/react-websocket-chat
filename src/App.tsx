import React, { useEffect, useState } from 'react';
import Chat from './components/Chat';
import Auth from './components/Auth';


const App = () => {
    const [username, setUserName] = useState(localStorage.getItem('username') || '')

    if (!username) {
        return <Auth setUserName={setUserName} />
    }

    return <Chat username={username} />
}

export default App;
