import { createContext, useContext, useState, ReactNode } from 'react';
import { Issue } from '../types';
import { mockIssues } from '../data/mockData';

interface AppContextType {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addIssue = (issue: Issue) => {
    setIssues(prev => [issue, ...prev]);
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    setIssues(prev => prev.map(issue =>
      issue.id === id ? { ...issue, ...updates } : issue
    ));
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AppContext.Provider value={{ issues, addIssue, updateIssue, isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
