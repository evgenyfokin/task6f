import { Box, Grid, List, ListItem, Typography, useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import React from "react";

export const MessageItem = ({ message, name }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ListItem sx={{ width: "100%" }}>
            <Grid container direction="column">
                <Typography
                    variant={isSmallScreen ? "h6" : "h5"}
                    color={message.sender === name ? "primary" : "secondary"}
                >
                    {message.sender === name ? `To: ${message.receiver}` : `From: ${message.sender}`}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Subject: {message.subject}
                </Typography>
                <Typography variant={isSmallScreen ? "body2" : "body1"} style={{ wordBreak: 'break-word' }}>
                    Message: {message.message}
                </Typography>
            </Grid>
        </ListItem>
    );
};

export const MessageList = ({ messages, name }) => {
    return (
        <List sx={{ overflow: "auto", flexGrow: 1 }}>
            {messages.map((message, index) => (
                <MessageItem key={index} message={message} name={name} />
            ))}
        </List>
    );
};
