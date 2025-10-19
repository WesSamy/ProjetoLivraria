import { Button, TextField, Grid, Stack, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Avatar, Box, Typography, IconButton } from '@mui/material';
import * as React from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera'; 
import AppHeader from '../../components/AppHeader'; // AJUSTE O CAMINHO
import './Config.css'; // AJUSTE O CAMINHO CONFORME O SEU PROJETO
function Configuracoes() {
    
    // Estado local para o formulário
    const [formData, setFormData] = React.useState({
        photo: null,
        name: 'Nome do Usuário Atual',
        email: 'usuario@exemplo.com',
        password: '',
        userType: 'comum'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ 
                ...prev, 
                photo: URL.createObjectURL(e.target.files[0]) 
            }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados a serem enviados:", formData);
        alert('Dados atualizados com sucesso!');
    };
    return (
        <Box sx={{ flexGrow: 1, textAlign: 'left' }}> 
            <AppHeader title="Alpha Livraria - Meu Perfil" />
            <Box className="configuracoes-page" sx={{ paddingTop: '64px' }}> 
                <Container maxWidth="sm" sx={{ mt: 2}}>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={10} md={8}> 
                            <Box className="form-container">
                                <Typography 
                                    variant="h4" 
                                    component="h2" 
                                    align="center" 
                                    className="form-title"
                                    gutterBottom 
                                >
                                    Atualizar Dados do Usuário
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={3} alignItems="center"> 
                                        <Stack direction="column" alignItems="center" spacing={1} sx={{ width: '100%' }}>
                                            <Avatar 
                                                alt="Foto do Usuário" 
                                                className="user-avatar"
                                                src={formData.photo || 'caminho/para/foto/padrao.png'} 
                                                sx={{ width: 100, height: 100 }} 
                                            />
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="icon-button-file"
                                                type="file"
                                                onChange={handlePhotoChange}
                                                name="photo"
                                            />
                                            <label htmlFor="icon-button-file">
                                                <IconButton 
                                                    className="upload-button"
                                                    aria-label="upload picture" 
                                                    component="span"
                                                >
                                                    <PhotoCamera />
                                                </IconButton>
                                            </label>
                                        </Stack>

                                        <TextField
                                            name="name" 
                                            label="Nome" 
                                            variant="outlined"
                                            fullWidth 
                                            value={formData.name} 
                                            onChange={handleChange}
                                            required
                                        />
                                        <TextField
                                            name="email" 
                                            label="Email" 
                                            type="email"
                                            variant="outlined"
                                            fullWidth 
                                            value={formData.email} 
                                            onChange={handleChange}
                                            required
                                        />
                                        <TextField
                                            name="password" 
                                            label="Nova Senha" 
                                            type="password"
                                            variant="outlined"
                                            fullWidth 
                                            value={formData.password} 
                                            onChange={handleChange}
                                            helperText="Deixe em branco para não alterar a senha."
                                        />

                                        <FormControl component="fieldset" fullWidth sx={{mt: 1}}>
                                            <FormLabel component="legend">Tipo de Usuário</FormLabel>
                                            <RadioGroup
                                                row
                                                name="userType" 
                                                value={formData.userType} 
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel 
                                                    value="admin" 
                                                    control={<Radio size="small" />} 
                                                    label="Administrador" 
                                                />
                                                <FormControlLabel 
                                                    value="comum" 
                                                    control={<Radio size="small" />} 
                                                    label="Comum" 
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        <Button 
                                            type="submit" 
                                            variant="contained" 
                                            size="large" 
                                            fullWidth
                                            className="submit-button"
                                        >
                                            Salvar Alterações
                                        </Button>
                                    </Stack>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
export default Configuracoes;