import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthProvider';
import { AuthRedirect } from './components/AuthRedirect';

// Pages existantes
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import StudentDashboard from './pages/StudentDashboard';
import Support from './pages/Support';
import NotFound from './pages/NotFound';
import SearchUniversity from './pages/SearchUniversity';
import CreateApplication from './pages/CreateApplication';
import TrackApplications from './pages/TrackApplications';
import OnlineAssistance from './pages/OnlineAssistance';
import OrientationGuide from './pages/OrientationGuide';
import Blog from './pages/Blog';
import GDPR from './pages/GDPR';

// Nouvelles pages
import Profile from './pages/Profile';
import Applications from './pages/Applications';
import Calendar from './pages/Calendar';
import EstablishmentDashboard from './pages/EstablishmentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudyResourcesPage from './pages/StudyResourcesPage';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import TestSupabase from './pages/TestSupabase';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AuthRedirect />
          <Routes>
          {/* Pages sans sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Pages publiques */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/universities" element={<Layout><Universities /></Layout>} />
          <Route path="/university/:id" element={<Layout><UniversityDetail /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/orientation-guide" element={<Layout><OrientationGuide /></Layout>} />
          <Route path="/gdpr" element={<Layout><GDPR /></Layout>} />
          <Route path="/test-supabase" element={<Layout><TestSupabase /></Layout>} />
          
          {/* Pages pour lycéens */}
          <Route path="/profile" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><Profile /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/applications" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><Applications /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><Calendar /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><StudentDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/search-university" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><SearchUniversity /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/create-application" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><CreateApplication /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/track-applications" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><TrackApplications /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/study-resources" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><StudyResourcesPage /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><Messages /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute allowedUserTypes={['lyceen']}>
              <Layout><Notifications /></Layout>
            </ProtectedRoute>
          } />
          
          {/* Pages communes authentifiées */}
          <Route path="/support" element={
            <ProtectedRoute>
              <Layout><Support /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/online-assistance" element={
            <ProtectedRoute>
              <Layout><OnlineAssistance /></Layout>
            </ProtectedRoute>
          } />
          
          {/* Pages établissement */}
          <Route path="/establishment-dashboard" element={
            <ProtectedRoute allowedUserTypes={['universite']}>
              <Layout><EstablishmentDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/manage-formations" element={
            <ProtectedRoute allowedUserTypes={['universite']}>
              <Layout><EstablishmentDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/received-applications" element={
            <ProtectedRoute allowedUserTypes={['universite']}>
              <Layout><EstablishmentDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/evaluations" element={
            <ProtectedRoute allowedUserTypes={['universite']}>
              <Layout><EstablishmentDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/statistics" element={
            <ProtectedRoute allowedUserTypes={['universite']}>
              <Layout><EstablishmentDashboard /></Layout>
            </ProtectedRoute>
          } />
          
          {/* Pages admin - Note: besoin d'un type admin dans le système */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/user-management" element={
            <ProtectedRoute>
              <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/moderation" element={
            <ProtectedRoute>
              <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
