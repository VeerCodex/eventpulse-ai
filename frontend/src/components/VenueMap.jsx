import React from 'react';

const VenueMap = () => {
  return (
    <div className="fade-in">
      <h2>Event Venue Map</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Moscone Center, San Francisco, CA. Use the map to find your way around.
      </p>

      <div className="map-container">
        <iframe
          title="Venue Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.486221160395!2d-122.40382348421835!3d37.7833075797576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807de86baaf9%3A0x6e9f2ee1df1cc7b!2sMoscone%20Center!5e0!3m2!1sen!2sus!4v1689230000000!5m2!1sen!2sus"
        ></iframe>
      </div>
    </div>
  );
};

export default VenueMap;
