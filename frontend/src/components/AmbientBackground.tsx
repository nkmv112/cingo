import React from 'react';

/**
 * AmbientBackground
 * Renders an animated, organic layered wave background 
 * using the 4-color aesthetic matching the rest of the theme.
 */
const AmbientBackground: React.FC = () => {
  return (
    <div className="ambient-bg" aria-hidden="true">
      {/* 
        The base background color is set via CSS (--color-bg: #050a24)
        The layers below form the undulating waves using CSS border-radius rotation.
      */}
      <div className="wave-layer wave-1" />
      <div className="wave-layer wave-2" />
      <div className="wave-layer wave-3" />

      {/* Film-grain noise overlay for texture */}
      <div className="noise" />
    </div>
  );
};

export default AmbientBackground;
