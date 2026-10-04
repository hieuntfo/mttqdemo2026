import React, { useState } from 'react';
import { L0LoginView } from './components/views/L0LoginView';
import { MttqPortalView } from './components/views/MttqPortalView';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <div className="usds-app govuk-app min-h-screen bg-slate-50 font-sans">
      <L0LoginView
        designMode="HI_FI_SYSTEM"
        uiState="DEFAULT"
        showAnnotations={false}
        onLoginSuccess={() => setShowLogin(false)}
        onGoToPublic={() => setShowLogin(false)}
      />
    </div>;
  }

  return <MttqPortalView onLogin={() => setShowLogin(true)} />;
}
