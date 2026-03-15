import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ChevronRight, Trophy, Brain } from 'lucide-react';
import { useProgress } from '../auth/ProgressContext';

const assessmentQuestions = [
  {
    question: "What is the correct way to declare an integer variable 'x' and assign it the value 10?",
    options: ["int x = 10;", "x := 10", "var x = 10", "integer x = 10"],
    answer: "int x = 10;"
  },
  {
    question: "Which of the following is used to print a message in C?",
    options: ["echo()", "console.log()", "printf()", "cout <<"],
    answer: "printf()"
  },
  {
    question: "What does '&' represent in the context of a variable in C?",
    options: ["The value of the variable", "The address of the variable", "Bitwise AND", "A pointer"],
    answer: "The address of the variable"
  },
  {
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "do-while", "None of these"],
    answer: "do-while"
  },
  {
    question: "What is the output of '5 / 2' in C (using integer division)?",
    options: ["2.5", "2", "3", "0"],
    answer: "2"
  }
];

const Assessment = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const navigate = useNavigate();
  const { markHistoryAsCompleted } = useProgress();

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === assessmentQuestions[currentIdx].answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < assessmentQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const finishAssessment = () => {
    // If score is high, pre-unlock some units
    if (score >= 4) {
      // Logic to unlock Unit 1 and 2 automatically
      markHistoryAsCompleted([101, 102, 103, 104, 105, 201, 202, 203]);
    } else if (score >= 2) {
      markHistoryAsCompleted([101, 102, 103]);
    }
    navigate('/login');
  };

  if (showResult) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="card slide-up-animation" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '48px' }}>
          <Trophy size={80} color="var(--color-warning)" style={{ marginBottom: '24px' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '16px' }}>Assessment Done!</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
            You scored <strong>{score} out of {assessmentQuestions.length}</strong>. 
            We've customized your learning path based on your performance.
          </p>
          <button onClick={finishAssessment} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}>
            START LEARNING
          </button>
        </div>
      </div>
    );
  }

  const q = assessmentQuestions[currentIdx];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      
      {/* Progress Indicator */}
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 800, color: 'var(--color-text-muted)' }}>
          <span>BASELINE ASSESSMENT</span>
          <span>{currentIdx + 1} / {assessmentQuestions.length}</span>
        </div>
        <div className="progress-bar-bg" style={{ height: '12px' }}>
          <div className="progress-bar-fill" style={{ width: `${((currentIdx + 1) / assessmentQuestions.length) * 100}%` }} />
        </div>
      </div>

      <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '40px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '32px', lineHeight: 1.4 }}>
          {q.question}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {q.options.map((opt) => {
            const isCorrect = opt === q.answer;
            const isSelected = opt === selectedOption;
            
            let btnStyle: React.CSSProperties = {
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-border)',
              backgroundColor: 'transparent',
              textAlign: 'left',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: isAnswered ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s'
            };

            if (isAnswered) {
              if (isCorrect) {
                btnStyle.borderColor = 'var(--color-success)';
                btnStyle.backgroundColor = 'rgba(16, 185, 129, 0.1)';
              } else if (isSelected) {
                btnStyle.borderColor = 'var(--color-danger)';
                btnStyle.backgroundColor = 'rgba(239, 68, 68, 0.1)';
              }
            }

            return (
              <button 
                key={opt}
                onClick={() => handleOptionClick(opt)}
                style={btnStyle}
                onMouseOver={(e) => !isAnswered && (e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)')}
                onMouseOut={(e) => !isAnswered && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {opt}
                {isAnswered && isCorrect && <CheckCircle size={24} color="var(--color-success)" />}
                {isAnswered && isSelected && !isCorrect && <XCircle size={24} color="var(--color-danger)" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <button 
            onClick={handleNext}
            className="btn btn-primary" 
            style={{ marginTop: '32px', width: '100%', padding: '16px', fontSize: '1.1rem' }}
          >
            {currentIdx === assessmentQuestions.length - 1 ? 'FINISH' : 'NEXT'} <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Assessment;
