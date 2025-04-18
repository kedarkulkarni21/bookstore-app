import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookEdit from './components/BookEdit';
import BookCreate from './components/BookCreate';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookCreate />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/edit/:id" element={<BookEdit />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
