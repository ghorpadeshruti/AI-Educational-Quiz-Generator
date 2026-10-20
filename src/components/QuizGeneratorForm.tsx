import React, { useState } from 'react';
import { Sparkles, BookOpen, AlertCircle, HelpCircle, Layers, FileText, Wand2 } from 'lucide-react';
import { SAMPLE_MATERIALS } from '../data/samples';

interface QuizGeneratorFormProps {
  onGenerate: (params: {
    topic: string;
    studyMaterial: string;
    numberOfQuestions: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }) => void;
  isLoading: boolean;
  error: string | null;
}

export const QuizGeneratorForm: React.FC<QuizGeneratorFormProps> = ({
  onGenerate,
  isLoading,
  error,
}) => {
  const [topic, setTopic] = useState('');
  const [studyMaterial, setStudyMaterial] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSelectSample = (sampleId: string) => {
    const selected = SAMPLE_MATERIALS.find(s => s.id === sampleId);
    if (selected) {
      setTopic(selected.topic);
      setStudyMaterial(selected.material);
      setDifficulty(selected.difficulty);
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() && !studyMaterial.trim()) {
      setValidationError('Please enter a topic or paste study material to generate questions.');
      return;
    }
    setValidationError(null);
    onGenerate({
      topic: topic.trim(),
      studyMaterial: studyMaterial.trim(),
      numberOfQuestions,
      difficulty,
    });
  };

  const handleClear = () => {
    setTopic('');
    setStudyMaterial('');
    setValidationError(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Intro Hero Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Interactive College Practical Examination Tool</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Educational Quiz Generator
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Enter any academic subject or paste your lecture notes. Our Gemini AI engine will instantly formulate multiple-choice questions with verified explanations and grading.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
        {/* Sample Material Quick Chips */}
        <div className="mb-6 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              Quick Practical Test Presets (1-Click Load):
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_MATERIALS.map(sample => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample.id)}
                className="text-xs font-medium bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{sample.topic}</span>
                <span className="text-[10px] text-slate-400 font-normal">({sample.category})</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="topic-input" className="block text-sm font-bold text-slate-800">
                1. Quiz Topic / Subject Title <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-400">e.g. Data Structures, Photosynthesis, Thermodynamics</span>
            </div>
            <input
              id="topic-input"
              type="text"
              value={topic}
              onChange={e => {
                setTopic(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g. Operating Systems: Process Synchronization & Deadlocks"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800 placeholder-slate-400 text-sm transition-all"
            />
          </div>

          {/* Study Material Text Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="material-input" className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>2. Study Material / Syllabus Notes (Optional but Recommended)</span>
              </label>
              <span className="text-xs text-slate-400">
                {studyMaterial.length} characters
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Paste textbook paragraphs, lecture slides, or revision notes. The AI will strictly ground questions in your text.
            </p>
            <textarea
              id="material-input"
              rows={6}
              value={studyMaterial}
              onChange={e => {
                setStudyMaterial(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Paste your study material, key definitions, formulas, or lecture notes here..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800 placeholder-slate-400 text-sm transition-all font-mono text-xs sm:text-sm leading-relaxed"
            />
          </div>

          {/* Quiz Configuration Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Number of Questions</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 8, 10].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setNumberOfQuestions(count)}
                    className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                      numberOfQuestions === count
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {count} Questions
                    {count === 5 && <span className="block text-[10px] font-normal opacity-90">(Practical default)</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Difficulty Level</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`py-2 px-2 text-xs sm:text-sm font-semibold capitalize rounded-xl border transition-all cursor-pointer ${
                      difficulty === level
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Validation or API Error Alerts */}
          {(validationError || error) && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
              <div>
                <p className="font-semibold">Unable to generate quiz</p>
                <p className="text-xs mt-0.5">{validationError || error}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
            {(topic || studyMaterial) && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer py-1"
              >
                Clear all fields
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto sm:ml-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98] shadow-md shadow-indigo-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Wand2 className="w-5 h-5" />
              <span>Generate Quiz ({numberOfQuestions} Questions)</span>
            </button>
          </div>
        </form>
      </div>

      {/* Practical Features Notice */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
            4
          </div>
          <h4 className="text-xs font-bold text-slate-800">Standard 4-Choice Options</h4>
          <p className="text-[11px] text-slate-500 mt-1">Rigorous multiple-choice structure adhering to practical assessment standards.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
            ✓
          </div>
          <h4 className="text-xs font-bold text-slate-800">Instant Evaluation & Score</h4>
          <p className="text-[11px] text-slate-500 mt-1">Calculates score out of total questions with dynamic performance feedback.</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
            💡
          </div>
          <h4 className="text-xs font-bold text-slate-800">Clear Explanations</h4>
          <p className="text-[11px] text-slate-500 mt-1">Every question includes detailed rationale explaining why the answer is correct.</p>
        </div>
      </div>
    </div>
  );
};
