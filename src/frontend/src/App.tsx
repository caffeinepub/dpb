import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useProgress } from './game/storage/useProgress';
import { lockPassword } from './game/storage/passwordGate';
import { GAME_IDS, type GameId } from './game/constants';
import { getEventById } from './game/content/events';
import LandingScreen from './screens/LandingScreen';
import LoadingScreen from './screens/LoadingScreen';
import EventsHubScreen from './screens/EventsHubScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import LevelPlayScreen from './screens/LevelPlayScreen';
import WinScreen from './screens/WinScreen';
import LoseScreen from './screens/LoseScreen';
import PortraitFrame from './components/layout/PortraitFrame';

type AppScreen = 'landing' | 'loading' | 'events' | 'event-detail' | 'level' | 'win' | 'lose';

export default function App() {
  const { identity } = useInternetIdentity();
  const [selectedGameId, setSelectedGameId] = useState<GameId>(GAME_IDS.DEFAULT);
  const { currentLevel, isUnlocked, completeLevel, skipLevel, resetProgress, isLoading: progressLoading } = useProgress(selectedGameId);
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  // ALWAYS start locked - clear any persisted unlock state on mount
  const [isPasswordUnlocked, setIsPasswordUnlocked] = useState(false);

  useEffect(() => {
    // Clear any stored unlock flag to ensure app always starts locked
    lockPassword();
  }, []);

  const handlePasswordSuccess = () => {
    setIsPasswordUnlocked(true);
    // Show loading screen after password success
    setScreen('loading');
  };

  const handleLoadingComplete = () => {
    // Navigate to events hub after loading completes
    setScreen('events');
  };

  const handleRelock = () => {
    lockPassword();
    setIsPasswordUnlocked(false);
    setScreen('landing');
  };

  const handleEventSelect = (eventId: string) => {
    const event = getEventById(eventId);
    
    if (event?.type === 'game' && event.gameId) {
      // Game event - set the game ID and navigate to gameplay
      setSelectedGameId(event.gameId as GameId);
      if (!progressLoading) {
        setScreen('level');
      }
    } else if (event?.type === 'romantic') {
      // Romantic event - navigate to detail screen
      setSelectedEventId(eventId);
      setScreen('event-detail');
    }
  };

  const handleBackToEvents = () => {
    setSelectedEventId(null);
    setScreen('events');
  };

  const handleLevelWin = () => {
    completeLevel(currentLevel);
    setScreen('win');
  };

  const handleLevelLose = () => {
    setScreen('lose');
  };

  const handleSkipLevel = async () => {
    // Defensive guard: prevent skipping on final level
    if (currentLevel >= 100) {
      return;
    }
    await skipLevel(currentLevel);
    setScreen('level');
  };

  const handleNextLevel = () => {
    if (currentLevel < 100) {
      setScreen('level');
    }
  };

  const handleRetry = () => {
    setScreen('level');
  };

  const handleBackToEventsFromWin = () => {
    setScreen('events');
  };

  // CRITICAL: Password gate - block ALL content until password is unlocked
  // This is the ONLY render path when password is locked
  if (!isPasswordUnlocked) {
    return (
      <PortraitFrame showPattern={false}>
        <LandingScreen onSuccess={handlePasswordSuccess} />
      </PortraitFrame>
    );
  }

  // Show loading screen after password success
  if (screen === 'loading') {
    return (
      <PortraitFrame showPattern={false}>
        <LoadingScreen onComplete={handleLoadingComplete} />
      </PortraitFrame>
    );
  }

  // Main app screens with pattern and relock button
  return (
    <PortraitFrame showPattern={true} onRelock={handleRelock}>
      {screen === 'events' && (
        <EventsHubScreen 
          onEventSelect={handleEventSelect} 
          gameplayDisabled={progressLoading}
        />
      )}
      {screen === 'event-detail' && selectedEventId && (
        <EventDetailScreen eventId={selectedEventId} onBack={handleBackToEvents} />
      )}
      {screen === 'level' && (
        <LevelPlayScreen
          levelNumber={currentLevel}
          gameId={selectedGameId}
          onWin={handleLevelWin}
          onLose={handleLevelLose}
          onSkip={handleSkipLevel}
        />
      )}
      {screen === 'win' && (
        <WinScreen
          levelNumber={currentLevel - 1}
          gameId={selectedGameId}
          onNextLevel={handleNextLevel}
          onBackToEvents={handleBackToEventsFromWin}
        />
      )}
      {screen === 'lose' && (
        <LoseScreen 
          gameId={selectedGameId}
          onRetry={handleRetry} 
        />
      )}
    </PortraitFrame>
  );
}
