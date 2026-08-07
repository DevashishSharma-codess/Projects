import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store';

export function CounterComponent() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ border: '1px solid #764abc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2 style={{ color: '#764abc', marginTop: 0 }}>Redux State Management</h2>
      <p>Current Count: <strong>{count}</strong></p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => dispatch(increment())}>Increment (+)</button>
        <button onClick={() => dispatch(decrement())}>Decrement (-)</button>
      </div>
    </div>
  );
}
