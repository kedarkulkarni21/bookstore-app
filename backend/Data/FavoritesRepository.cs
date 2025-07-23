using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public class FavoritesRepository : IFavoritesRepository
    {
        private readonly string _jsonFilePath;
        private List<Book> _favorites;

        public FavoritesRepository()
        {
            _jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "favorites.json");
            LoadFavoritesFromJson();
        }

        private void LoadFavoritesFromJson()
        {
            if (!File.Exists(_jsonFilePath))
            {
                _favorites = new List<Book>();
                return;
            }
            var jsonString = File.ReadAllText(_jsonFilePath);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                ReferenceHandler = ReferenceHandler.IgnoreCycles
            };
            var data = JsonSerializer.Deserialize<FavoritesData>(jsonString, options);
            _favorites = data?.Favorites ?? new List<Book>();
        }

        private void SaveFavoritesToJson()
        {
            var data = new FavoritesData { Favorites = _favorites };
            var jsonString = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                WriteIndented = true,
                ReferenceHandler = ReferenceHandler.IgnoreCycles
            });
            File.WriteAllText(_jsonFilePath, jsonString);
        }

        public Task<IEnumerable<Book>> GetAllFavoritesAsync()
        {
            return Task.FromResult(_favorites.AsEnumerable());
        }

        public Task AddFavoriteAsync(Book book)
        {
            if (!_favorites.Any(b => b.Id == book.Id))
            {
                _favorites.Add(book);
                SaveFavoritesToJson();
            }
            return Task.CompletedTask;
        }

        public Task RemoveFavoriteAsync(int id)
        {
            var book = _favorites.FirstOrDefault(b => b.Id == id);
            if (book != null)
            {
                _favorites.Remove(book);
                SaveFavoritesToJson();
            }
            return Task.CompletedTask;
        }
    }

    public class FavoritesData
    {
        [JsonPropertyName("favorites")]
        public List<Book> Favorites { get; set; } = new();
    }
} 