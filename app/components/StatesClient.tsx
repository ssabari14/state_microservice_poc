'use client';

import { useState, useEffect } from 'react';
import StatesTable from './StatesTable';
import StatesForm from './StatesForm';
import SearchBar from './SearchBar';

interface State {
  _id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: State[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export default function StatesClient() {
  const [states, setStates] = useState<State[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingState, setEditingState] = useState<State | null>(null);

  const fetchStates = async (currentPage: number, searchQuery: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });
      if (searchQuery) {
        params.append('q', searchQuery);
      }

      const response = await fetch(`/api/states`);
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setStates(data.data);
        setTotal(data.meta.total);
      }
    } catch (error) {
      console.error('Failed to fetch states:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchStates(1, search);
  }, [search]);

  useEffect(() => {
    fetchStates(page, search);
  }, [page]);

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleAddNew = () => {
    setEditingState(null);
    setShowForm(true);
  };

  const handleEdit = (state: State) => {
    setEditingState(state);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this state?')) {
      try {
        const response = await fetch(`/api/states/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchStates(page, search);
        }
      } catch (error) {
        console.error('Failed to delete state:', error);
      }
    }
  };

  const handleFormSubmit = async (formData: { name: string; code: string }) => {
    try {
      if (editingState) {
        // Update existing state
        const response = await fetch(`/api/states/${editingState._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setShowForm(false);
          fetchStates(page, search);
        }
      } else {
        // Create new state
        const response = await fetch('/api/states', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setShowForm(false);
          setPage(1);
          fetchStates(1, search);
        }
      }
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingState(null);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">States Service</h1>
          <p className="text-gray-600">Manage your states database</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* <SearchBar onSearch={handleSearch} /> */}
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add New State
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <StatesForm
              state={editingState}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
            />
          </div>
        )}

        {/* States Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : states.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No states found</div>
          ) : (
            <>
              <StatesTable
                states={states}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
