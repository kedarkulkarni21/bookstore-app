import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Book, getBooks } from '../services/api';

interface BookListProps {}

const BookList: React.FC<BookListProps> = () => {
    const [books, setBooks] = React.useState<Book[]>([]);

    React.useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Books
                </Typography>
                <Button
                    component={Link}
                    to="/books/new"
                    variant="contained"
                    color="primary"
                >
                    Add New Book
                </Button>
            </Box>
            <Grid container spacing={3}>
                {books.map((book: Book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: 400,
                                    objectFit: 'cover'
                                }}
                                image={book.coverImageUrl || 'https://via.placeholder.com/300x400'}
                                alt={book.title}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="h2" gutterBottom noWrap>
                                    {book.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    by {book.author}
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    ${book.price.toFixed(2)}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={`/books/${book.id}`}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BookList; 