using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Bookstore.API.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;

namespace Bookstore.API.Data
{
    public class BookRepository : IBookRepository
    {
        private readonly BookstoreContext _context;
        private readonly string _jsonFilePath;
        private readonly ILogger<BookRepository> _logger;

        public BookRepository(BookstoreContext context, ILogger<BookRepository> logger)
        {
            _context = context;
            _logger = logger;
            _jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "books.json");
            LoadBooksFromJson();
        }

        private void LoadBooksFromJson()
        {
            try
            {
                _logger.LogInformation($"Attempting to load books from {_jsonFilePath}");
                
                if (!File.Exists(_jsonFilePath))
                {
                    _logger.LogError($"books.json file not found at {_jsonFilePath}");
                    return;
                }

                var jsonString = File.ReadAllText(_jsonFilePath);
                _logger.LogInformation($"Read JSON content: {jsonString}");
                
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    ReferenceHandler = ReferenceHandler.IgnoreCycles
                };
                
                var data = JsonSerializer.Deserialize<BookData>(jsonString, options);
                
                if (data?.Books == null || !data.Books.Any())
                {
                    _logger.LogWarning("No books found in JSON file or deserialization failed");
                    return;
                }

                // Clear existing books
                _context.Books.RemoveRange(_context.Books);
                
                // Add books from JSON
                _context.Books.AddRange(data.Books);
                _context.SaveChanges();
                
                _logger.LogInformation($"Successfully loaded {data.Books.Count} books from JSON");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading books from JSON file");
                throw;
            }
        }

        private void SaveBooksToJson()
        {
            var books = _context.Books.ToList();
            var data = new BookData { Books = books };
            var jsonString = JsonSerializer.Serialize(data, new JsonSerializerOptions 
            { 
                WriteIndented = true,
                ReferenceHandler = ReferenceHandler.IgnoreCycles
            });
            File.WriteAllText(_jsonFilePath, jsonString);
        }

        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book?> GetBookByIdAsync(int id)
        {
            return await _context.Books.FindAsync(id);
        }

        public async Task<Book?> GetBookByISBNAsync(string isbn)
        {
            return await _context.Books.FirstOrDefaultAsync(b => b.ISBN == isbn);
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            SaveBooksToJson();
            return book;
        }

        public async Task<Book> UpdateBookAsync(Book book)
        {
            var existingBook = await _context.Books.FindAsync(book.Id);
            if (existingBook == null)
            {
                throw new KeyNotFoundException($"Book with ID {book.Id} not found");
            }

            // Update all properties
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.ISBN = book.ISBN;
            existingBook.Description = book.Description;
            existingBook.Price = book.Price;
            existingBook.StockQuantity = book.StockQuantity;
            existingBook.PublishedDate = book.PublishedDate;
            existingBook.CoverImageUrl = book.CoverImageUrl;
            existingBook.Category = book.Category;

            // Mark as modified and save
            _context.Entry(existingBook).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            SaveBooksToJson();
            
            return existingBook;
        }

        public async Task DeleteBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book != null)
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
                SaveBooksToJson();
            }
        }
    }

    public class BookData
    {
        [JsonPropertyName("books")]
        public List<Book> Books { get; set; } = new();
    }
} 