'use client';

import { useState, useEffect } from 'react';

interface State {
  _id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

interface StatesFormProps {  
  state: State | null;
  onSubmit: (data: { name: string; code: string }) => void;
  onCancel: () => void;
}

export default function StatesForm({ state, onSubmit, onCancel }: StatesFormProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<{ name?: string; code?: string }>({});

  useEffect(() => {
    if (state) {
      setName(state.name);
      setCode(state.code);
    } else {
      setName('');
      setCode('');
    }
    setErrors({});
  }, [state]);

  const validateForm = (): boolean => {
    const newErrors: { name?: string; code?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'State name is required';
    }
    if (!code.trim()) {
      newErrors.code = 'State code is required';
    }
    if (code.trim().length > 5) {
      newErrors.code = 'State code must be 5 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        code: code.trim().toUpperCase(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {state ? 'Edit State' : 'Create New State'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter state name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State Code
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.code ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter state code (e.g., CA, NY)"
          maxLength={5}
        />
        {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {state ? 'Update State' : 'Create State'}
        </button>
      </div>
    </form>
  );
}
