using System.Collections.Generic;
using System.Threading.Tasks;
using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public interface IFavoritesRepository
    {
        Task<IEnumerable<Book>> GetAllFavoritesAsync();
        Task AddFavoriteAsync(Book book);
        Task RemoveFavoriteAsync(int id);
    }
} 