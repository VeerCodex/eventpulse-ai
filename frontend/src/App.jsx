import React, { useState, useEffect } from 'react';
import ScheduleViewer from './components/ScheduleViewer';
import AgendaBuilder from './components/AgendaBuilder';
import VenueMap from './components/VenueMap';
import Chatbot from './components/Chatbot';

function App() {
  const [activeTab, setActiveTab] = useState('schedule');
  
  // Initialize from local storage if available
  const [savedSessions, setSavedSessions] = useState(() => {
    const saved = localStorage.getItem('agenda');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('agenda', JSON.stringify(savedSessions));
  }, [savedSessions]);

  const toggleSaveSession = (session) => {
    setSavedSessions(prev => {
      const isSaved = prev.some(s => s.id === session.id);
      if (isSaved) {
        return prev.filter(s => s.id !== session.id);
      } else {
        return [...prev, session];
      }
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <ScheduleViewer savedSessions={savedSessions} toggleSaveSession={toggleSaveSession} />;
      case 'agenda':
        return <AgendaBuilder savedSessions={savedSessions} toggleSaveSession={toggleSaveSession} />;
      case 'map':
        return <VenueMap />;
      default:
        return <ScheduleViewer savedSessions={savedSessions} toggleSaveSession={toggleSaveSession} />;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          ⚡ EventPulse AI
        </div>
        <nav className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            🗓 Schedule
          </button>
          <button 
            className={`nav-btn ${activeTab === 'agenda' ? 'active' : ''}`}
            onClick={() => setActiveTab('agenda')}
          >
            ⭐ Agenda ({savedSessions.length})
          </button>
          <button 
            className={`nav-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            🗺 Map
          </button>
        </nav>
      </header>

      <main className="main-content">
        {renderContent()}
      </main>

      <Chatbot />
    </div>
  );
}

export default App;
