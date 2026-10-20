import React, { useState } from 'react';
import { QuizData } from '../types';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  RefreshCw,
  Printer,
  Copy,
  Check,
  Award,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface QuizResultViewProps {
  quiz: QuizData;
  userAnswers: Record<number, number>;
  timeSpentSeconds: number;
  onReset: () => void;
  onRetake: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  quiz,
  userAnswers,
  timeSpentSeconds,
  onReset,
  onRetake,
}) => {
  const [copied, setCopied] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');

  const totalQuestions = quiz.questions.length;

  // Calculate score
  let correctCount = 0;
  quiz.questions.forEach(q => {
    if (userAnswers[q.id] === q.correctAnswerIndex) {
      correctCount += 1;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Performance feedback evaluation
  const getFeedback = (pct: number) => {
    if (pct === 100) {
      return {
        badge: 'Outstanding Mastery',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        message: 'Perfect score! You have demonstrated thorough understanding of the material. Excellent performance for your practical exam!',
        icon: Trophy,
        theme: 'emerald',
      };
    } else if (pct >= 80) {
      return {
        badge: 'Great Performance',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        message: 'Strong command of the subject! You grasp the key mechanisms and concepts clearly with only minor points to refine.',
        icon: Award,
        theme: 'indigo',
      };
    } else if (pct >= 60) {
      return {
        badge: 'Good Effort & Solid Foundation',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        message: 'You understand the core principles, but review the explanations below to strengthen your problem-solving.',
        icon: BookOpen,
        theme: 'blue',
      };
    } else if (pct >= 40) {
      return {
        badge: 'Needs Revision',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        message: 'A fair attempt, but several fundamental concepts need closer revision. Carefully read each question explanation below.',
        icon: HelpCircle,
        theme: 'amber',
      };
    } else {
      return {
        badge: 'Keep Practicing',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        message: 'Do not be discouraged! Re-read the study notes carefully and retake the quiz to cement your memory.',
        icon: Sparkles,
        theme: 'rose',
      };
    }
  };

  const feedback = getFeedback(percentage);
  const FeedbackIcon = feedback.icon;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins === 0) return `${secs} seconds`;
    return `${mins}m ${secs}s`;
  };

  const handleCopySummary = () => {
    const text = `📊 Quiz Assessment Results: ${quiz.title}
Score: ${correctCount}/${totalQuestions} (${percentage}%)
Performance: ${feedback.badge}
Time Spent: ${formatTime(timeSpentSeconds)}
Generated with QuizCraft AI`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const filteredQuestions = quiz.questions.filter(q => {
    const isCorrect = userAnswers[q.id] === q.correctAnswerIndex;
    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'incorrect') return !isCorrect;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Score Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-50 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-50 rounded-full blur-2xl opacity-60 pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-100 mb-4">
            <FeedbackIcon className="w-8 h-8" />
          </div>

          <div className="mb-2">
            <span
              className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${feedback.badgeColor}`}
            >
              {feedback.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quiz Completed!
          </h2>

          {/* Big Score Display */}
          <div className="my-6 py-4 px-6 max-w-sm mx-auto bg-slate-50/80 rounded-2xl border border-slate-200/60">
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {correctCount} <span className="text-2xl sm:text-3xl font-medium text-slate-400">/ {totalQuestions}</span>
            </div>
            <div className="text-sm font-semibold text-indigo-600 mt-1">
              Score: {percentage}%
            </div>
            {timeSpentSeconds > 0 && (
              <div className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>Time taken: {formatTime(timeSpentSeconds)}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
            {feedback.message}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 no-print">
            {/* Retake same quiz */}
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-indigo-600" />
              <span>Retake Quiz</span>
            </button>

            {/* Reset / New Quiz */}
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-sm shadow-indigo-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Create New Quiz</span>
            </button>

            {/* Print / Save */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-all cursor-pointer"
              title="Print evaluation sheet"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print / PDF</span>
            </button>

            {/* Copy Score Summary */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-all cursor-pointer"
              title="Copy score to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Score</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Answer Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Detailed Question Review & Explanations
            </h3>
            <p className="text-xs text-slate-500">
              Review correct answers and rationale for each question.
            </p>
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl no-print">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalQuestions})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterMode === 'incorrect'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Incorrect ({totalQuestions - correctCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterMode === 'correct'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Correct ({correctCount})
            </button>
          </div>
        </div>

        {/* Question Review Cards */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const studentAnswer = userAnswers[q.id];
            const isCorrect = studentAnswer === q.correctAnswerIndex;
            const isUnanswered = studentAnswer === undefined;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-xs ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      Question {q.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      {isCorrect ? 'Scored 1/1' : 'Scored 0/1'}
                    </span>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correct
                      </span>
                    ) : isUnanswered ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-300">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Unanswered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100/80 px-2.5 py-1 rounded-full border border-rose-300">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorrect
                      </span>
                    )}
                  </div>
                </div>

                {/* Question */}
                <h4 className="text-base font-bold text-slate-800 mb-4 leading-snug">
                  {q.question}
                </h4>

                {/* 4 Options Display */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctAnswerIndex;
                    const isOptionStudentChoice = studentAnswer === optIdx;
                    const letter = optionLetters[optIdx] || `${optIdx + 1}`;

                    let itemStyle = 'border-slate-200 bg-white text-slate-700';
                    let badge = null;

                    if (isOptionCorrect) {
                      itemStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                      badge = (
                        <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded-md">
                          ✓ Correct Answer
                        </span>
                      );
                    } else if (isOptionStudentChoice && !isCorrect) {
                      itemStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-medium ring-1 ring-rose-300';
                      badge = (
                        <span className="ml-auto text-[11px] font-bold text-rose-700 bg-rose-200/70 px-2 py-0.5 rounded-md">
                          ✗ Your Choice
                        </span>
                      );
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border flex items-center gap-3 text-sm transition-all ${itemStyle}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            isOptionCorrect
                              ? 'bg-emerald-600 text-white'
                              : isOptionStudentChoice && !isCorrect
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {letter}
                        </div>
                        <span className="flex-1">{opt}</span>
                        {badge}
                      </div>
                    );
                  })}
                </div>

                {/* Pedagogical Explanation Box */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-700 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Explanation & Educational Rationale:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
