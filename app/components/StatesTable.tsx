'use client';

import { format } from 'date-fns';

interface State {
  _id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

interface StatesTableProps {
  states: State[];
  onEdit: (state: State) => void;
  onDelete: (id: string) => void;
}

export default function StatesTable({ states, onEdit, onDelete }: StatesTableProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">State Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Code</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created At</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Updated At</th>
            {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={state._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-900 font-medium">{state.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                  {state.code}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(state.createdAt)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(state.updatedAt)}
              </td>
              {/* <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(state)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(state._id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-xs font-medium"
                  >
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
