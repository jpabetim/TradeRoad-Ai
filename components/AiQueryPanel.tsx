import React, { useRef, useEffect } from 'react';

interface AiQueryPanelProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onAnalyzeClick: () => void;
  onAutoAnalyzeClick?: () => void;
  isLoading: boolean;
  theme?: 'light' | 'dark';
}

const AiQueryPanel: React.FC<AiQueryPanelProps> = ({ prompt, onPromptChange, onAnalyzeClick, onAutoAnalyzeClick, isLoading, theme = 'dark' }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Efecto para auto-ajustar la altura del textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Resetear altura
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [prompt]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
      <div className="relative flex-grow w-full">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Pregunta algo sobre este gráfico..."
          className={`w-full py-2 px-3 rounded text-sm border resize-none overflow-y-hidden ${
            theme === 'dark'
              ? 'bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-400'
              : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
          } transition-colors focus:outline-none focus:ring-2 ${
            theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
          }`}
          disabled={isLoading}
          rows={1} // Empezar con una sola fila
        />
      </div>
      <div className="flex gap-1 mt-2 sm:mt-0">
        <button onClick={onAnalyzeClick} disabled={isLoading || !prompt.trim()} className={`shrink-0 py-2 px-4 rounded text-sm font-medium ${isLoading ? 'bg-blue-700 text-blue-100 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors`}>
          {isLoading ? 'Analizando...' : 'Analizar'}
        </button>
        {onAutoAnalyzeClick && (
          <button onClick={onAutoAnalyzeClick} disabled={isLoading} className={`shrink-0 py-2 px-4 rounded text-sm font-medium ${isLoading ? 'bg-green-700 text-green-100 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'} transition-colors`}>
            {isLoading ? 'Auto...' : 'Auto-Analizar'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AiQueryPanel;