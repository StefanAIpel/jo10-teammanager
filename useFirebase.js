import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAp5t9VHEN05e9R95MjKwUkdLGOvYJToOg",
  authDomain: "switch-volleybal.firebaseapp.com",
  databaseURL: "https://switch-volleybal-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "switch-volleybal",
  storageBucket: "switch-volleybal.firebasestorage.app",
  messagingSenderId: "1068570793846",
  appId: "1:1068570793846:web:18e9e3b52036ad871de498"
};

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} catch (e) {
  console.error('Firebase init error:', e);
}

export function useFirebase(teams, setTeams, techniekDates, setTechniekDates, techniekSettings, setTechniekSettings) {
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    if (!db) return;
    
    // Listen for data changes
    const unsubscribe = onValue(ref(db, 'jo10'), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Update wedstrijden
        if (data.wedstrijden) {
          setTeams(prevTeams => {
            const updated = { ...prevTeams };
            Object.keys(data.wedstrijden).forEach(teamId => {
              if (updated[teamId]) {
                Object.keys(data.wedstrijden[teamId]).forEach(idx => {
                  if (updated[teamId].wedstrijden[idx]) {
                    updated[teamId].wedstrijden[idx] = {
                      ...updated[teamId].wedstrijden[idx],
                      ...data.wedstrijden[teamId][idx]
                    };
                  }
                });
              }
            });
            return updated;
          });
        }
        
        // Update techniek
        if (data.techniek) {
          setTechniekDates(data.techniek);
        }
        if (data.techniekSettings) {
          setTechniekSettings(data.techniekSettings);
        }
        
        setConnected(true);
      }
    }, (error) => {
      console.error('Firebase read error:', error);
      setConnected(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  const saveMatch = async (teamId, matchIdx, matchData) => {
    if (!db) return;
    try {
      await update(ref(db, `jo10/wedstrijden/${teamId}/${matchIdx}`), matchData);
      console.log('Match saved:', teamId, matchIdx);
    } catch (error) {
      console.error('Save error:', error);
    }
  };
  
  const saveTechniek = async (dates) => {
    if (!db) return;
    try {
      await set(ref(db, 'jo10/techniek'), dates);
    } catch (error) {
      console.error('Save techniek error:', error);
    }
  };
  
  const saveTechniekSettings = async (settings) => {
    if (!db) return;
    try {
      await set(ref(db, 'jo10/techniekSettings'), settings);
    } catch (error) {
      console.error('Save settings error:', error);
    }
  };
  
  return { connected, saveMatch, saveTechniek, saveTechniekSettings };
}
