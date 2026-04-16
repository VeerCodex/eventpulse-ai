import React from 'react';

const AgendaBuilder = ({ savedSessions, toggleSaveSession }) => {
  if (savedSessions.length === 0) {
    return (
      <div className="fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Your Personal Agenda</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
          You haven't saved any sessions yet. Go back to the Schedule and click the ⭐ icon to build your agenda!
        </p>
      </div>
    );
  }

  // Sort sessions by ID (as a proxy for time) for the agenda view
  const sortedSessions = [...savedSessions].sort((a, b) => a.id - b.id);

  return (
    <div className="fade-in">
      <h2>Your Personal Agenda</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        These are the events you have starred.
      </p>

      <div className="schedule-grid">
        {sortedSessions.map(session => (
          <div key={session.id} className="glass-card session-card" style={{ borderLeft: '4px solid var(--accent-success)' }}>
            <div className="session-header">
              <h3 className="session-title">{session.title}</h3>
              <button 
                className="btn-icon active"
                onClick={() => toggleSaveSession(session)}
                title="Remove from Agenda"
              >
                ★
              </button>
            </div>
            
            <div className="session-meta">
              <span>👤 {session.speaker}</span>
            </div>
            
            <div className="session-meta">
              <span>🕒 {session.time}</span> | <span>📍 {session.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaBuilder;
