import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const LibraryManagement = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getAllBooks`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
        setError(''); // Clear any previous errors
      } else {
        // Log the error, but don't show it in the UI
        console.log('Failed to fetch books');
      }
    } catch (err) {
      // Log instead of setting the error in the UI for first load
      console.log('Error fetching books:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Add new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/addBook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        setNewBook({ title: '', author: '' });
        fetchBooks();
      } else {
        throw new Error('Failed to add book');
      }
    } catch (err) {
      setError('Error adding book: ' + err.message);
    }
  };

  // Update book
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateBookById/${editingBook.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingBook),
      });
      if (response.ok) {
        setEditingBook(null);
        fetchBooks();
      } else {
        throw new Error('Failed to update book');
      }
    } catch (err) {
      setError('Error updating book: ' + err.message);
    }
  };

  // Delete book
  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/deleteBookById/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);

        if (updatedBooks.length === 0) {
          setError(''); // Clear error if no books remain
        }
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (err) {
      setError('Error deleting book: ' + err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Library Management System</h2>

          {/* Add/Edit Book Form */}
          <form onSubmit={editingBook ? handleUpdateBook : handleAddBook} className="space-y-4 mb-6">
            <div className="flex gap-4">
              <input
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Book Title"
                value={editingBook ? editingBook.title : newBook.title}
                onChange={(e) =>
                  editingBook
                    ? setEditingBook({ ...editingBook, title: e.target.value })
                    : setNewBook({ ...newBook, title: e.target.value })
                }
                required
              />
              <input
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Author Name"
                value={editingBook ? editingBook.author : newBook.author}
                onChange={(e) =>
                  editingBook
                    ? setEditingBook({ ...editingBook, author: e.target.value })
                    : setNewBook({ ...newBook, author: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              >
                {editingBook ? (
                  <>
                    <Pencil className="w-4 h-4 mr-2" />
                    Update Book
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Book
                  </>
                )}
              </button>
              {editingBook && (
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setEditingBook(null)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Error Message */}
          {error && error !== 'Failed to fetch books' && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Books Table */}
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : books.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{book.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            onClick={() => setEditingBook(book)}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => handleDeleteBook(book.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4">No books available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryManagement;
