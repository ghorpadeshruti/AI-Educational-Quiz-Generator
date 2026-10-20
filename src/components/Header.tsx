
import React from 'react';
import { GraduationCap, BookOpen, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
  showReset?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  showReset,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <GraduationCap className="w-6 h-6" />
          </div>

          <div>
            <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
              QuizCraft <span className="text-indigo-600">AI</span>
            </h1>

            <p className="text-xs text-slate-500 hidden sm:block">
              AI-Powered Educational Quiz &amp; Practical Assessment Generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Practical Examination Ready</span>
          </div>

          {showReset && onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Start a new quiz from scratch"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Quiz</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
