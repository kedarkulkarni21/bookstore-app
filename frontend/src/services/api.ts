import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5238/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    description: string;
    price: number;
    stockQuantity: number;
    publishedDate: string;
    coverImageUrl: string;
    category: string;
}

export const getBooks = async (): Promise<Book[]> => {
    const response = await api.get<Book[]>('/books');
    return response.data;
};

export const getBook = async (id: number): Promise<Book> => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
    const response = await api.post<Book>('/books', book);
    return response.data;
};

export const updateBook = async (id: number, book: Book): Promise<void> => {
    await api.put(`/books/${id}`, book);
};

export const deleteBook = async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
}; 