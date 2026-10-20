import React, { useState, useEffect } from 'react';
import { QuizData } from '../types';
import { Clock, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, RotateCcw, Send, HelpCircle } from 'lucide-react';

interface QuizActiveViewProps {
  quiz: QuizData;
  userAnswers: Record<number, number>;
  onSelectAnswer: (questionId: number, optionIndex: number) => void;
  onDeselectAnswer?: (questionId: number) => void;
  onSubmit: (timeSpent: number) => void;
  onReset: () => void;
}

export const QuizActiveView: React.FC<QuizActiveViewProps> = ({
  quiz,
  userAnswers,
  onSelectAnswer,
  onDeselectAnswer,
  onSubmit,
  onReset,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIdx];
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  const selectedOptionForCurrent = userAnswers[currentQuestion.id];

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const unansweredCount = totalQuestions - answeredCount;

  const handleAttemptSubmit = () => {
    if (unansweredCount > 0) {
      setShowSubmitModal(true);
    } else {
      onSubmit(seconds);
    }
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    onSubmit(seconds);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const renderQuestionOptions = (q: (typeof quiz.questions)[0]) => {
    const selectedOpt = userAnswers[q.id];

    return (
      <div className="space-y-2.5">
        {q.options.map((option, optIdx) => {
          const isSelected = selectedOpt === optIdx;
          const letter = optionLetters[optIdx] || `${optIdx + 1}`;

          return (
            <button
              key={optIdx}
              type="button"
              onClick={() => {
                if (isSelected && onDeselectAnswer) {
                  onDeselectAnswer(q.id);
                } else {
                  onSelectAnswer(q.id, optIdx);
                }
              }}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border option-transition cursor-pointer flex items-start gap-3.5 ${
                isSelected
                  ? 'bg-indigo-50/95 border-indigo-500 text-indigo-950 ring-2 ring-indigo-400/40 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-800'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {letter}
              </div>
              <div className="flex-1 pt-0.5 text-sm sm:text-base leading-relaxed font-medium">
                {option}
              </div>
              <div className="pt-0.5">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header & Status Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
              {quiz.topic || 'Assessment Quiz'}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-1">{quiz.title}</h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="bg-slate-100 p-0.5 rounded-xl flex items-center text-xs font-medium">
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'single' ? 'bg-white text-slate-800 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="View one question at a time"
              >
                1-by-1
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'all' ? 'bg-white text-slate-800 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="View all questions in a scrollable list"
              >
                All List
              </button>
            </div>

            {/* Practical Test Stopwatch */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-mono text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>{formatTime(seconds)}</span>
            </div>

            {/* Abort / Reset Button */}
            <button
              onClick={onReset}
              className="text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
              title="Reset current quiz and return to generator"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Progress & Question Navigator */}
        <div className="pt-4">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span className="font-semibold">
              {viewMode === 'single' ? `Question ${currentIdx + 1} of ${totalQuestions}` : `All ${totalQuestions} Questions`}
            </span>
            <span className="font-medium">
              {answeredCount} of {totalQuestions} Answered ({progressPercentage}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Interactive Question Pill Navigator */}
          <div className="flex flex-wrap items-center gap-2">
            {quiz.questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIdx;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIdx(idx);
                    if (viewMode === 'all') {
                      const el = document.getElementById(`question-card-${q.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-8 h-8 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                    isCurrent && viewMode === 'single'
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 shadow-xs'
                      : isAnswered
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                  }`}
                  title={`Jump to Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Questions View */}
      {viewMode === 'single' ? (
        /* Single Question View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                Q{currentIdx + 1}
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Multiple Choice (Select One)
              </span>
            </div>
            {selectedOptionForCurrent !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Answered
                </span>
                {onDeselectAnswer && (
                  <button
                    type="button"
                    onClick={() => onDeselectAnswer(currentQuestion.id)}
                    className="text-[11px] text-slate-400 hover:text-rose-600 underline cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
            {currentQuestion.question}
          </h3>

          {/* 4 Options Grid */}
          {renderQuestionOptions(currentQuestion)}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3">
              {currentIdx < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : null}

              {/* Submit Quiz button */}
              <button
                type="button"
                onClick={handleAttemptSubmit}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white shadow-md transition-all cursor-pointer ${
                  answeredCount === totalQuestions
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Submit Quiz ({answeredCount}/{totalQuestions})</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* All Questions List Mode */
        <div className="space-y-5">
          {quiz.questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;

            return (
              <div
                key={q.id}
                id={`question-card-${q.id}`}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Question {idx + 1} of {totalQuestions}
                    </span>
                  </div>
                  {isAnswered && (
                    <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Answered
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-snug">
                  {q.question}
                </h4>

                {renderQuestionOptions(q)}
              </div>
            );
          })}

          {/* Submit Card for All Questions Mode */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="font-bold text-slate-800 text-base">Finished all questions?</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                You have answered {answeredCount} of {totalQuestions} questions.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAttemptSubmit}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-md transition-all cursor-pointer ${
                answeredCount === totalQuestions
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Submit Quiz ({answeredCount}/{totalQuestions})</span>
            </button>
          </div>
        </div>
      )}

      {/* Warning confirmation modal if unanswered questions exist */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Unanswered Questions Detected
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              You have answered <span className="font-semibold text-slate-800">{answeredCount}</span> out of{' '}
              <span className="font-semibold text-slate-800">{totalQuestions}</span> questions.{' '}
              {unansweredCount} question(s) will be scored as 0.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              >
                Continue Quiz
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-4 py-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
