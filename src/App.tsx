import React, { useState } from 'react';
import { StrategicReserve } from './pages/StrategicReserve';
import { UserWallet } from './pages/UserWallet';
import { ThemeProvider } from './contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Wallet } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [currentView, setCurrentView] = useState<'reserve' | 'user'>('reserve');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center">
                  <Wallet className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                    MXM Digital Asset Portfolio Manager
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentView('reserve')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'reserve'
                          ? 'bg-primary-600 dark:bg-primary-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      Strategic Reserve
                    </button>
                    <button
                      onClick={() => setCurrentView('user')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'user'
                          ? 'bg-primary-600 dark:bg-primary-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      Monitor Any Wallet
                    </button>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentView === 'reserve' ? (
              <StrategicReserve />
            ) : (
              <UserWallet />
            )}
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;