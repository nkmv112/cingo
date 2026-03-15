import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, BookOpen, Terminal, Play, CheckCircle, ArrowRight } from 'lucide-react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { curriculumData } from '../data/curriculumData';

type LessonPhase = 'teaching' | 'questionnaire' | 'summary';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
  hasCodeEditor?: boolean;
  initialCode?: string;
}

const Lesson = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Phase Routing
  const [phase, setPhase] = useState<LessonPhase>('teaching');
  
  // Teaching State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Questionnaire State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Compiler State
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Ready...");
  const [isRunning, setIsRunning] = useState(false);

  // ----------------------------------------------------
  // Mock Lesson Data (Expanded multi-slide layout!)
  // ----------------------------------------------------
  const lessonData = {
    title: "Variables in C",
    slides: [
      {
        id: 1,
        title: "What are Variables?",
        content: (
          <>
            <p style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.8 }}>
              In C, a variable is essentially a storage location in the computer's memory that we can name and use to hold data. Think of it like a labeled box where you can put numbers or text!
            </p>
            <p style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.8 }}>
              To create a variable, you must specify its <strong style={{ color: 'var(--color-primary)' }}>type</strong> and its <strong style={{ color: 'var(--color-primary)' }}>name</strong>. Here are the 3 most common:
            </p>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '1.2rem' }}>
              <li style={{ marginBottom: '16px', padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px' }}><strong style={{ color: '#60a5fa' }}>int</strong> - stores whole numbers (e.g., 25, -10)</li>
              <li style={{ marginBottom: '16px', padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px' }}><strong style={{ color: '#f472b6' }}>float</strong> - stores decimal numbers (e.g., 3.14, -0.5)</li>
              <li style={{ marginBottom: '16px', padding: '16px', backgroundColor: 'var(--color-surface-hover)', borderRadius: '8px' }}><strong style={{ color: '#fbbf24' }}>char</strong> - stores single characters (e.g., 'A', 'z')</li>
            </ul>
          </>
        )
      },
      {
        id: 2,
        title: "Coding Variables",
        hasCodeEditor: true,
        initialCode: `#include <stdio.h>\n\nint main() {\n    // 1. Declare an integer named 'age'\n    int age = 25;\n    \n    // 2. Print the variable using '%d' as a placeholder\n    printf("My age is %d\\n", age);\n    \n    // Try changing 'age' to a different number and run it!\n    return 0;\n}`,
        content: (
          <>
            <p style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.8 }}>
              Let's declare an <code>int</code> and print it out!
            </p>
            <p style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.8 }}>
              To print a variable in C using <code>printf</code>, you need a <strong>format specifier</strong>. For an <code>int</code>, we use <code>%d</code> inside the string, and pass the variable after the comma!
            </p>
            <p style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--color-primary)', fontWeight: 'bold' }}>
              👉 Try running the code on the right, then try changing 'age' to your age!
            </p>
          </>
        )
      },
      {
        id: 3,
        title: "Characters and Floats",
        hasCodeEditor: true,
        initialCode: `#include <stdio.h>\n\nint main() {\n    float price = 19.99;\n    char grade = 'A';\n    \n    // Floats use %f, Chars use %c\n    printf("The price is $%f\\n", price);\n    printf("Your grade is %c\\n", grade);\n    \n    return 0;\n}`,
        content: (
          <>
            <p style={{ marginBottom: '24px', fontSize: '1.2rem', lineHeight: 1.8 }}>
              Different data types require different format specifiers in <code>printf</code>.
            </p>
            <ul style={{ paddingLeft: '24px', fontSize: '1.2rem', lineHeight: 1.8 }}>
              <li><code>%f</code> is used for <strong>floats</strong>.</li>
              <li><code>%c</code> is used for <strong>chars</strong>.</li>
            </ul>
            <p style={{ marginTop: '24px', fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--color-primary)', fontWeight: 'bold' }}>
              👉 Run the code, then try changing the grade to 'B'!
            </p>
          </>
        )
      }
    ] as Slide[],
    questions: [
      { id: 1, text: "Which keyword is used to store whole numbers?", options: ["float", "char", "int", "string"], correctIndex: 2 },
      { id: 2, text: "How do you declare a variable named 'score' holding the value 100?", options: ["score = 100;", "int score = 100;", "variable score = 100;", "100 = int score;"], correctIndex: 1 },
      { id: 3, text: "What format specifier prints a character (char)?", options: ["%d", "%f", "%c", "%s"], correctIndex: 2 },
      { id: 4, text: "Which of these is a valid float declaration?", options: ["float price = 19.99;", "int price = 19.99;", "char price = '19.99';", "float price = '19';"], correctIndex: 0 },
      { id: 5, text: "Why do we need variable types in C?", options: ["To make the code look colorful.", "So the compiler knows how much memory to allocate.", "Because C doesn't support numbers.", "Types are optional in C."], correctIndex: 1 }
    ] as Question[]
  };

  // Sync editor code when slide changes
  useEffect(() => {
    if (phase === 'teaching' && lessonData.slides[currentSlideIndex].hasCodeEditor) {
      setCode(lessonData.slides[currentSlideIndex].initialCode || "");
      setOutput("Ready...");
    }
  }, [currentSlideIndex, phase]);

  const handleNextSlide = () => {
    if (currentSlideIndex < lessonData.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      setPhase('questionnaire');
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Compiling and running...");
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await axios.post(`${API_URL}/execute`, {
        files: [{ name: "main.c", content: code }]
      });
      
      if (response.data.compile && response.data.compile.stderr) {
         setOutput("COMPILER ERROR:\n" + response.data.compile.stderr);
      } else if (response.data.run && response.data.run.stderr) {
         setOutput((response.data.run.stdout || "") + "\nRUNTIME ERROR:\n" + response.data.run.stderr);
      } else if (response.data.run) {
         setOutput(response.data.run.stdout || "Program executed successfully with no output.");
      } else {
         setOutput("Execution failed: Unknown response from server.");
      }
    } catch(error: any) {
      if (error.response && error.response.data) {
        setOutput("API ERROR:\\n" + JSON.stringify(error.response.data, null, 2));
      } else {
        setOutput("Error reaching compiler API: " + error.message);
      }
    }
    setIsRunning(false);
  };

  const currentSlide = lessonData.slides[currentSlideIndex];
  const currentQ = lessonData.questions[currentQuestionIndex];

  // Calculate Progress
  const totalSteps = lessonData.slides.length + lessonData.questions.length;
  const currentStep = phase === 'teaching' ? currentSlideIndex : lessonData.slides.length + currentQuestionIndex;
  const progressPercentage = phase === 'summary' ? 100 : ((currentStep) / totalSteps) * 100;
  const passed = correctAnswers >= 4;

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsChecked(true);
    const correct = selectedOption === currentQ.correctIndex;
    setIsCorrect(correct);
    if (correct) setCorrectAnswers(prev => prev + 1);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < lessonData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsChecked(false);
      setSelectedOption(null);
    } else {
      setPhase('summary');
    }
  };

  const handleNextLesson = () => {
     // Find exactly the next chronological lesson in the entire curriculum array.
     let nextLessonId = null;
     let foundCurrent = false;
     
     for (const unit of curriculumData) {
        for (const lesson of unit.lessons) {
           if (foundCurrent) {
              nextLessonId = lesson.id;
              break;
           }
           if (lesson.id === Number(id) || (!id && lesson.id === 101)) { // Fallback to 101
              foundCurrent = true;
           }
        }
        if (nextLessonId) break;
     }

     if (nextLessonId) {
        navigate(`/lesson/${nextLessonId}`);
        // Reset states for the new lesson explicitly to reuse the component safely
        setPhase('teaching');
        setCurrentSlideIndex(0);
        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
        setSelectedOption(null);
        setIsChecked(false);
        setIsCorrect(false);
     } else {
        navigate('/'); // If no next lesson, just go to dashboard
     }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--color-bg)' }}>
      
      {/* Header with Progress Bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '24px 48px', gap: '24px', flexShrink: 0 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <X size={28} />
        </button>
        <div className="progress-bar-bg" style={{ flex: 1 }}>
          <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)', fontWeight: 'bold', fontSize: '1.2rem' }}>
          ❤️ 5
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 24px', overflowY: 'auto' }}>
        
        {phase === 'teaching' && (
          <div className="slide-up-animation" style={{ 
            maxWidth: currentSlide.hasCodeEditor ? '1400px' : '750px', 
            width: '100%', 
            display: 'flex', 
            flexDirection: currentSlide.hasCodeEditor ? 'row' : 'column',
            gap: '48px',
            marginTop: '32px', 
            marginBottom: '100px' 
          }}>
            
            {/* Standard Markdown/Text Column */}
            <div style={{ flex: currentSlide.hasCodeEditor ? '1' : 'none' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                   <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: 'var(--shadow-primary)' }}>
                       <BookOpen size={28} />
                   </div>
                   <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-text-main)', margin: 0 }}>
                     {lessonData.title} <span style={{ color: 'var(--color-text-muted)', fontSize: '1.5rem', marginLeft: '12px' }}>({currentSlideIndex + 1}/{lessonData.slides.length})</span>
                   </h1>
               </div>
               <div className="card" style={{ padding: '32px', color: 'var(--color-text-main)' }}>
                 <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--color-primary)' }}>{currentSlide.title}</h2>
                 {currentSlide.content}
               </div>
            </div>

            {/* Interactive Code Column */}
            {currentSlide.hasCodeEditor && (
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ flex: '1', minHeight: '400px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--color-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  <div style={{ backgroundColor: '#1e1e1e', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
                     <span style={{ color: '#aaa', fontFamily: 'monospace', fontWeight: 'bold' }}>main.c</span>
                     <button 
                       onClick={handleRunCode}
                       disabled={isRunning}
                       className="btn btn-primary" 
                       style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                       <Play size={16} fill="white" /> {isRunning ? "Running..." : "Run Code"}
                     </button>
                  </div>
                  <Editor
                    height="calc(100% - 60px)"
                    language="c"
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val || "")}
                    options={{ minimap: { enabled: false }, fontSize: 16, quickSuggestions: false }}
                  />
                </div>

                <div style={{ flex: '0.4', minHeight: '150px', backgroundColor: '#09090b', borderRadius: '12px', border: '2px solid var(--color-border)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', marginBottom: '16px', fontWeight: 'bold' }}>
                     <Terminal size={18} /> Console Output
                   </div>
                   <pre style={{ flex: 1, color: isRunning ? '#6b7280' : '#10b981', fontFamily: 'monospace', fontSize: '1.1rem', whiteSpace: 'pre-wrap', margin: 0 }}>
                     {output}
                   </pre>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Questionnaire & Summary unchanged logic... */}
        {phase === 'questionnaire' && (
          <div className="slide-up-animation" key={currentQuestionIndex} style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', marginTop: '48px', marginBottom: '100px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px', color: 'var(--color-text-main)' }}>
             <span style={{ color: 'var(--color-primary)', marginRight: '12px' }}>Q{currentQuestionIndex + 1}.</span> 
             {currentQ.text}
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentQ.options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => !isChecked && setSelectedOption(index)}
                  style={{
                    padding: '16px 24px',
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${selectedOption === index ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: selectedOption === index ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                    color: selectedOption === index ? 'var(--color-primary)' : 'var(--color-text-main)',
                    textAlign: 'left',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    cursor: isChecked ? 'default' : 'pointer',
                    transition: 'all 0.1s',
                    boxShadow: selectedOption === index ? 'var(--shadow-primary)' : '0 2px 0 var(--color-border)',
                    transform: selectedOption === index ? 'translateY(2px)' : 'none',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'summary' && (
          <div className="bounce-animation" style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '64px', textAlign: 'center' }}>
            {passed ? (
               <div className="pulse-slow" style={{ fontSize: '100px', marginBottom: '16px' }}>
                 🎇
               </div>
            ) : (
               <div style={{ fontSize: '80px', marginBottom: '24px' }}>💔</div>
            )}
            
            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: passed ? 'var(--color-warning)' : 'var(--color-danger)', marginBottom: '16px', textShadow: passed ? '0 0 20px rgba(245, 158, 11, 0.4)' : 'none' }}>
              {passed ? 'Topic Mastered!' : 'Keep Practicing!'}
            </h1>
            <p style={{ fontSize: '1.3rem', color: 'var(--color-text-main)', marginBottom: '32px', fontWeight: 'bold' }}>
              You correctly answered <span style={{ color: 'var(--color-primary)' }}>{correctAnswers} out of {lessonData.questions.length}</span> questions.
            </p>

            {passed && (
               <div className="card" style={{ padding: '32px', width: '100%', border: '4px solid var(--color-primary)' }}>
                 <h2 style={{ fontSize: '1.6rem', color: 'var(--color-text-main)', marginBottom: '16px' }}>Do you want to move to the next topic?</h2>
                 <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>You successfully crushed the requirements! Keep the streak alive.</p>
                 <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                   <button className="btn btn-outline" onClick={() => navigate('/')} style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
                      Back to Path
                   </button>
                   <button className="btn btn-primary" onClick={handleNextLesson} style={{ padding: '12px 24px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Next Topic <ArrowRight size={20} />
                   </button>
                 </div>
               </div>
            )}
            
            {!passed && (
               <div className="card" style={{ width: '100%', backgroundColor: 'var(--color-surface)', marginBottom: '32px' }}>
                 <h3 style={{ fontSize: '1.4rem', color: 'var(--color-text-main)', marginBottom: '16px' }}>Requirement: 4/5 Correct to Pass</h3>
                 <div style={{ color: 'var(--color-danger)', fontWeight: 800, fontSize: '1.2rem' }}>Score too low. You must review the lesson and try again.</div>
               </div>
            )}
          </div>
        )}

      </div>

      {/* Bottom Action Bar */}
      <div style={{ 
        borderTop: '2px solid var(--color-border)', 
        padding: '24px 0',
        backgroundColor: isChecked ? (isCorrect ? '#143825' : '#451010') : 'var(--color-bg)',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div>
            {phase === 'questionnaire' && isChecked && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <div style={{ 
                        width: '32px', height: '32px', borderRadius: '50%', 
                        backgroundColor: isCorrect ? 'var(--color-success)' : 'var(--color-danger)', 
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold', fontSize: '20px'
                     }}>
                        {isCorrect ? '✓' : '×'}
                     </div>
                     <span style={{ fontSize: '1.5rem', fontWeight: 900, color: isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>
                        {isCorrect ? 'Excellent!' : 'Correct Solution:'}
                     </span>
                </div>
                {!isCorrect && (
                   <div style={{ color: 'var(--color-danger)', fontWeight: 600, fontSize: '1.1rem', marginTop: '4px' }}>
                      {currentQ.options[currentQ.correctIndex]}
                   </div>
                )}
              </div>
            )}
            
            {phase === 'teaching' && (
               <div style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Progress: Slide {currentSlideIndex + 1} of {lessonData.slides.length}
               </div>
            )}
          </div>

          <div>
            {phase === 'teaching' && (
              <button className="btn btn-primary" onClick={handleNextSlide} style={{ width: '200px' }}>
                {currentSlideIndex < lessonData.slides.length - 1 ? 'Next Topic' : 'Start Questions'}
              </button>
            )}

            {phase === 'questionnaire' && (
              <button 
                className={`btn ${isChecked ? (isCorrect ? 'btn-primary' : 'btn-danger') : (selectedOption !== null ? 'btn-primary' : '')}`}
                style={{ 
                  width: '150px', 
                  backgroundColor: (!isChecked && selectedOption === null) ? 'var(--color-surface)' : undefined, 
                  color: (!isChecked && selectedOption === null) ? 'var(--color-text-muted)' : undefined, 
                  cursor: (!isChecked && selectedOption === null) ? 'not-allowed' : 'pointer' 
                }}
                disabled={!isChecked && selectedOption === null}
                onClick={isChecked ? handleContinue : handleCheck}
              >
                {isChecked ? 'Continue' : 'Check'}
              </button>
            )}

            {phase === 'summary' && !passed && (
              <button className="btn btn-primary" onClick={() => window.location.reload()} style={{ width: '200px' }}>
                Retry Lesson
              </button>
            )}
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default Lesson;
