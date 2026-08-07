import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function ItemsComponent() {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  // 1. GET Request via TanStack useQuery
  const { data: items, isLoading, isError } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/items');
      return res.json();
    }
  });

  // 2. POST Request via TanStack useMutation
  const mutation = useMutation({
    mutationFn: async (newItemText) => {
      const res = await fetch('http://localhost:3001/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newItemText })
      });
      return res.json();
    },
    onSuccess: () => {
      // Refresh items list after POST succeeds
      queryClient.invalidateQueries({ queryKey: ['items'] });
      setText('');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      mutation.mutate(text);
    }
  };

  return (
    <div style={{ border: '1px solid #ff4154', padding: '15px', borderRadius: '8px' }}>
      <h2 style={{ color: '#ff4154', marginTop: 0 }}>TanStack Query (GET & POST)</h2>

      {/* POST Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Enter new item..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: '6px', flex: 1 }}
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Posting...' : 'POST Item'}
        </button>
      </form>

      {/* GET Items List */}
      <h3>Item List from Server:</h3>
      {isLoading && <p>Loading data...</p>}
      {isError && <p style={{ color: 'red' }}>Error loading data from http://localhost:3001</p>}

      <ul>
        {items?.map((item, index) => (
          <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
