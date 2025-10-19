import { Button, Grid, Stack, Container, Box, Typography } from '@mui/material'; 
import * as React from 'react'; 
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock'; 
import AppHeader from '../../components/AppHeader'; 
import './NotFound.css'; 

function AccessDenied() {
 
    const navigate = useNavigate(); 
    
    const handleGoHome = () => {
        navigate('/dashboard');
    };
    
    return (
        <Box sx={{ flexGrow: 1, textAlign: 'left', paddingTop: 0 }}> 
            <AppHeader title="Alpha Livraria" />
            <Box className="access-denied-page" sx={{ paddingTop: '64px' }}> 
                <Container maxWidth="lg" sx={{ mb: 4 }}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
           
                        <Grid item xs={12} md={8}> 
                            <Stack spacing={4} alignItems="center"> 
                                
                                {/* ÍCONE: Estilizado via CSS */}
                                <LockIcon 
                                    className="error-icon"
                                    sx={{ fontSize: 80 }} 
                                /> 
                                <Typography 
                                    variant="h3" 
                                    component="h1" 
                                    gutterBottom
                                    className="error-title"
                                >
                                    Acesso Negado
                                </Typography>
                                
                                <Typography 
                                    color='textSecondary' 
                                    variant="h6" 
                                    align="center" 
                                    sx={{ maxWidth: '600px' }}
                                >
                                    Você não tem permissão para visualizar esta página.Por favor, faça login ou entre em contato com o suporte.
                                </Typography>
                                
                                {/* BOTÃO: Estilizado via CSS */}
                                <Button 
                                    variant="contained" 
                                    size="large" 
                                    className="home-button"
                                    onClick={handleGoHome} 
                                    sx={{ mt: 3 }} 
                                >
                                    Voltar para o Início 
                                </Button>
                            </Stack>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default AccessDenied;