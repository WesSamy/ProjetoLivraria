import { Grid, Stack, Container, Divider, List, ListItem, ListItemButton, ListItemText, Drawer, Menu, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

// --- COMPONENTES ESTILIZADOS (Movidos para cá para isolamento) ---
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
// ------------------------------------------------------------------

function AppHeader() {
    const navigate = useNavigate();

    // ESTADOS LOCAIS PARA O HEADER
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [anchorElSettings, setAnchorElSettings] = React.useState(null);
    const openSettings = Boolean(anchorElSettings);
    const [openLogoutModal, setOpenLogoutModal] = React.useState(false); 

    // --- Funções de Controle ---
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    const handleMenuSettings = (event) => {
        setAnchorElSettings(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorElSettings(null);
    };

    const handleUpdateData = () => {
        handleCloseSettings();
        navigate('/config');
    };
    
    const handleOpenLogoutModal = () => {
        setOpenLogoutModal(true);
        setOpenDrawer(false); 
    };

    const handleCloseLogoutModal = () => {
        setOpenLogoutModal(false);
    };

    const handleConfirmLogout = () => {
        setOpenLogoutModal(false);
        navigate('/login'); 
    };

    // CONTEÚDO DO DRAWER (MENU LATERAL) - Navegação Centralizada
    const DrawerList = (
        <Box 
            sx={{ width: 250, }} 
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Início', 'Novidades', 'Melhores Avaliados',].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton 
                             onClick={() => {
                                const path = text.toLowerCase().replace(' ', '');
                                // Mapeamento de Rotas
                                const route = text === 'Início' ? '/dashboard' : `/${path}`;
                                navigate(route);
                            }}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider /> 
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleOpenLogoutModal}> 
                        <ListItemText primary="Sair" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <React.Fragment>
            {/* 1. APP BAR (Cabeçalho Fixo) */}
            <AppBar 
                position="fixed" 
                sx={{ backgroundColor: '#6e7964ff' }} 
            >
                <Toolbar>
                    {/* Ícone de Menu */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit" 
                        aria-label="open drawer"
                        sx={{ mr: 4, color: 'white' }} 
                        onClick={toggleDrawer(true)} 
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        color="white"
                        component="div"
                        sx={{ flexGrow: 1, display: {} }}
                    >
                        Alpha Livraria
                    </Typography>
                    
                    {/* Componente de Busca Reutilizado */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: 'white' }} /> 
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar…"
                            sx={{ color: 'white' }} 
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    
                    {/* Icone de Configurações */}
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account settings"
                        aria-controls={openSettings ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={handleMenuSettings}
                        color="inherit"
                        sx={{ ml: 1, color: 'white' }} 
                    >
                        <SettingsIcon />
                    </IconButton>
                    
                </Toolbar>
            </AppBar>

            {/* 2. DRAWER (Menu Lateral Esquerdo) */}
            <Drawer
                sx={{mt:'40px'}}
                anchor="left" 
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>

            {/* 3. MENU DE CONFIGURAÇÕES (Dropdown) */}
            <Menu
                id="menu-appbar"
                anchorEl={anchorElSettings}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openSettings}
                onClose={handleCloseSettings}
            >
                <MenuItem onClick={handleUpdateData}>Atualizar dados do usuário</MenuItem>
            </Menu>
            
            {/* 4. MODAL DE CONFIRMAÇÃO DE SAÍDA */}
            <Dialog
                open={openLogoutModal}
                onClose={handleCloseLogoutModal}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">
                    {"Confirmação de Saída"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="logout-dialog-description">
                        Tem certeza de que deseja sair do sistema? Você será redirecionado para a tela de login.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseLogoutModal} 
                        sx={{ color: '#6e7964ff' }} 
                    >
                        Não, Ficar
                    </Button>
                    <Button 
                        onClick={handleConfirmLogout} 
                        variant="contained" 
                        sx={{ backgroundColor: '#6e7964ff', '&:hover': { backgroundColor: '#5c6353ff' } }} 
                        autoFocus
                    >
                        Sim, Sair
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AppHeader;