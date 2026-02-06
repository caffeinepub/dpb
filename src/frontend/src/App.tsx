import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useProgress } from './game/storage/useProgress';
import { usePromisesKeptProgress } from './game/storage/usePromisesKeptProgress';
import { useQuizProgress } from './game/storage/useQuizProgress';
import { lockPassword } from './game/storage/passwordGate';
import LandingScreen from './screens/LandingScreen';
import LoadingScreen from './screens/LoadingScreen';
import EventsHubScreen from './screens/EventsHubScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import LevelPlayScreen from './screens/LevelPlayScreen';
import WinScreen from './screens/WinScreen';
import LoseScreen from './screens/LoseScreen';
import QuizPlayScreen from './screens/QuizPlayScreen';
import PortraitFrame from './components/layout/PortraitFrame';

type AppScreen = 'landing' | 'post-password-loading' | 'events' | 'event-detail' | 'level' | 'win' | 'lose' | 'quiz';
type GameEventId = 'event-1' | 'event-4' | 'event-2';

export default function App() {
  const { identity } = useInternetIdentity();
  const mainGame = useProgress();
  const promisesKeptGame = usePromisesKeptProgress();
  const quizGame = useQuizProgress();
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activeGameEvent, setActiveGameEvent] = useState<GameEventId | null>(null);
  const [completedLevel, setCompletedLevel] = useState<number | null>(null);
  
  // ALWAYS start locked - clear any persisted unlock state on mount
  const [isPasswordUnlocked, setIsPasswordUnlocked] = useState(false);

  useEffect(() => {
    // Clear any stored unlock flag to ensure app always starts locked
    lockPassword();
  }, []);

  const handlePasswordSuccess = () => {
    setIsPasswordUnlocked(true);
    // Show loading screen after password unlock
    setScreen('post-password-loading');
  };

  const handleLoadingComplete = () => {
    // Navigate to events hub after loading completes
    setScreen('events');
  };

  const handleEventSelect = (eventId: string) => {
    if (eventId === 'event-1') {
      // Event 1 is the main game - only allow if progress is loaded
      if (!mainGame.isLoading) {
        setActiveGameEvent('event-1');
        setScreen('level');
      }
    } else if (eventId === 'event-4') {
      // Event 4 is the "100 Promises I Kept" game - only allow if progress is loaded
      if (!promisesKeptGame.isLoading) {
        setActiveGameEvent('event-4');
        setScreen('level');
      }
    } else if (eventId === 'event-2') {
      // Event 2 is the quiz game - only allow if progress is loaded
      if (!quizGame.isLoading) {
        setActiveGameEvent('event-2');
        setScreen('quiz');
      }
    } else {
      // Event 3, DPB, and Together Forever are romantic screens - always allow
      setSelectedEventId(eventId);
      setScreen('event-detail');
    }
  };

  const handleBackToEvents = () => {
    setSelectedEventId(null);
    setActiveGameEvent(null);
    setCompletedLevel(null);
    setScreen('events');
  };

  const handleLevelWin = async () => {
    const game = activeGameEvent === 'event-4' ? promisesKeptGame : mainGame;
    const levelJustCompleted = game.currentLevel;
    setCompletedLevel(levelJustCompleted);
    await game.completeLevel(levelJustCompleted);
    setScreen('win');
  };

  const handleLevelLose = () => {
    setScreen('lose');
  };

  const handleSkipLevel = async () => {
    const game = activeGameEvent === 'event-4' ? promisesKeptGame : mainGame;
    await game.skipLevel(game.currentLevel);
    setScreen('level');
  };

  const handleNextLevel = () => {
    const game = activeGameEvent === 'event-4' ? promisesKeptGame : mainGame;
    if (game.currentLevel < 100) {
      setCompletedLevel(null);
      setScreen('level');
    }
  };

  const handleRetry = () => {
    if (activeGameEvent === 'event-2') {
      setScreen('quiz');
    } else {
      setScreen('level');
    }
  };

  const handleBackToEventsFromWin = () => {
    setActiveGameEvent(null);
    setCompletedLevel(null);
    setScreen('events');
  };

  // Get current game context
  const currentGame = activeGameEvent === 'event-4' ? promisesKeptGame : mainGame;
  const currentLevel = currentGame.currentLevel;
  const winScreenLevel = completedLevel !== null ? completedLevel : currentLevel - 1;

  // CRITICAL: Password gate - block ALL content until password is unlocked
  // This is the ONLY render path when password is locked
  if (!isPasswordUnlocked) {
    return (
      <PortraitFrame showPattern={false} showInstallUI={false}>
        <LandingScreen onSuccess={handlePasswordSuccess} />
      </PortraitFrame>
    );
  }

  // Post-password loading screen
  if (screen === 'post-password-loading') {
    return (
      <PortraitFrame showPattern={false} showInstallUI={false}>
        <LoadingScreen 
          onComplete={handleLoadingComplete}
          message="now you are entering in world of love joy and promises from your' truly bunny"
        />
      </PortraitFrame>
    );
  }

  // Main app screens with pattern
  return (
    <PortraitFrame showPattern={true} showInstallUI={false}>
      {screen === 'events' && (
        <EventsHubScreen 
          onEventSelect={handleEventSelect} 
          mainGameDisabled={mainGame.isLoading}
          promisesKeptGameDisabled={promisesKeptGame.isLoading}
          quizGameDisabled={quizGame.isLoading}
        />
      )}
      {screen === 'event-detail' && selectedEventId && (
        <EventDetailScreen eventId={selectedEventId} onBack={handleBackToEvents} />
      )}
      {screen === 'level' && activeGameEvent && activeGameEvent !== 'event-2' && (
        <LevelPlayScreen
          levelNumber={currentLevel}
          gameEventId={activeGameEvent}
          onWin={handleLevelWin}
          onLose={handleLevelLose}
          onSkip={handleSkipLevel}
          onBackToEvents={handleBackToEvents}
        />
      )}
      {screen === 'quiz' && activeGameEvent === 'event-2' && (
        <QuizPlayScreen
          onBackToEvents={handleBackToEvents}
        />
      )}
      {screen === 'win' && activeGameEvent && activeGameEvent !== 'event-2' && (
        <WinScreen
          levelNumber={winScreenLevel}
          gameEventId={activeGameEvent}
          onNextLevel={handleNextLevel}
          onBackToEvents={handleBackToEventsFromWin}
        />
      )}
      {screen === 'lose' && activeGameEvent && activeGameEvent !== 'event-2' && (
        <LoseScreen 
          gameEventId={activeGameEvent}
          onRetry={handleRetry} 
        />
      )}
    </PortraitFrame>
  );
}
