import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Grid,
    Alert,
    Snackbar
} from '@mui/material';
import { Book, createBook } from '../services/api';

const BookCreate = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [book, setBook] = useState<Omit<Book, 'id'>>({
        title: '',
        author: '',
        isbn: '',
        description: '',
        price: 0,
        stockQuantity: 0,
        publishedDate: new Date().toISOString().split('T')[0],
        coverImageUrl: '',
        category: ''
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const newBook = {
                ...book,
                price: Number(book.price),
                stockQuantity: Number(book.stockQuantity)
            };
            
            const createdBook = await createBook(newBook);
            navigate(`/books/${createdBook.id}`);
        } catch (error) {
            console.error('Error creating book:', error);
            setError('Failed to create book. Please try again.');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBook(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Container>
            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Add New Book
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Author"
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="ISBN"
                                name="isbn"
                                value={book.isbn}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={book.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                type="number"
                                inputProps={{ step: "0.01", min: "0" }}
                                value={book.price}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Stock Quantity"
                                name="stockQuantity"
                                type="number"
                                inputProps={{ min: "0" }}
                                value={book.stockQuantity}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Published Date"
                                name="publishedDate"
                                type="date"
                                value={book.publishedDate}
                                onChange={handleChange}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Cover Image URL"
                                name="coverImageUrl"
                                value={book.coverImageUrl}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Category"
                                name="category"
                                value={book.category}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ mr: 2 }}
                                >
                                    Create Book
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/books')}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default BookCreate; 