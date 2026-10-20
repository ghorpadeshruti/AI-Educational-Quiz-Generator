import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, CheckCircle2, BookOpen } from 'lucide-react';

interface LoadingOverlayProps {
  topic: string;
  questionCount: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ topic, questionCount }) => {
  const steps = [
    { title: 'Analyzing study material & topic context', icon: BookOpen },
    { title: `Synthesizing ${questionCount} multiple-choice questions`, icon: Brain },
    { title: 'Formulating 4 distinct choices & validating key facts', icon: Sparkles },
    { title: 'Drafting clear conceptual explanations for each answer', icon: CheckCircle2 },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
          <Brain className="w-8 h-8 animate-bounce" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Generating Your Quiz with Gemini AI
      </h3>
      <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
        Crafting educational questions for <span className="font-semibold text-slate-700">"{topic || 'Study Notes'}"</span> with verified answers and explanations.
      </p>

      {/* Progress steps */}
      <div className="space-y-3 text-left max-w-md mx-auto bg-slate-50 p-4 rounded-xl border border-slate-100">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isCurrent
                  ? 'text-indigo-600 font-semibold'
                  : isDone
                  ? 'text-emerald-600'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-700'
                    : isCurrent
                    ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span className="text-xs sm:text-sm">{step.title}</span>
              {isCurrent && (
                <span className="ml-auto flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-xs text-slate-400">
        This typically takes 3 to 6 seconds. Please keep this tab open.
      </div>
    </div>
  );
};
