import React, { useState, useEffect } from 'react';
import { useFirebase } from './hooks/useFirebase';
import { initialTeams, afspraken, allPersons, specialAlerts } from './data/teams';
import Header from './components/Header';
import TeamSelector from './components/TeamSelector';
import TabNavigation from './components/TabNavigation';
import Overview from './components/Overview';
import MatchList from './components/MatchList';
import TrainingSchedule from './components/TrainingSchedule';
import Agreements from './components/Agreements';
import AllMatches from './components/AllMatches';
import EditModal from './components/EditModal';
import ProfileModal from './components/ProfileModal';
import PasswordModal from './components/PasswordModal';
import Toast from './components/Toast';
import InstallBanner from './components/InstallBanner';
import DateBanner from './components/DateBanner';
import AlertBanner from './components/AlertBanner';

const EDIT_PASSWORD = "jo10trainer";

function App() {
  // State
  const [teams, setTeams] = useState(initialTeams);
  const [currentTeam, setCurrentTeam] = useState('jo10-1');
  const [activeTab, setActiveTab] = useState('overzicht');
  const [currentProfile, setCurrentProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toast, setToast] = useState(null);
  const [techniekDates, setTechniekDates] = useState([]);
  const [techniekSettings, setTechniekSettings] = useState({ tijd: '17:30 - 18:30', veld: 'Veld 1' });
  
  // Modals
  const [editModal, setEditModal] = useState({ open: false, match: null });
  const [profileModal, setProfileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  
  // Firebase hook
  const { connected, saveMatch, saveTechniek, saveTechniekSettings } = useFirebase(
    teams, setTeams, techniekDates, setTechniekDates, techniekSettings, setTechniekSettings
  );
  
  // Toast helper
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };
  
  // Team selectie
  const handleTeamChange = (teamId) => {
    setCurrentTeam(teamId);
  };
  
  // Profile selectie
  const handleProfileSelect = (name) => {
    setCurrentProfile(name);
    const person = allPersons[name];
    if (person && person.team) {
      setCurrentTeam(person.team);
    }
    setProfileModal(false);
  };
  
  // Edit mode toggle
  const handleEditToggle = () => {
    if (!editMode && !isAuthenticated) {
      setPasswordModal(true);
      return;
    }
    setEditMode(!editMode);
  };
  
  // Password check
  const handlePasswordSubmit = (password) => {
    if (password === EDIT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordModal(false);
      setEditMode(true);
    } else {
      showToast('❌ Onjuist wachtwoord');
    }
  };
  
  // Match opslaan
  const handleSaveMatch = (matchData) => {
    const updatedTeams = { ...teams };
    const teamMatches = [...updatedTeams[currentTeam].wedstrijden];
    const idx = teamMatches.findIndex(m => m.id === matchData.id);
    if (idx !== -1) {
      teamMatches[idx] = { ...teamMatches[idx], ...matchData };
      updatedTeams[currentTeam].wedstrijden = teamMatches;
      setTeams(updatedTeams);
      saveMatch(currentTeam, idx, matchData);
      showToast('✓ Wedstrijd opgeslagen');
    }
    setEditModal({ open: false, match: null });
  };
  
  // Techniek opslaan
  const handleSaveTechniek = (dates, settings) => {
    setTechniekDates(dates);
    setTechniekSettings(settings);
    saveTechniek(dates);
    saveTechniekSettings(settings);
    showToast('✓ Techniektraining opgeslagen');
  };
  
  // Current team data
  const team = teams[currentTeam];
  const alert = currentProfile && specialAlerts[currentProfile] ? specialAlerts[currentProfile][0] : null;
  
  return (
    <div className="app">
      <Header 
        profile={currentProfile}
        onProfileClick={() => setProfileModal(true)}
        onEditClick={handleEditToggle}
        editMode={editMode}
      />
      
      <InstallBanner />
      <DateBanner team={team} />
      {alert && <AlertBanner message={alert.msg} />}
      {editMode && <div className="edit-banner">✏️ Bewerkingsmodus: tik op een wedstrijd om aan te passen</div>}
      
      <TeamSelector 
        teams={teams}
        currentTeam={currentTeam}
        onChange={handleTeamChange}
      />
      
      <main className="content">
        <div className="team-card">
          <div className="team-left">
            <h2>{team.naam}</h2>
            <p>{team.klasse}</p>
            <p className="season">JO10 • Seizoen 25-26 • Fase 3</p>
          </div>
          <div className="team-right">
            <span>Trainer:</span> <strong>{team.trainer}</strong><br />
            <span>TM:</span> <strong>{team.manager}</strong>
          </div>
        </div>
        
        <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
        
        {activeTab === 'overzicht' && (
          <Overview team={team} afspraken={afspraken} />
        )}
        
        {activeTab === 'wedstrijden' && (
          <MatchList 
            matches={team.wedstrijden}
            editMode={editMode}
            onEdit={(match) => setEditModal({ open: true, match })}
            showToast={showToast}
          />
        )}
        
        {activeTab === 'trainingen' && (
          <TrainingSchedule 
            editMode={editMode}
            techniekDates={techniekDates}
            techniekSettings={techniekSettings}
            onSave={handleSaveTechniek}
          />
        )}
        
        {activeTab === 'afspraken' && (
          <Agreements afspraken={afspraken} />
        )}
        
        {activeTab === 'alles' && (
          <AllMatches teams={teams} />
        )}
      </main>
      
      {editModal.open && (
        <EditModal 
          match={editModal.match}
          team={team}
          onSave={handleSaveMatch}
          onClose={() => setEditModal({ open: false, match: null })}
        />
      )}
      
      {profileModal && (
        <ProfileModal 
          teams={teams}
          allPersons={allPersons}
          currentProfile={currentProfile}
          onSelect={handleProfileSelect}
          onClose={() => setProfileModal(false)}
        />
      )}
      
      {passwordModal && (
        <PasswordModal 
          onSubmit={handlePasswordSubmit}
          onClose={() => setPasswordModal(false)}
        />
      )}
      
      {toast && <Toast message={toast} />}
    </div>
  );
}

export default App;
