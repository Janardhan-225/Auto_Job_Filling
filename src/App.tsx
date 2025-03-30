import React, { useState } from 'react';
import { Search, Briefcase, Bell, Settings, User, Layout, CheckCircle, Clock, XCircle } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  status: 'applied' | 'pending' | 'rejected';
  date: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'settings'>('dashboard');
  
  // Mock data - will be replaced with real API calls
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Tech Corp',
      status: 'applied',
      date: '2024-03-15'
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'Innovation Labs',
      status: 'pending',
      date: '2024-03-14'
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'StartUp Inc',
      status: 'rejected',
      date: '2024-03-13'
    }
  ]);

  const getStatusIcon = (status: Job['status']) => {
    switch (status) {
      case 'applied':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
          <Briefcase className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">JobTracker</span>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
              activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layout className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
              activeTab === 'jobs' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Jobs
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
              activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Track your job applications and progress</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Total Applications</h3>
              <span className="text-2xl font-semibold text-blue-600">{jobs.length}</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Applied This Week</h3>
              <span className="text-2xl font-semibold text-green-600">
                {jobs.filter(job => job.status === 'applied').length}
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Pending Response</h3>
              <span className="text-2xl font-semibold text-yellow-600">
                {jobs.filter(job => job.status === 'pending').length}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {jobs.map(job => (
              <div key={job.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{job.date}</span>
                  {getStatusIcon(job.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;