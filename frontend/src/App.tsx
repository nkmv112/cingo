import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Assessment from './pages/Assessment';
import ComingSoon from './pages/ComingSoon';
import Console from './pages/Console';
import Leaderboard from './pages/Leaderboard';
import Quests from './pages/Quests';
import QuestSolver from './pages/QuestSolver';
import Settings from './pages/Settings';
import { useAuth } from './auth/AuthContext';
import AmbientBackground from './components/AmbientBackground';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { username, loading } = useAuth();
  
  // Show nothing while checking local storage / Firebase auth state
  if (loading) return <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }} />;

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Wrapper to force remount on path change
const LessonWrapper = () => {
  const location = useLocation();
  return <Lesson key={location.pathname} />;
};

// Wrapper to force remount when switching quests
const QuestSolverWrapper = () => {
  const location = useLocation();
  return <QuestSolver key={location.pathname} />;
};

function App() {
  return (
    <>
      {/* Silk fabric background — adapts to light/dark theme via CSS vars */}
      <AmbientBackground />

      <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard - Redirects to Landing if not logged in */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Lesson Route */}
          <Route 
            path="/lesson/:id" 
            element={
              <ProtectedRoute>
                <LessonWrapper />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Quests & Challenges Routes */}
          <Route path="/quests" element={<ProtectedRoute><Quests /></ProtectedRoute>} />
          <Route path="/quests/:id" element={<ProtectedRoute><QuestSolverWrapper /></ProtectedRoute>} />
          
          {/* Protected Placeholder Routes */}
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ComingSoon title="User Profile" /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/console" element={<ProtectedRoute><Console /></ProtectedRoute>} />
          
          {/* Catch all fallback */}
          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
