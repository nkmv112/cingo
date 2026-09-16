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

export const lessons: Record<number, LessonData> = {
  // ─── UNIT 1: INTRODUCTION & COMPILATION ARCHITECTURE ──────────────────────
  101: {
    title: "C Memory Model & Machine Architecture",
    slides: [
      {
        id: 1,
        title: "Memory Architecture & Von Neumann Model",
        content: React.createElement('div', null,
          React.createElement('p', null, "In computer engineering, C operates closest to the metal. A running C program divides memory into four primary segments:"),
          React.createElement('ul', { style: { lineHeight: '1.8', margin: '12px 0' } },
            React.createElement('li', null, React.createElement('strong', null, "Text/Code Segment:"), " Read-only machine instructions executed by the CPU."),
            React.createElement('li', null, React.createElement('strong', null, "Data Segment (Initialized/BSS):"), " Global and static variables."),
            React.createElement('li', null, React.createElement('strong', null, "Heap:"), " Dynamically managed runtime memory (malloc, free). Grows upward."),
            React.createElement('li', null, React.createElement('strong', null, "Stack:"), " Stack frames for function calls, local variables, and return addresses. Grows downward.")
          )
        )
      },
      {
        id: 2,
        title: "The 4 Stages of C Compilation",
        content: React.createElement('div', null,
          React.createElement('p', null, "A common university viva question: What happens when GCC compiles your code?"),
          React.createElement('ol', { style: { lineHeight: '1.8', margin: '12px 0' } },
            React.createElement('li', null, React.createElement('strong', null, "Preprocessing (cpp):"), " Expands macros (#define) and headers (#include) -> produces .i file."),
            React.createElement('li', null, React.createElement('strong', null, "Compilation (gcc):"), " Converts preprocessed code to Assembly instructions -> produces .s file."),
            React.createElement('li', null, React.createElement('strong', null, "Assembly (as):"), " Translates assembly to machine code object files -> produces .o file."),
            React.createElement('li', null, React.createElement('strong', null, "Linking (ld):"), " Merges object files and library routines (e.g. libc) -> produces final executable.")
          )
        )
      },
      {
        id: 3,
        title: "First Executable: Entry Point & Return Codes",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    printf("Operating System Environment Initialized.\\n");\n    printf("Process PID exit code: %d\\n", 0);\n    return 0;\n}',
        content: React.createElement('p', null, "Run this standard ISO C entry point with command-line arguments signature.")
      }
    ],
    questions: [
      { id: 1, text: "Which memory segment in C grows downwards towards the Heap?", options: ["Data Segment", "Stack Segment", "BSS Segment", "Text Segment"], correctIndex: 1 },
      { id: 2, text: "Which stage of compilation replaces #include <stdio.h> with header contents?", options: ["Linker", "Preprocessor", "Assembler", "Compiler"], correctIndex: 1 }
    ]
  },

  104: {
    title: "Structure of a C Program & Linkage",
    slides: [
      {
        id: 1,
        title: "Linkage & Storage Classes",
        content: React.createElement('div', null,
          React.createElement('p', null, "University curriculum covers storage classes determining scope, visibility, and lifetime:"),
          React.createElement('ul', null,
            React.createElement('li', null, React.createElement('strong', null, "auto:"), " Default for local variables (Stack lifetime)."),
            React.createElement('li', null, React.createElement('strong', null, "static:"), " Retains value between function invocations (Data segment)."),
            React.createElement('li', null, React.createElement('strong', null, "extern:"), " Global variable defined in another translation unit."),
            React.createElement('li', null, React.createElement('strong', null, "register:"), " Hints compiler to store in CPU register for fast access.")
          )
        )
      },
      {
        id: 2,
        title: "Static Lifetime Lab",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nvoid counter() {\n    static int count = 0;\n    count++;\n    printf("Function called %d times\\n", count);\n}\n\nint main() {\n    counter();\n    counter();\n    counter();\n    return 0;\n}',
        content: React.createElement('p', null, "Observe how static preservation works across function stack frames.")
      }
    ],
    questions: [
      { id: 1, text: "Where is an uninitialized global variable placed by the compiler?", options: ["Stack", "BSS Segment", "Heap", "Text Segment"], correctIndex: 1 }
    ]
  },

  // ─── UNIT 3: DATA TYPES & SIZEOF EVALUATIONS ──────────────────────────────
  301: {
    title: "Data Types & Word Alignment",
    slides: [
      {
        id: 1,
        title: "Primitive Types & Machine Words",
        content: React.createElement('div', null,
          React.createElement('p', null, "In 32/64-bit architectures, type widths and signed representations are crucial:"),
          React.createElement('ul', null,
            React.createElement('li', null, "char: 1 byte (-128 to 127 in 2's complement)"),
            React.createElement('li', null, "short: 2 bytes (-32,768 to 32,767)"),
            React.createElement('li', null, "int / long: 4 / 8 bytes depending on LP64 vs LLP64 data model"),
            React.createElement('li', null, "float / double: IEEE 754 single (32-bit) and double precision (64-bit)")
          )
        )
      },
      {
        id: 2,
        title: "Type Promotion & Sizeof Lab",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nint main() {\n    char ch = \'A\';\n    printf("sizeof(char): %zu bytes\\n", sizeof(ch));\n    printf("sizeof(\'A\') in C: %zu bytes (promoted to int)\\n", sizeof(\'A\'));\n    printf("sizeof(double): %zu bytes\\n", sizeof(double));\n    return 0;\n}',
        content: React.createElement('p', null, "Character constants in C are integer character constants of type int.")
      }
    ],
    questions: [
      { id: 1, text: "What is the return type of the sizeof operator?", options: ["int", "unsigned int", "size_t", "long"], correctIndex: 2 },
      { id: 2, text: "In 2's complement representation, what is ~0 equal to?", options: ["0", "-1", "1", "INT_MAX"], correctIndex: 1 }
    ]
  },

  // ─── UNIT 4: BITWISE OPERATORS & BITMASKS ──────────────────────────────────
  401: {
    title: "Bitwise Operations & Bitmasking",
    slides: [
      {
        id: 1,
        title: "Bitwise Manipulation in Embedded Systems",
        content: React.createElement('div', null,
          React.createElement('p', null, "Bitwise operators are tested extensively in college exams & technical interviews:"),
          React.createElement('ul', null,
            React.createElement('li', null, "Set bit k: num | (1 << k)"),
            React.createElement('li', null, "Clear bit k: num & ~(1 << k)"),
            React.createElement('li', null, "Toggle bit k: num ^ (1 << k)"),
            React.createElement('li', null, "Check bit k: (num >> k) & 1")
          )
        )
      },
      {
        id: 2,
        title: "Bitmask Lab",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nint main() {\n    int num = 8; // Binary: 0000 1000\n    // Check if 3rd bit is set\n    int isSet = (num >> 3) & 1;\n    printf("Is 3rd bit set in 8? %s\\n", isSet ? "YES" : "NO");\n    // Brian Kernighan bit trick: n & (n - 1)\n    printf("Is power of 2? %s\\n", (num & (num - 1)) == 0 ? "YES" : "NO");\n    return 0;\n}',
        content: React.createElement('p', null, "Test bitmasking and power of 2 properties.")
      }
    ],
    questions: [
      { id: 1, text: "Which expression toggles the 4th bit of variable x?", options: ["x | (1 << 4)", "x & ~(1 << 4)", "x ^ (1 << 4)", "x >> 4"], correctIndex: 2 },
      { id: 2, text: "What is the result of 5 ^ 5?", options: ["5", "0", "1", "10"], correctIndex: 1 }
    ]
  },

  // ─── UNIT 5: OPERATOR PRECEDENCE & EVALUATION TRAPS ───────────────────────
  501: {
    title: "Operator Precedence & Sequence Points",
    slides: [
      {
        id: 1,
        title: "Precedence Order & Undefined Behavior",
        content: React.createElement('div', null,
          React.createElement('p', null, "Precedence hierarchy (highest to lowest):"),
          React.createElement('ol', null,
            React.createElement('li', null, "Postfix () [] -> . ++ -- (Left-to-Right)"),
            React.createElement('li', null, "Unary ++ -- * & sizeof ! ~ (Right-to-Left)"),
            React.createElement('li', null, "Multiplicative * / % (Left-to-Right)"),
            React.createElement('li', null, "Additive + - (Left-to-Right)"),
            React.createElement('li', null, "Bitwise Shifts << >> (Left-to-Right)"),
            React.createElement('li', null, "Relational < > <= >= then Equality == !="),
            React.createElement('li', null, "Bitwise & ^ | then Logical && ||"),
            React.createElement('li', null, "Conditional ? : then Assignment = += -= (Right-to-Left)")
          )
        )
      },
      {
        id: 2,
        title: "Precedence Tracing Lab",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20, c = 30;\n    int res = a + b * c / 10 - 5;\n    // 10 + (20 * 30) / 10 - 5 = 10 + 60 - 5 = 65\n    printf("Result: %d\\n", res);\n    return 0;\n}',
        content: React.createElement('p', null, "Verify expression evaluation based on ISO C precedence table.")
      }
    ],
    questions: [
      { id: 1, text: "What is the associativity of assignment operators (=, +=, -=) in C?", options: ["Left to Right", "Right to Left", "Non-associative", "Depends on compiler"], correctIndex: 1 }
    ]
  },

  // ─── UNIT 13: SEARCHING ALGORITHMS & COMPLEXITY ───────────────────────────
  1301: {
    title: "Searching: Linear vs Binary Search & Time Complexity",
    slides: [
      {
        id: 1,
        title: "Asymptotic Complexity & Divide and Conquer",
        content: React.createElement('div', null,
          React.createElement('p', null, "College exam comparison between search algorithms:"),
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', marginTop: '12px' } },
            React.createElement('thead', null,
              React.createElement('tr', { style: { borderBottom: '2px solid #555' } },
                React.createElement('th', { style: { textAlign: 'left', padding: '8px' } }, "Algorithm"),
                React.createElement('th', { style: { textAlign: 'left', padding: '8px' } }, "Best Case"),
                React.createElement('th', { style: { textAlign: 'left', padding: '8px' } }, "Worst/Avg Case"),
                React.createElement('th', { style: { textAlign: 'left', padding: '8px' } }, "Requirement")
              )
            ),
            React.createElement('tbody', null,
              React.createElement('tr', null,
                React.createElement('td', { style: { padding: '8px' } }, "Linear Search"),
                React.createElement('td', { style: { padding: '8px' } }, "O(1)"),
                React.createElement('td', { style: { padding: '8px' } }, "O(n)"),
                React.createElement('td', { style: { padding: '8px' } }, "None")
              ),
              React.createElement('tr', null,
                React.createElement('td', { style: { padding: '8px' } }, "Binary Search"),
                React.createElement('td', { style: { padding: '8px' } }, "O(1)"),
                React.createElement('td', { style: { padding: '8px' } }, "O(log n)"),
                React.createElement('td', { style: { padding: '8px' } }, "Sorted Array")
              )
            )
          )
        )
      },
      {
        id: 2,
        title: "Binary Search Lab",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nint binarySearch(int arr[], int n, int key) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == key) return mid;\n        if (arr[mid] < key) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int data[] = {4, 12, 25, 36, 49, 64, 81};\n    int idx = binarySearch(data, 7, 36);\n    printf("Key 36 found at index: %d\\n", idx);\n    return 0;\n}',
        content: React.createElement('p', null, "Note the use of 'low + (high - low)/2' to prevent integer overflow in mid calculation.")
      }
    ],
    questions: [
      { id: 1, text: "What is the maximum number of comparisons for Binary Search in an array of 1024 elements?", options: ["10", "11", "512", "1024"], correctIndex: 1 }
    ]
  },

  // ─── UNIT 18: MATRIX ALGORITHMS ───────────────────────────────────────────
  1801: {
    title: "Matrix Multiplication & Asymptotic Analysis",
    slides: [
      {
        id: 1,
        title: "Conditions for Matrix Multiplication",
        content: React.createElement('div', null,
          React.createElement('p', null, "Standard University Lab Program (10 Marks):"),
          React.createElement('ul', null,
            React.createElement('li', null, "Matrix A (m x n) multiplied with Matrix B (p x q) requires: n == p."),
            React.createElement('li', null, "Resulting Matrix C has dimensions (m x q)."),
            React.createElement('li', null, "Standard nested loop implementation requires O(m * n * q) = O(N^3) time complexity.")
          )
        )
      },
      {
        id: 2,
        title: "Matrix Multiplication Implementation",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nint main() {\n    int A[2][2] = {{1, 2}, {3, 4}};\n    int B[2][2] = {{2, 0}, {1, 2}};\n    int C[2][2] = {0};\n    \n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            for (int k = 0; k < 2; k++) {\n                C[i][j] += A[i][k] * B[k][j];\n            }\n        }\n    }\n    printf("C[0][0]: %d | C[1][1]: %d\\n", C[0][0], C[1][1]);\n    return 0;\n}',
        content: React.createElement('p', null, "Trace matrix multiplication with 3 nested loops.")
      }
    ],
    questions: [
      { id: 1, text: "What is the time complexity of standard matrix multiplication of two N x N matrices?", options: ["O(N)", "O(N log N)", "O(N^2)", "O(N^3)"], correctIndex: 3 }
    ]
  },

  // ─── UNIT 30: UNIVERSITY EXAM PREPARATION & VIVA ───────────────────────────
  3001: {
    title: "Pointers & Arrays (University Core)",
    slides: [
      {
        id: 1,
        title: "Pointer Arithmetic & Array Decay",
        content: React.createElement('div', null,
          React.createElement('p', null, "Key concept tested in college exams: Array names decay into a pointer to their first element."),
          React.createElement('ul', null,
            React.createElement('li', null, "arr[i] is identical to *(arr + i) and *(i + arr)"),
            React.createElement('li', null, "Pointer increment: ptr + 1 advances memory by 1 * sizeof(*ptr) bytes"),
            React.createElement('li', null, "*ptr++ returns current value then increments address; (*ptr)++ increments the value itself.")
          )
        )
      },
      {
        id: 2,
        title: "Pointer Dereferencing Lab",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nint main() {\n    int arr[] = {100, 200, 300};\n    int *p = arr;\n    printf("*p = %d\\n", *p);\n    printf("*(p+1) = %d\\n", *(p+1));\n    printf("2[arr] = %d (commutative trick)\\n", 2[arr]);\n    return 0;\n}',
        content: React.createElement('p', null, "Test pointer arithmetic and array indexing equivalence.")
      }
    ],
    questions: [
      { id: 1, text: "If ptr points to an int at address 0x1000 (sizeof(int)=4), what address is ptr + 3?", options: ["0x1003", "0x100C", "0x1012", "0x1006"], correctIndex: 1 }
    ]
  },

  3004: {
    title: "KTU / University Exam High-Frequency Problems",
    slides: [
      {
        id: 1,
        title: "Top 5 Lab & Theory Questions",
        content: React.createElement('div', null,
          React.createElement('ol', { style: { lineHeight: '1.8' } },
            React.createElement('li', null, React.createElement('strong', null, "Armstrong & Palindrome:"), " Loop invariants and digit extraction (6 Marks)."),
            React.createElement('li', null, React.createElement('strong', null, "Matrix Transpose & Trace:"), " 2D array nested loops and symmetric checks (8 Marks)."),
            React.createElement('li', null, React.createElement('strong', null, "Call-by-Value vs Call-by-Reference:"), " Stack frames and pointer dereferencing (6 Marks)."),
            React.createElement('li', null, React.createElement('strong', null, "Dynamic Memory Management:"), " malloc vs calloc, free(), and memory leaks (8 Marks)."),
            React.createElement('li', null, React.createElement('strong', null, "Structures vs Unions:"), " Memory allocation and member alignment (6 Marks).")
          )
        )
      },
      {
        id: 2,
        title: "Call-by-Reference Verification",
        hasCodeEditor: true,
        initialCode: '#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 15, b = 30;\n    swap(&a, &b);\n    printf("Swapped: a=%d, b=%d\\n", a, b);\n    return 0;\n}',
        content: React.createElement('p', null, "Classic pointer dereferencing swap used across engineering universities.")
      }
    ],
    questions: [
      { id: 1, text: "What is the key difference between malloc() and calloc()?", options: ["malloc initializes to zero, calloc does not", "calloc initializes allocated memory to zero, malloc leaves garbage", "malloc allocates on Stack, calloc on Heap", "malloc is faster because it frees automatically"], correctIndex: 1 }
    ]
  },

  3005: {
    title: "University Comprehensive Mock Exam",
    slides: [
      {
        id: 1,
        title: "Engineering Final Assessment",
        content: React.createElement('p', null, "Comprehensive 5-question exam covering C memory models, pointer syntax, bitwise logic, and data structures. Complete all questions below.")
      }
    ],
    questions: [
      { id: 1, text: "What is the output of printf(\"%d\", sizeof(union { int a; char b[10]; double c; }));?", options: ["22 bytes", "10 bytes (or aligned to 16/8)", "8 bytes", "4 bytes"], correctIndex: 1 },
      { id: 2, text: "Which header file contains declarations for malloc(), calloc(), and free()?", options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<memory.h>"], correctIndex: 1 },
      { id: 3, text: "A function that calls itself without reaching its base case triggers what runtime fault?", options: ["Segmentation Fault / Stack Overflow", "Memory Leak in Data segment", "Deadlock", "CPU throttling"], correctIndex: 0 },
      { id: 4, text: "What does the expression 'n & (n - 1)' evaluate to when n is a positive power of 2?", options: ["n", "1", "0", "n - 1"], correctIndex: 2 },
      { id: 5, text: "If char str[] = \"KTU\"; what is sizeof(str)?", options: ["3 bytes", "4 bytes (includes null terminator '\\0')", "8 bytes", "2 bytes"], correctIndex: 1 }
    ]
  }
};

// Full synchronization map from curriculumData.ts
const fullTitleMap: Record<number, string> = {
  101: "C Memory Model & Machine Architecture", 102: "History & Features of C", 103: "Applications of C", 104: "Structure of a C Program & Linkage", 105: "Hello World Program",
  201: "C Character Set", 202: "Tokens & Lexical Analysis", 203: "Keywords in ISO C", 204: "Identifiers & Naming Scope", 205: "Constants & Literals",
  301: "Data Types & Word Alignment", 302: "Variables & Declarations", 303: "Initialization & Garbage Values", 304: "Type Modifiers & Limits", 305: "Type Conversion & Casting",
  401: "Bitwise Operations & Bitmasking", 402: "Relational Operators", 403: "Logical Operators & Short-Circuit", 404: "Bitwise Shift Operations", 405: "Compound Assignment",
  501: "Operator Precedence & Evaluation Traps", 502: "Precedence Hierarchy Rules", 503: "Associativity & Sequence Points", 504: "Complex Expressions", 505: "Practice Problems",
  601: "printf() Format Specifiers", 602: "scanf() Buffer Handling", 603: "Conversion Specifiers & Flags", 604: "Formatted Input/Output", 605: "IO Lab Programs",
  701: "if Conditional Branching", 702: "if-else & Ternary Operator", 703: "Nested Branching", 704: "else if Ladder Decisions", 705: "Branching Lab Programs",
  801: "switch-case Mechanics", 802: "Case Labels & Fall-Through", 803: "break Statement in Switch", 804: "default Case Handling", 805: "Menu-Driven System Design",
  901: "while Loop Invariants", 902: "do-while Post-Condition Loop", 903: "for Loop Architecture", 904: "Loop Performance Comparison", 905: "Series Summation Programs",
  1001: "break & Early Termination", 1002: "continue & Skip Execution", 1003: "Nested Loop Complexity O(n^2)", 1004: "Infinite Loops & Halting", 1005: "Matrix Patterns & Pyramids",
  1101: "Array Memory Layout & Contiguity", 1102: "Array Declaration & Bounds", 1103: "Array Initialization in Stack", 1104: "Accessing Array Subscripts", 1105: "Array Processing Programs",
  1201: "Array Summation & Mean", 1202: "Variance & Standard Deviation", 1203: "Finding Maximum & Minimum", 1204: "Second Largest Element", 1205: "Linear Scan Lab",
  1301: "Searching: Linear vs Binary Search", 1302: "Binary Search Divide & Conquer", 1303: "Binary Search Implementation", 1304: "Time Complexity O(log n)", 1305: "Search Practice Problems",
  1401: "Sorting Algorithms Overview", 1402: "Bubble Sort Passes & Inversions", 1403: "Bubble Sort Implementation", 1404: "Selection Sort Algorithm", 1405: "Insertion Sort Algorithm",
  1501: "Enumerations (enum) in C", 1502: "Enum Syntax & Underlying Types", 1503: "State Machines using Enum", 1504: "Type Safety & Readability", 1505: "Enum Practice Systems",
  1601: "Type Aliasing with typedef", 1602: "typedef Syntax & Pointer Aliasing", 1603: "User-Defined Abstract Types", 1604: "Function Pointer Typedefs", 1605: "Engineering Lab Exercises",
  1701: "2D Arrays & Row-Major Order", 1702: "Matrix Declaration in Memory", 1703: "Accessing Elements arr[i][j]", 1704: "Matrix Input/Output Routines", 1705: "2D Array Lab Programs",
  1801: "Matrix Multiplication & Complexity", 1802: "Matrix Addition & Subtraction", 1803: "Matrix Scalar Multiplication", 1804: "Matrix Transpose & Symmetry", 1805: "Matrix Lab Problems",
  1901: "Row & Column Sums in Matrices", 1902: "Main & Anti-Diagonal Elements", 1903: "Trace & Determinant Concepts", 1904: "Identity & Sparse Matrices", 1905: "Practice Matrix Problems",
  2001: "Nested Loop Traversal Patterns", 2002: "Spiral Matrix Traversal", 2003: "Pattern Generation Algorithms", 2004: "Grid Traversal Complexity", 2005: "University Lab Exercises",
  2101: "Strings as Null-Terminated Arrays", 2102: "Character Array vs String Literal", 2103: "Reading Strings (Buffer Overflow Risk)", 2104: "Displaying Strings", 2105: "String Lab Programs",
  2201: "Safe String Input (fgets vs scanf)", 2202: "Character Handling functions", 2203: "ASCII Conversions & Case Change", 2204: "Manual String Length Count", 2205: "String Processing Exercises",
  2301: "strlen() Implementation & O(n)", 2302: "strcpy() vs strncpy() Safety", 2303: "strcat() & Concatenation", 2304: "strcmp() Lexicographical Compare", 2305: "String Library Lab",
  2401: "In-Place String Reversal", 2402: "Palindrome String Verification", 2403: "String Comparison Logic", 2404: "Anagram Checking Algorithm", 2405: "String Algorithm Problems",
  2501: "Substring Search & Sliding Window", 2502: "Naive Pattern Matching Algorithm", 2503: "Search Complexity Analysis", 2504: "C Substring Implementation", 2505: "String Matching Exercises",
  2601: "Prime Sieve & Primality Testing", 2602: "Recursive Factorial & Stack Depth", 2603: "Fibonacci Sequence & Recursion Tree", 2604: "Armstrong & Digital Roots", 2605: "GCD Euclidean Algorithm",
  2701: "Floyd's & Pascal's Triangles", 2702: "Pyramid & Diamond Patterns", 2703: "Number Spiral Patterns", 2704: "Recursive Pattern Generation", 2705: "Exam Pattern Problems",
  2801: "Menu-Driven Calculator in C", 2802: "State Loop & User Navigation", 2803: "Matrix Menu-Driven Tool", 2804: "Modular Function Design", 2805: "Software Architecture Lab",
  2901: "Asymptotic Notation (Big-O, Omega)", 2902: "Flowchart & Control Flow Graphs", 2903: "Memory Tracing & Call Stack", 2904: "GDB Debugging & Core Dumps", 2905: "Code Optimization Techniques",
  3001: "Pointers & Arrays (University Core)", 3002: "Strings & Dynamic Memory Revision", 3003: "Structures, Unions & Enums Revision", 3004: "KTU / University Exam High-Frequency Problems", 3005: "University Comprehensive Mock Exam"
};

const moduleGuides: Record<number, string> = {
  1: "Module 1: Machine Architecture, Data Representations, Precedence & Control Structures.",
  2: "Module 2: Arrays, Asymptotic Complexity, Searching (Linear/Binary), and Sorting Algorithms.",
  3: "Module 3: Multi-dimensional Matrices, Memory Alignment, Typedefs, Structures & Unions.",
  4: "Module 4: Character Sequences, String Library Functions, Buffer Overflows & Text Algorithms.",
  5: "Module 5: Dynamic Memory Allocation (Heap), Recursion, File I/O & University Exam Patterns."
};

// University-grade questions bank for all dynamic fallback lessons
const academicQuestions: Record<number, Question[]> = {
  1: [
    { id: 1, text: "Which component of the CPU coordinates instruction execution and data movement?", options: ["ALU", "Control Unit (CU)", "L1 Cache", "Memory Bus"], correctIndex: 1 },
    { id: 2, text: "In 2's complement arithmetic, how is -x obtained from x?", options: ["Invert all bits and add 1", "Invert all bits and subtract 1", "Shift left by 1", "Set the MSB to 0"], correctIndex: 0 }
  ],
  2: [
    { id: 1, text: "What is the minimum number of passes in an optimized Bubble Sort on an already sorted array?", options: ["0", "1 (O(n) with flag)", "n", "n^2"], correctIndex: 1 },
    { id: 2, text: "Binary Search operates under which algorithmic paradigm?", options: ["Greedy Method", "Divide and Conquer", "Dynamic Programming", "Backtracking"], correctIndex: 1 }
  ],
  3: [
    { id: 1, text: "How are 2D arrays stored in standard C compiler memory?", options: ["Column-Major Order", "Row-Major Order", "Diagonal Order", "Segmented Linked List"], correctIndex: 1 },
    { id: 2, text: "What is the memory size allocated for a Union?", options: ["Sum of all member sizes", "Size of its largest member", "8 bytes always", "Zero bytes"], correctIndex: 1 }
  ],
  4: [
    { id: 1, text: "Why is gets() considered unsafe in modern C programming?", options: ["It is too slow", "It does not check buffer boundary causing Buffer Overflow", "It cannot read spaces", "It requires root permissions"], correctIndex: 1 },
    { id: 2, text: "What is the time complexity of the standard strlen() function?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctIndex: 1 }
  ],
  5: [
    { id: 1, text: "Which function is used to free dynamically allocated Heap memory in C?", options: ["delete()", "free()", "clear()", "release()"], correctIndex: 1 },
    { id: 2, text: "What is the recursion time complexity for calculating Fibonacci without memoization?", options: ["O(n)", "O(log n)", "O(2^n)", "O(n!)"], correctIndex: 2 }
  ]
};

for (let unit = 1; unit <= 30; unit++) {
  for (let l_idx = 1; l_idx <= 5; l_idx++) {
    const lid = unit * 100 + l_idx;
    const moduleNum = Math.ceil(unit / 6);
    const title = fullTitleMap[lid] || `Unit ${unit} Topic ${l_idx}`;

    if (!lessons[lid] || lessons[lid].slides.length === 0) {
      const qList = academicQuestions[moduleNum] || academicQuestions[1];
      lessons[lid] = {
        title: title,
        slides: [
          {
            id: 1, 
            title: `Engineering Concept: ${title}`,
            content: React.createElement('div', null, 
              React.createElement('p', { style: { fontSize: '1.1rem', marginBottom: '15px' } }, `This curriculum topic covers ${title} with focus on memory safety, asymptotic complexity, and university exam problem patterns.`),
              React.createElement('p', { style: { color: 'var(--color-primary)', fontWeight: 'bold' } }, `Syllabus Scope: ${moduleGuides[moduleNum]}`)
            )
          },
          {
            id: 2, 
            title: "Theoretical Principles & Common Traps",
            content: React.createElement('ul', { style: { fontSize: '1.05rem', lineHeight: 1.8 } },
              React.createElement('li', null, `Formal syntax definitions and ISO C compliance for ${title}.`),
              React.createElement('li', null, `Memory layout, CPU word alignment, and pointer semantics.`),
              React.createElement('li', null, `Common viva voce questions and edge-case pitfalls (buffer overflows, off-by-one errors).`)
            )
          },
          {
            id: 3, 
            title: "Interactive College Lab Sandbox",
            hasCodeEditor: true,
            initialCode: `#include <stdio.h>\n\n// Topic: ${title}\nint main() {\n    printf("Mastering ${title} for Engineering Exams.\\n");\n    return 0;\n}`,
            content: React.createElement('p', null, "Write, compile, and analyze runtime behavior in the live GCC compiler.")
          }
        ],
        questions: qList
      };
    }
  }
}
