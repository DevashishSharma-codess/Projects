import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CounterComponent } from './redux/CounterComponent';
import { ItemsComponent } from './tanstack/ItemsComponent';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div style={{ maxWidth: '500px', margin: '30px auto', fontFamily: 'sans-serif' }}>
          <CounterComponent />
          <ItemsComponent />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}
