import { Button, TextField, Grid, Stack, Container, Typography, Box } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader'; 

function Home() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1, textAlign: 'left', paddingTop:0, }}> 

            <AppHeader />

            <Box sx={{ paddingTop: '64px' }}> 
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Stack spacing={2} alignItems="center"> 
                                <Typography color='black' variant="h4" component="h1" gutterBottom>
                                    Bem-vindo à Alpha Livraria
                                </Typography>
                                <TextField
                                    id="standard-basic"
                                    label="Digite o que procura"
                                    variant="standard"
                                    fullWidth
                                />
                                <Button 
                                    variant="contained" 
                                    size="large" 
                                    sx={{ mt: 2, background: '#6e7964ff' }}
                                    onClick={() => navigate('/novidades')} 
                                >
                                    Explorar Livros
                                </Button>
                            </Stack>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
export default Home;