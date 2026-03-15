import React from 'react';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
  hasCodeEditor?: boolean;
  initialCode?: string;
}

export interface LessonData {
  title: string;
  slides: Slide[];
  questions: Question[];
}

// Hand-crafted lessons for Unit 1 & 4 (Expanding for "Fully Made" feel)
export const lessons: Record<number, LessonData> = {
  101: {
    title: "What is programming",
    slides: [
      { id: 1, title: "The Machine Language", content: React.createElement('p', null, "Computers speak in 1s and 0s.") },
      { id: 2, title: "High-Level Languages", content: React.createElement('p', null, "C allows us to write human-readable code.") },
      { id: 3, title: "Interactive Console", hasCodeEditor: true, initialCode: '#include <stdio.h>\n\nint main() {\n    printf("Welcome to C!\\n");\n    return 0;\n}', content: React.createElement('p', null, "Try running your first code.") }
    ],
    questions: [{ id: 1, text: "What is 1 and 0 called?", options: ["Decimal", "Binary", "Octal"], correctIndex: 1 }]
  },
  102: { title: "History & Features of C", slides: [], questions: [] },
  103: { title: "Applications of C", slides: [], questions: [] },
  104: { title: "Structure of a C program", slides: [], questions: [] },
  105: { title: "Hello World Program", slides: [], questions: [] },
  // Unit 4: Operators
  401: {
    title: "Arithmetic Operators",
    slides: [
      { id: 1, title: "Basic Math", content: React.createElement('p', null, "Perform Addition, Subtraction, etc.") },
      { id: 2, title: "Modulus", content: React.createElement('p', null, "Use % to find the remainder.") },
      { id: 3, title: "Math Lab", hasCodeEditor: true, initialCode: '#include <stdio.h>\n\nint main() {\n    printf("Sum: %d\\n", 5 + 10);\n    return 0;\n}', content: React.createElement('p', null, "Practice math operators.") }
    ],
    questions: [{ id: 1, text: "What operator is used for remainder?", options: ["/", "%", "&"], correctIndex: 1 }]
  },
  402: { title: "Relational Operators", slides: [], questions: [] },
  403: { title: "Logical Operators", slides: [], questions: [] },
  404: { title: "Bitwise Operators", slides: [], questions: [] },
  405: { title: "Assignment Operators", slides: [], questions: [] },
};

// Full synchronization map from curriculumData.ts
const fullTitleMap: Record<number, string> = {
  101: "What is programming", 102: "History & Features of C", 103: "Applications of C", 104: "Structure of a C program", 105: "Hello World Program",
  201: "C Character Set", 202: "Tokens in C", 203: "Keywords", 204: "Identifiers", 205: "Constants",
  301: "Basic Data Types", 302: "Variables & Declaration", 303: "Initialization", 304: "Type Modifiers", 305: "Type Conversion",
  401: "Arithmetic Operators", 402: "Relational Operators", 403: "Logical Operators", 404: "Bitwise Operators", 405: "Assignment Operators",
  501: "Expression Evaluation", 502: "Precedence Rules", 503: "Associativity", 504: "Mixed Expressions", 505: "Practice Problems",
  601: "printf() Function", 602: "scanf() Function", 603: "Format Specifiers", 604: "Reading Multiple Inputs", 605: "Simple IO Programs",
  701: "if Statement", 702: "if-else Statement", 703: "Nested if", 704: "else if Ladder", 705: "Condition Programs",
  801: "switch Syntax", 802: "Case Labels", 803: "break Statement", 804: "default Case", 805: "Menu-driven Program",
  901: "while Loop", 902: "do-while Loop", 903: "for Loop", 904: "Loop Comparison", 905: "Example Programs",
  1001: "break Statement", 1002: "continue Statement", 1003: "Nested Loops", 1004: "Infinite Loops", 1005: "Pattern Programs",
  1101: "Concept of Arrays", 1102: "Declaring Arrays", 1103: "Array Initialization", 1104: "Accessing Elements", 1105: "Example Programs",
  1201: "Sum of Elements", 1202: "Average Calculation", 1203: "Finding Largest", 1204: "Finding Smallest", 1205: "Searching Element",
  1301: "Sequential Search", 1302: "Algorithm Explanation", 1303: "C Implementation", 1304: "Time Complexity", 1305: "Practice Programs",
  1401: "Sorting Concept", 1402: "Bubble Sort Algorithm", 1403: "Bubble Sort Program", 1404: "Sorting Strings", 1405: "Practice Exercises",
  1501: "enum Concept", 1502: "Syntax of enum", 1503: "Using enum", 1504: "Advantages of enum", 1505: "Examples",
  1601: "Meaning of typedef", 1602: "Syntax", 1603: "New Data Types", 1604: "Examples", 1605: "Practice Programs",
  1701: "Concept of 2D Arrays", 1702: "Declaration", 1703: "Accessing 2D Elements", 1704: "Input and Output", 1705: "Example Programs",
  1801: "Matrix Addition", 1802: "Matrix Subtraction", 1803: "Matrix Multiplication", 1804: "Matrix Transpose", 1805: "Practice Programs",
  1901: "Row Sum & Column Sum", 1902: "Diagonal Elements", 1903: "Matrix Comparison", 1904: "Identity Matrix", 1905: "Practice Problems",
  2001: "Using Nested Loops", 2002: "Traversing 2D Arrays", 2003: "Pattern Generation", 2004: "Matrix Algorithms", 2005: "Practice Programs",
  2101: "What is a String", 2102: "Declaring Strings", 2103: "Reading Strings", 2104: "Displaying Strings", 2105: "Simple String Programs",
  2201: "scanf() with Strings", 2202: "gets() and puts()", 2203: "Character Arrays", 2204: "String Length Concept", 2205: "Practice Programs",
  2301: "strlen()", 2302: "strcpy()", 2303: "strcat()", 2304: "strcmp()", 2305: "Practice Examples",
  2401: "String Reverse", 2402: "Palindrome String", 2403: "String Comparison Logic", 2404: "String Concatenation", 2405: "Practice Programs",
  2501: "Substring Concept", 2502: "String Matching", 2503: "Basic Search Algorithm", 2504: "C Implementation", 2505: "Practice Exercises",
  2601: "Prime Numbers", 2602: "Factorial", 2603: "Fibonacci Series", 2604: "Armstrong Number", 2605: "Perfect Number",
  2701: "Star Patterns", 2702: "Number Patterns", 2703: "Pyramid Patterns", 2704: "Reverse Patterns", 2705: "Mixed Patterns",
  2801: "Calculator Program", 2802: "Menu using switch", 2803: "Loop-based Menu", 2804: "Multi-op Programs", 2805: "Practice Exercises",
  2901: "Algorithm Design", 2902: "Flowchart Basics", 2903: "Program Tracing", 2904: "Debugging Techniques", 2905: "Code Optimization",
  3001: "Arrays Revision", 3002: "Strings Revision", 3003: "Control Flow Revision", 3004: "KTU Exam Programs", 3005: "Mock Test"
};

const moduleGuides: Record<number, string> = {
  1: "Understanding basic syntax, control flow and operators in C.",
  2: "Mastering linear data structures like Arrays and standard algorithms.",
  3: "Working with complex data: Matrices, Enums, and custom typedefs.",
  4: "Advanced text processing using Strings and the String Library.",
  5: "Applied Logic: Number programs, pattern generation, and project revsion."
};

for (let unit = 1; unit <= 30; unit++) {
  for (let l_idx = 1; l_idx <= 5; l_idx++) {
    const lid = unit * 100 + l_idx;
    const moduleNum = Math.ceil(unit / 6);
    const title = fullTitleMap[lid] || `Unit ${unit} Topic ${l_idx}`;

    if (!lessons[lid] || lessons[lid].slides.length === 0) {
      lessons[lid] = {
        title: title,
        slides: [
          {
            id: 1, title: `Overview of ${title}`,
            content: React.createElement('div', null, 
              React.createElement('p', { style: { fontSize: '1.2rem', marginBottom: '15px' } }, `This lesson covers ${title} which is a fundamental part of C programming.`),
              React.createElement('p', { style: { color: 'var(--color-primary)', fontWeight: 'bold' } }, `Module Guide: ${moduleGuides[moduleNum]}`)
            )
          },
          {
            id: 2, title: "Key Concepts",
            content: React.createElement('ul', { style: { fontSize: '1.1rem', lineHeight: 1.8 } },
              React.createElement('li', null, `Syntax rules for ${title}.`),
              React.createElement('li', null, `Best practices and common pitfalls.`),
              React.createElement('li', null, `Memory efficiency considerations.`)
            )
          },
          {
            id: 3, title: "Practice Playground",
            hasCodeEditor: true,
            initialCode: `#include <stdio.h>\n\nint main() {\n    // Practice ${title} here\n    printf("Mastering ${title}!\\n");\n    return 0;\n}`,
            content: React.createElement('p', null, "Edit the code and run it to see the feedback.")
          }
        ],
        questions: [{ id: 1, text: `Are you ready to master ${title}?`, options: ["Yes!", "Tell me more"], correctIndex: 0 }]
      };
    }
  }
}
