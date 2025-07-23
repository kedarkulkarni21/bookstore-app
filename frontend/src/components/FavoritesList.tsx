import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Book, getFavorites, removeFavorite } from '../services/api';

const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await removeFavorite(id);
      fetchFavorites();
    } catch (error) {
      alert('Failed to remove from favorites.');
    }
  };

  if (loading) {
    return <Container><Typography>Loading...</Typography></Container>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Favorites
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {favorites.length === 0 ? (
          <Typography>No favorites yet.</Typography>
        ) : favorites.map((book: Book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ height: 400, objectFit: 'cover' }}
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
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => handleRemove(book.id)}
                >
                  Remove from Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesList; 