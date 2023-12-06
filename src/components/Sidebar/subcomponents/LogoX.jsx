// LogoX.js

import React from 'react';
import '../Sidebar.css';

const LogoX = ({ darkTheme, collapsed }) => {
  return (
    <div className="logo" style={{ color: darkTheme ? '#fff' : '#3B4276' }}>
      <div className="logo-icon">
        {collapsed ? 'VB' : 'ViajaBara'}
      </div>
    </div>
  );
}

export default LogoX;
