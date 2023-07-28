import {API_URL, getMessages} from "../../api/auth";
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import io from 'socket.io-client';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box, Button, Container, Grid} from "@mui/material";
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
            <Grid container direction="column" style={{height: '100vh'}}>
                <Grid item>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <h2>Welcome, {name}!</h2>
                        <Link to="/">
                            <Button style={{borderRadius: 0}} color="secondary" variant="contained">Logout</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item style={{overflow: 'auto', flexGrow: 1}}>
                    <MessageList messages={messages} name={name}/>
                </Grid>
                <Grid item>
                    <MessageForm name={name} onSendMessage={handleSendMessage}/>
                </Grid>
            </Grid>
        </>
    );
}

export default Chat;