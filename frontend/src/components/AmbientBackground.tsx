import React from 'react';

/**
 * AmbientBackground
 * Renders a dynamic "Aurora" mesh gradient using floating animated orbs.
 * Colors are synchronized with index.css CSS variables.
 */
const AmbientBackground: React.FC = () => (
  <div className="ambient-bg" aria-hidden="true">
    <div className="aurora-container">
      <div className="aurora-orb orb-1" />
      <div className="aurora-orb orb-2" />
      <div className="aurora-orb orb-3" />
      <div className="aurora-orb orb-4" />
      <div className="aurora-orb orb-5" />
    </div>

    {/* Film-grain noise overlay for texture */}
    <div className="noise" />
  </div>
);

export default AmbientBackground;
