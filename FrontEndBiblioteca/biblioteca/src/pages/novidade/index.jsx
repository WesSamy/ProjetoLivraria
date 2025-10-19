import { Grid, Stack, Container, Card, CardContent, CardMedia, Button, CardActions, Typography, Box, IconButton } from '@mui/material';
import * as React from 'react';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader'; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// Ajuste o caminho conforme onde você salvou o arquivo
import bestSellersData from '../../data/bestSellers.json';
// NOVO: Importa o componente de Card refatorado
import BookCard from '../../components/BookCards'; // Ajuste o caminho se BookCard.jsx estiver em outro local

// Configuração da Paginação (4 cards por página)
const CARDS_PER_PAGE = 4;

function NewsAndUpdates() {
    
    // Carrega os dados do JSON
    const newBooks = bestSellersData; 

// ESTADO: Controla a página atual
    const [currentPage, setCurrentPage] = useState(0);

// --- Lógica de Paginação ---
    const totalPages = Math.ceil(newBooks.length / CARDS_PER_PAGE); 

const startIndex = currentPage * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE; 

// Fatia de cards a serem exibidos na página atual (memoizada para performance)
    const cardsOnCurrentPage = useMemo(() => {
        return newBooks.slice(startIndex, endIndex); 
    }, [newBooks, startIndex, endIndex]);

// Funções de navegação
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1); 
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1); 
        }
    };
    
    // Função que seria usada para navegação real (simulada com console.log)
    const handleViewDetails = (bookId) => {
        console.log(`Navegar para detalhes do livro: ${bookId}`);
    };

    return (
        <Box sx={{ flexGrow: 1, textAlign: 'left', paddingTop:0, }}> 
            
            <AppHeader /> 
            
            {/* CONTEÚDO PRINCIPAL (Novidades) */}
            <Box sx={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#F4F1E1'}}> 
        
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> 
                    
                    {/* Título e Contador de Páginas */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}> 
         
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom 
                            sx={{ color: '#333', flexGrow: 1, textAlign: 'center' }} 
                        >
                            Últimos Lançamentos | Best Sellers 
                        </Typography>
                        
                        {/* Contador de Páginas Discreto */}
                        <Typography 
                            variant="h6" 
                            color="text.secondary" 
                            sx={{ minWidth: '100px', textAlign: 'right', mr: 2 }} 
                        >
                            Pág. {currentPage + 1} de {totalPages} 
                        </Typography>
                    </Stack>
                    
                    {/* CONTAINER DOS CARDS (GRID) */}
       
                   
                        {/* Cards da Página Atual (4 Cards por linha no Desktop) */}
                        <Grid item xs={12} md={10}> 
                            <Grid container spacing={4} justifyContent="center">
  
                                {cardsOnCurrentPage.map((book) => (
                                    <BookCard 
                                        key={book.id} 
                                        book={book} 
                                        onViewDetails={handleViewDetails} 
                                    />
                                ))}
                                
                            </Grid>
                        </Grid>
                                
                    <Stack 
                        direction="row" 
                        justifyContent="center" 
                        spacing={3} 
                        sx={{ mt: 5 }} 
                    >
                        <Button 
                            onClick={handlePreviousPage} 
                            disabled={currentPage === 0} 
                            startIcon={<ArrowBackIosIcon />}
                            sx={{ color: '#4f5549ff', fontWeight: 'bold' }} 
                        >
                            Página Anterior 
                        </Button>
       
                        <Button 
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1} 
                            endIcon={<ArrowForwardIosIcon />}
                            sx={{ color: '#4f5549ff', fontWeight: 'bold' }} 
                        >
                            Próxima Página 
                        </Button>
                    </Stack>
                    
                </Container>
   
            </Box>
        </Box>
    );
} 

export default NewsAndUpdates;