using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bookstore.API.Models;
using Bookstore.API.Data;

namespace Bookstore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoritesRepository _favoritesRepository;
        private readonly IBookRepository _bookRepository;

        public FavoritesController(IFavoritesRepository favoritesRepository, IBookRepository bookRepository)
        {
            _favoritesRepository = favoritesRepository;
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetFavorites()
        {
            var favorites = await _favoritesRepository.GetAllFavoritesAsync();
            return Ok(favorites);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> AddFavorite(int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            await _favoritesRepository.AddFavoriteAsync(book);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFavorite(int id)
        {
            await _favoritesRepository.RemoveFavoriteAsync(id);
            return NoContent();
        }
    }
} 