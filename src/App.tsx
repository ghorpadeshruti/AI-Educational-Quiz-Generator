
import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuizGeneratorForm } from './components/QuizGeneratorForm';
import { QuizActiveView } from './components/QuizActiveView';
import { QuizResultView } from './components/QuizResultView';
import { LoadingOverlay } from './components/LoadingOverlay';
import { QuizData } from './types';
import { GraduationCap } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<
    'create' | 'quiz' | 'result'
  >('create');

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [generationParams, setGenerationParams] = useState<{
    topic: string;
    numberOfQuestions: number;
  }>({
    topic: '',
    numberOfQuestions: 5,
  });

  const handleGenerateQuiz = async (params: {
    topic: string;
    studyMaterial: string;
    numberOfQuestions: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }) => {
    setIsLoading(true);
    setError(null);

    setGenerationParams({
      topic: params.topic,
      numberOfQuestions: params.numberOfQuestions,
    });

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Server error while generating quiz.'
        );
      }

      const generatedQuiz: QuizData = {
        title: data.title || `${params.topic || 'Subject'} Quiz`,
        summary: data.summary || 'AI-generated assessment quiz',
        questions: data.questions || [],
        topic: params.topic,
        studyMaterial: params.studyMaterial,
        difficulty: params.difficulty,
      };

      if (
        !generatedQuiz.questions ||
        generatedQuiz.questions.length === 0
      ) {
        throw new Error(
          'No questions could be generated from the given material.'
        );
      }

      setQuizData(generatedQuiz);
      setUserAnswers({});
      setTimeSpentSeconds(0);
      setCurrentStep('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      console.error('Quiz Generation Error:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to connect to AI service. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = (
    questionId: number,
    optionIndex: number
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleDeselectAnswer = (questionId: number) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleSubmitQuiz = (timeSpent: number) => {
    setTimeSpentSeconds(timeSpent);
    setCurrentStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentStep('create');
    setQuizData(null);
    setUserAnswers({});
    setTimeSpentSeconds(0);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setUserAnswers({});
    setTimeSpentSeconds(0);
    setCurrentStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header
        showReset={currentStep !== 'create'}
        onReset={handleReset}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {isLoading ? (
          <LoadingOverlay
            topic={generationParams.topic}
            questionCount={generationParams.numberOfQuestions}
          />
        ) : currentStep === 'create' ? (
          <QuizGeneratorForm
            onGenerate={handleGenerateQuiz}
            isLoading={isLoading}
            error={error}
          />
        ) : currentStep === 'quiz' && quizData ? (
          <QuizActiveView
            quiz={quizData}
            userAnswers={userAnswers}
            onSelectAnswer={handleSelectAnswer}
            onDeselectAnswer={handleDeselectAnswer}
            onSubmit={handleSubmitQuiz}
            onReset={handleReset}
          />
        ) : currentStep === 'result' && quizData ? (
          <QuizResultView
            quiz={quizData}
            userAnswers={userAnswers}
            timeSpentSeconds={timeSpentSeconds}
            onReset={handleReset}
            onRetake={handleRetake}
          />
        ) : null}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto py-6 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">
              Educational Quiz Generator
            </span>
            <span>•</span>
            
          </div>

          <div className="text-xs text-slate-400">
            AI-Powered Quiz Generator
          </div>
        </div>
      </footer>
    </div>
  );
}
