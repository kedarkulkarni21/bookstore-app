import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    Paper
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Book, deleteBook, getBook } from '../services/api';

const BookDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) return;
            try {
                const data = await getBook(parseInt(id));
                setBook(data);
            } catch (error) {
                console.error('Error fetching book:', error);
                navigate('/books');
            }
        };

        fetchBook();
    }, [id, navigate]);

    if (!book) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    const handleDelete = async () => {
        if (!id) return;
        try {
            await deleteBook(parseInt(id));
            navigate('/books');
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 3, mb: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/books')}
                    sx={{ mb: 2 }}
                >
                    ← Back to Books
                </Button>
            </Box>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                            src={book.coverImageUrl || '/placeholder-book.jpg'}
                            alt={book.title}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>
                            {book.title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {book.author}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {book.description}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            ISBN: {book.isbn}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Price: ${book.price}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/books/edit/${id}`)}
                                sx={{ mr: 2 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default BookDetail; 