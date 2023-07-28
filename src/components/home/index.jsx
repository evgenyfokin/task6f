import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField, Grid, Container} from "@mui/material";

function Home() {
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (name) {
            navigate(`chat?name=${name}`)
        }
    }

    return (
        <Container>
            <Grid container direction="column" justifyContent="center" alignItems="center" style={{minHeight: '100vh'}}>
                <Grid item xs={12} sm={8} md={6}>
                    <TextField
                        value={name}
                        onChange={event => setName(event.target.value)}
                        label="Your Name"
                        variant="standard"
                        fullWidth
                        style={{marginBottom: '20px'}}
                    />
                    <Button
                        style={{borderRadius: 0}}
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        fullWidth>Enter chat
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default Home
