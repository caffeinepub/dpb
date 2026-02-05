import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QUIZ_LEVELS } from '../game/quiz/content/quizLevels';
import { QUIZ_CONSTANTS } from '../game/quiz/constants';
import { useQuizProgress } from '../game/storage/useQuizProgress';
import SecretLetterReveal from '../components/quiz/SecretLetterReveal';
import PostUnlockHeader from '../components/layout/PostUnlockHeader';

interface QuizPlayScreenProps {
  onBackToEvents: () => void;
}

type QuizState = 'playing' | 'completed' | 'lost' | 'letter-reveal';

export default function QuizPlayScreen({ onBackToEvents }: QuizPlayScreenProps) {
  const quizProgress = useQuizProgress();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(quizProgress.currentLevel - 1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>('playing');
  const [showLetterReveal, setShowLetterReveal] = useState(false);

  const currentLevel = QUIZ_LEVELS[currentLevelIndex];
  const currentQuestion = currentLevel.questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / QUIZ_CONSTANTS.QUESTIONS_PER_LEVEL) * 100;

  useEffect(() => {
    // Reset state when level changes
    setCurrentQuestionIndex(0);
    setWrongAnswers(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setQuizState('playing');
    setShowLetterReveal(false);
  }, [currentLevelIndex]);

  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswerChecked) {
      setSelectedOption(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    setIsAnswerChecked(true);
    const isCorrect = currentQuestion.options[selectedOption].isCorrect;

    if (!isCorrect) {
      const newWrongCount = wrongAnswers + 1;
      setWrongAnswers(newWrongCount);

      if (newWrongCount > QUIZ_CONSTANTS.WRONG_ANSWERS_ALLOWED) {
        // Lost the level
        setTimeout(() => {
          setQuizState('lost');
        }, 1000);
        return;
      }
    }

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_CONSTANTS.QUESTIONS_PER_LEVEL - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswerChecked(false);
      } else {
        // Level completed!
        setQuizState('completed');
        quizProgress.completeLevel(currentLevel.levelNumber);
      }
    }, 1000);
  };

  const handleRetryLevel = () => {
    setCurrentQuestionIndex(0);
    setWrongAnswers(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setQuizState('playing');
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < QUIZ_CONSTANTS.TOTAL_LEVELS - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    } else {
      // All levels completed, go back to events
      onBackToEvents();
    }
  };

  const handleShowSecretLetter = () => {
    setShowLetterReveal(true);
  };

  const handleCloseSecretLetter = () => {
    setShowLetterReveal(false);
  };

  // Lost state
  if (quizState === 'lost') {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center bg-gradient-to-br from-rose-950/90 to-pink-950/90">
        <Card className="w-full max-w-md bg-black/40 border-rose-500/30 backdrop-blur-md p-8 text-center space-y-6">
          <XCircle className="w-20 h-20 text-rose-500 mx-auto animate-pulse" />
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-rose-100">
              Awww mazi dikshu mazi chiuuuu 🥺❤️
            </h2>
            <p className="text-rose-200 text-lg">
              Thoda chukla ka?
            </p>
            <p className="text-rose-300">
              Kahi nahi hot chotu, punha try kar 😘
            </p>
          </div>
          <Button
            onClick={handleRetryLevel}
            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
          >
            Retry Level
          </Button>
        </Card>
      </div>
    );
  }

  // Completed state
  if (quizState === 'completed') {
    return (
      <>
        <div className="min-h-screen p-6 flex items-center justify-center bg-gradient-to-br from-rose-950/90 to-pink-950/90">
          <Card className="w-full max-w-md bg-black/40 border-rose-500/30 backdrop-blur-md p-8 text-center space-y-6">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-rose-100">
                Level {currentLevel.levelNumber} Complete! 🎉
              </h2>
              <p className="text-rose-200 text-lg">
                {currentLevel.title}
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleShowSecretLetter}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
              >
                Secret Letter 🔐
              </Button>
              {currentLevelIndex < QUIZ_CONSTANTS.TOTAL_LEVELS - 1 ? (
                <Button
                  onClick={handleNextLevel}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
                >
                  Next Level ❤️
                </Button>
              ) : (
                <Button
                  onClick={onBackToEvents}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold py-6 text-lg"
                >
                  Back to Events 💖
                </Button>
              )}
            </div>
          </Card>
        </div>
        {showLetterReveal && (
          <SecretLetterReveal
            levelNumber={currentLevel.levelNumber}
            letterText={currentLevel.secretLetter}
            onClose={handleCloseSecretLetter}
          />
        )}
      </>
    );
  }

  // Playing state
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950/90 to-pink-950/90">
      {/* Branded header */}
      <PostUnlockHeader />
      
      <div className="max-w-3xl mx-auto px-4 md:px-6 pb-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBackToEvents}
            className="text-rose-200 hover:text-rose-100 hover:bg-rose-900/30"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-rose-100 font-semibold">
            Level {currentLevel.levelNumber} / {QUIZ_CONSTANTS.TOTAL_LEVELS}
          </div>
        </div>

        {/* Level Title */}
        <div className="text-center space-y-2">
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mx-auto animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold text-rose-100">
            {currentLevel.title}
          </h1>
          <p className="text-rose-300">
            Question {currentQuestionIndex + 1} of {QUIZ_CONSTANTS.QUESTIONS_PER_LEVEL}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progressPercent} className="h-3 bg-rose-950/50" />
          <div className="flex justify-between text-sm text-rose-300">
            <span>Wrong: {wrongAnswers} / {QUIZ_CONSTANTS.WRONG_ANSWERS_ALLOWED}</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-black/40 border-rose-500/30 backdrop-blur-md p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-rose-100 mb-6 text-center">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = option.isCorrect;
              const showResult = isAnswerChecked;

              let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ';
              
              if (!showResult) {
                buttonClass += isSelected
                  ? 'bg-rose-600/30 border-rose-500 text-rose-100'
                  : 'bg-rose-950/30 border-rose-700/30 text-rose-200 hover:bg-rose-900/40 hover:border-rose-600/50';
              } else {
                if (isSelected && isCorrect) {
                  buttonClass += 'bg-green-600/30 border-green-500 text-green-100';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'bg-red-600/30 border-red-500 text-red-100';
                } else if (isCorrect) {
                  buttonClass += 'bg-green-600/20 border-green-600/50 text-green-200';
                } else {
                  buttonClass += 'bg-rose-950/20 border-rose-700/20 text-rose-300';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswerChecked}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg">{option.text}</span>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {!isAnswerChecked && (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="w-full mt-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
