import React from 'react';
import { Card, CardContent, CardMedia, Button, CardActions, Typography, Grid } from '@mui/material';
import './BookCard.css'; // importa o CSS externo

function BookCard({ book, onViewDetails }) {
    return (
        <Grid item key={book.id} xs={12} sm={6} md={3}>
            <Card className="book-card">
                <CardMedia
                    component="img"
                    height="200"
                    image={book.image}
                    alt={book.title}
                    className="book-image"
                />

                <CardContent className="book-content">
                    <Typography variant="subtitle1" component="h2" className="book-title">
                        {book.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" noWrap>
                        {book.author}
                    </Typography>
                </CardContent>

                <CardActions className="book-actions">
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => onViewDetails(book.id)}
                        className="book-button"
                    >
                        VER DETALHES
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default BookCard;
