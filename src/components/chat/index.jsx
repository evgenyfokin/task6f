import {API_URL, getMessages} from "../../api/auth";
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import io from 'socket.io-client';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box, Button, Container} from "@mui/material";
import MessageForm from "./chatParts/MessageForm";
import {MessageList} from "./chatParts/MessageList";
let socket;

function Chat() {
    const [name, setName] = useState('');
    const location = useLocation();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await getMessages();
            const relatedMessages = response.data.filter(msg => msg.sender === name || msg.receiver === name);
            setMessages(relatedMessages);
        };
        fetchMessages();
        const params = new URLSearchParams(location.search);

        const userName = params.get('name');

        setName(userName);
        socket = io(API_URL);
        socket.emit('new_user', {name: userName});

        socket.on('new_message', async (message) => {
            await setMessages(prevMessages => [...prevMessages, message]);
            if (message.receiver === name) {
                toast(`New message from ${message.sender}: ${message.subject}`);
            }
        });

        return () => socket.disconnect();
    }, [location, name]);

    const handleSendMessage = (messageData) => {
        const completeMessageData = {
            sender: name,
            timestamp: new Date(),
            ...messageData
        };
        socket.emit('new_message', completeMessageData);
    };

    return (
        <>
            <ToastContainer/>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <h2>Welcome, {name}!</h2>
                <Link to="/">
                    <Button style={{borderRadius: 0}} color="secondary" variant="contained">Logout</Button>
                </Link>
            </Box>
            <MessageList sx={{width: "100%", flexGrow: 1}} messages={messages} name={name}/>
            <MessageForm name={name} onSendMessage={handleSendMessage}/>
        </>
    );
}

export default Chat;