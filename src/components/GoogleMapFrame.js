import React from 'react';

function GoogleMapFrame({ center, zoom = 12, title = 'Google map' }) {
  const src = `https://maps.google.com/maps?q=${center.lat},${center.lng}&z=${zoom}&output=embed`;

  return (
    <iframe
      title={title}
      src={src}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}

export default GoogleMapFrame;
