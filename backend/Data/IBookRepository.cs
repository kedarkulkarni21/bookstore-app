using System.Collections.Generic;
using System.Threading.Tasks;
using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllBooksAsync();
        Task<Book?> GetBookByIdAsync(int id);
        Task<Book?> GetBookByISBNAsync(string isbn);
        Task<Book> AddBookAsync(Book book);
        Task<Book> UpdateBookAsync(Book book);
        Task DeleteBookAsync(int id);
    }
} 