import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Book, getBook, updateBook } from '../services/api';

const BookEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) return;
            try {
                const data = await getBook(parseInt(id));
                setBook(data);
            } catch (error) {
                console.error('Error fetching book:', error);
                setError('Error loading book details');
                navigate('/books');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!book || !id) return;

        try {
            const updatedBook: Book = {
                ...book,
                id: parseInt(id),
                price: Number(book.price),
                stockQuantity: Number(book.stockQuantity)
            };
            
            await updateBook(parseInt(id), updatedBook);
            navigate(`/books/${id}`);
        } catch (error) {
            console.error('Error updating book:', error);
            setError('Failed to update book. Please try again.');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBook(prev => {
            if (!prev) return null;
            
            // Handle numeric fields
            if (name === 'price' || name === 'stockQuantity') {
                return {
                    ...prev,
                    [name]: value // Keep as string in state, convert on submit
                };
            }
            
            return { ...prev, [name]: value };
        });
    };

    if (loading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    if (!book) {
        return (
            <Container>
                <Typography>Book not found</Typography>
            </Container>
        );
    }

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
                    Edit Book
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
                                value={book.publishedDate.split('T')[0]}
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
                                    Save Changes
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate(`/books/${id}`)}
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

export default BookEdit; 