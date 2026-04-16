import React, { useState } from 'react';
import { mockSchedule } from '../data/mockSchedule';

const ScheduleViewer = ({ savedSessions, toggleSaveSession }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('All');

  // Extract all unique tags
  const allTags = ['All', ...new Set(mockSchedule.flatMap(s => s.tags))];

  const filteredSessions = mockSchedule.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          session.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag === 'All' || session.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="fade-in">
      <h2>Conference Schedule</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Discover sessions, workshops, and networking events.
      </p>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for sessions or speakers..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="session-tags" style={{ marginBottom: '2rem' }}>
        {allTags.map(tag => (
          <button 
            key={tag}
            className={`btn-icon tag ${filterTag === tag ? 'active' : ''}`}
            onClick={() => setFilterTag(tag)}
            style={filterTag === tag ? { background: 'var(--accent-color)', color: 'white' } : {}}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="schedule-grid">
        {filteredSessions.length > 0 ? (
          filteredSessions.map(session => {
            const isSaved = savedSessions.some(s => s.id === session.id);
            return (
              <div key={session.id} className="glass-card session-card">
                <div className="session-header">
                  <h3 className="session-title">{session.title}</h3>
                  <button 
                    className={`btn-icon ${isSaved ? 'active' : ''}`}
                    onClick={() => toggleSaveSession(session)}
                    title={isSaved ? "Remove from Agenda" : "Add to Agenda"}
                  >
                    {isSaved ? '★' : '☆'}
                  </button>
                </div>
                
                <div className="session-meta">
                  <span>👤 {session.speaker}</span>
                </div>
                
                <div className="session-meta">
                  <span>🕒 {session.time}</span> | <span>📍 {session.location}</span>
                </div>
                
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                  {session.description}
                </p>

                <div className="session-tags" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  {session.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>No sessions found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleViewer;
