import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";

function MessageForm({name, onSendMessage}) {
    const [receiver, setReceiver] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage({receiver, subject, message});
        setReceiver('');
        setSubject('');
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" width="100%">
                <div style={{flexGrow: 1}}>
                    <TextField variant="standard" value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="Receiver" fullWidth/>
                    <TextField variant="standard" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" fullWidth/>
                    <TextField variant="standard" value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" fullWidth multiline/>
                </div>
                <Button style={{borderRadius: 0}} type="submit" color="primary" variant="contained">Send</Button>

            </Box>


        </form>
    );
}

export default MessageForm