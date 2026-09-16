export const curriculumData = [
  {
    id: 1,
    title: "Unit 1: Machine Architecture & C Model",
    description: "MODULE 1: Memory layout, 4 compilation stages (cpp, gcc, as, ld), and ISO C entry point.",
    color: "#8a2be2",
    shadow: "#6610b3",
    lessons: [
      { id: 101, title: "C Memory Model & Machine Architecture", status: "unlocked" },
      { id: 102, title: "History & Features of C", status: "locked" },
      { id: 103, title: "Applications & Embedded Systems", status: "locked" },
      { id: 104, title: "Structure of a C Program & Linkage", status: "locked" },
      { id: 105, title: "Hello World Program", status: "locked" }
    ]
  },
  {
    id: 2,
    title: "Unit 2: Character Set & Lexical Tokens",
    description: "MODULE 1: Lexical tokens, 32 ISO C keywords, naming identifiers, and literals.",
    color: "#f92f60",
    shadow: "#c91742",
    lessons: [
      { id: 201, title: "C Character Set", status: "locked" },
      { id: 202, title: "Tokens & Lexical Analysis", status: "locked" },
      { id: 203, title: "Keywords in ISO C", status: "locked" },
      { id: 204, title: "Identifiers & Naming Scope", status: "locked" },
      { id: 205, title: "Constants & Literals", status: "locked" }
    ]
  },
  {
    id: 3,
    title: "Unit 3: Data Types & Word Alignment",
    description: "MODULE 1: Primitive types, 2's complement, type modifiers, and sizeof() mechanics.",
    color: "#0284c7",
    shadow: "#0369a1",
    lessons: [
      { id: 301, title: "Data Types & Word Alignment", status: "locked" },
      { id: 302, title: "Variables & Declarations", status: "locked" },
      { id: 303, title: "Initialization & Garbage Values", status: "locked" },
      { id: 304, title: "Type Modifiers & Limits", status: "locked" },
      { id: 305, title: "Type Conversion & Casting", status: "locked" }
    ]
  },
  {
    id: 4,
    title: "Unit 4: Bitwise & Arithmetic Operators",
    description: "MODULE 1: Bitmasking, bit shifts (<<, >>), logic short-circuits, and compound math.",
    color: "#10b981",
    shadow: "#059669",
    lessons: [
      { id: 401, title: "Bitwise Operations & Bitmasking", status: "locked" },
      { id: 402, title: "Relational Operators", status: "locked" },
      { id: 403, title: "Logical Operators & Short-Circuit", status: "locked" },
      { id: 404, title: "Bitwise Shift Operations", status: "locked" },
      { id: 405, title: "Compound Assignment", status: "locked" }
    ]
  },
  {
    id: 5,
    title: "Unit 5: Operator Precedence & Evaluation",
    description: "MODULE 1: Precedence hierarchy, associativity rules, and sequence points.",
    color: "#f59e0b",
    shadow: "#b45309",
    lessons: [
      { id: 501, title: "Operator Precedence & Evaluation Traps", status: "locked" },
      { id: 502, title: "Precedence Hierarchy Rules", status: "locked" },
      { id: 503, title: "Associativity & Sequence Points", status: "locked" },
      { id: 504, title: "Complex Expressions", status: "locked" },
      { id: 505, title: "Practice Problems", status: "locked" }
    ]
  },
  {
    id: 6,
    title: "Unit 6: Formatted I/O & Streams",
    description: "MODULE 1: printf/scanf conversion specifiers, buffer flushing, and input parsing.",
    color: "#6366f1",
    shadow: "#4338ca",
    lessons: [
      { id: 601, title: "printf() Format Specifiers", status: "locked" },
      { id: 602, title: "scanf() Buffer Handling", status: "locked" },
      { id: 603, title: "Conversion Specifiers & Flags", status: "locked" },
      { id: 604, title: "Formatted Input/Output", status: "locked" },
      { id: 605, title: "IO Lab Programs", status: "locked" }
    ]
  },
  {
    id: 7,
    title: "Unit 7: Conditional Branching Logic",
    description: "MODULE 1: if, if-else ladders, ternary operator, and branch prediction.",
    color: "#ec4899",
    shadow: "#be185d",
    lessons: [
      { id: 701, title: "if Conditional Branching", status: "locked" },
      { id: 702, title: "if-else & Ternary Operator", status: "locked" },
      { id: 703, title: "Nested Branching", status: "locked" },
      { id: 704, title: "else if Ladder Decisions", status: "locked" },
      { id: 705, title: "Branching Lab Programs", status: "locked" }
    ]
  },
  {
    id: 8,
    title: "Unit 8: Switch-Case & Menu Systems",
    description: "MODULE 1: Jump tables, fall-through mechanics, and menu architectures.",
    color: "#14b8a6",
    shadow: "#0d9488",
    lessons: [
      { id: 801, title: "switch-case Mechanics", status: "locked" },
      { id: 802, title: "Case Labels & Fall-Through", status: "locked" },
      { id: 803, title: "break Statement in Switch", status: "locked" },
      { id: 804, title: "default Case Handling", status: "locked" },
      { id: 805, title: "Menu-Driven System Design", status: "locked" }
    ]
  },
  {
    id: 9,
    title: "Unit 9: Iteration & Loop Invariants",
    description: "MODULE 1: while, do-while, for loops, and condition invariants.",
    color: "#8b5cf6",
    shadow: "#7c3aed",
    lessons: [
      { id: 901, title: "while Loop Invariants", status: "locked" },
      { id: 902, title: "do-while Post-Condition Loop", status: "locked" },
      { id: 903, title: "for Loop Architecture", status: "locked" },
      { id: 904, title: "Loop Performance Comparison", status: "locked" },
      { id: 905, title: "Series Summation Programs", status: "locked" }
    ]
  },
  {
    id: 10,
    title: "Unit 10: Loop Control & Nested Patterns",
    description: "MODULE 1: break, continue, infinite loops, and nested loop complexity O(n^2).",
    color: "#f43f5e",
    shadow: "#e11d48",
    lessons: [
      { id: 1001, title: "break & Early Termination", status: "locked" },
      { id: 1002, title: "continue & Skip Execution", status: "locked" },
      { id: 1003, title: "Nested Loop Complexity O(n^2)", status: "locked" },
      { id: 1004, title: "Infinite Loops & Halting", status: "locked" },
      { id: 1005, title: "Matrix Patterns & Pyramids", status: "locked" }
    ]
  },
  {
    id: 11,
    title: "Unit 11: 1D Arrays & Memory Layout",
    description: "MODULE 2: Contiguous memory storage, index offset arithmetic, and bounds.",
    color: "#8a2be2",
    shadow: "#6610b3",
    lessons: [
      { id: 1101, title: "Array Memory Layout & Contiguity", status: "locked" },
      { id: 1102, title: "Array Declaration & Bounds", status: "locked" },
      { id: 1103, title: "Array Initialization in Stack", status: "locked" },
      { id: 1104, title: "Accessing Array Subscripts", status: "locked" },
      { id: 1105, title: "Array Processing Programs", status: "locked" }
    ]
  },
  {
    id: 12,
    title: "Unit 12: Array Statistical Operations",
    description: "MODULE 2: Mean, variance, min/max scans, and frequency counting.",
    color: "#f92f60",
    shadow: "#c91742",
    lessons: [
      { id: 1201, title: "Array Summation & Mean", status: "locked" },
      { id: 1202, title: "Variance & Standard Deviation", status: "locked" },
      { id: 1203, title: "Finding Maximum & Minimum", status: "locked" },
      { id: 1204, title: "Second Largest Element", status: "locked" },
      { id: 1205, title: "Linear Scan Lab", status: "locked" }
    ]
  },
  {
    id: 13,
    title: "Unit 13: Searching: Linear vs Binary",
    description: "MODULE 2: Linear Search O(n) vs Binary Search O(log n) divide and conquer.",
    color: "#0284c7",
    shadow: "#0369a1",
    lessons: [
      { id: 1301, title: "Searching: Linear vs Binary Search", status: "locked" },
      { id: 1302, title: "Binary Search Divide & Conquer", status: "locked" },
      { id: 1303, title: "Binary Search Implementation", status: "locked" },
      { id: 1304, title: "Time Complexity O(log n)", status: "locked" },
      { id: 1305, title: "Search Practice Problems", status: "locked" }
    ]
  },
  {
    id: 14,
    title: "Unit 14: Sorting Algorithms in C",
    description: "MODULE 2: Bubble sort, selection sort, and insertion sort with passes trace.",
    color: "#10b981",
    shadow: "#059669",
    lessons: [
      { id: 1401, title: "Sorting Algorithms Overview", status: "locked" },
      { id: 1402, title: "Bubble Sort Passes & Inversions", status: "locked" },
      { id: 1403, title: "Bubble Sort Implementation", status: "locked" },
      { id: 1404, title: "Selection Sort Algorithm", status: "locked" },
      { id: 1405, title: "Insertion Sort Algorithm", status: "locked" }
    ]
  },
  {
    id: 15,
    title: "Unit 15: Enumerations (enum)",
    description: "MODULE 2: User-defined discrete types, state machines, and readability.",
    color: "#f59e0b",
    shadow: "#b45309",
    lessons: [
      { id: 1501, title: "Enumerations (enum) in C", status: "locked" },
      { id: 1502, title: "Enum Syntax & Underlying Types", status: "locked" },
      { id: 1503, title: "State Machines using Enum", status: "locked" },
      { id: 1504, title: "Type Safety & Readability", status: "locked" },
      { id: 1505, title: "Enum Practice Systems", status: "locked" }
    ]
  },
  {
    id: 16,
    title: "Unit 16: Type Aliasing (typedef)",
    description: "MODULE 3: Custom type aliases, pointer aliases, and abstract data structures.",
    color: "#6366f1",
    shadow: "#4338ca",
    lessons: [
      { id: 1601, title: "Type Aliasing with typedef", status: "locked" },
      { id: 1602, title: "typedef Syntax & Pointer Aliasing", status: "locked" },
      { id: 1603, title: "User-Defined Abstract Types", status: "locked" },
      { id: 1604, title: "Function Pointer Typedefs", status: "locked" },
      { id: 1605, title: "Engineering Lab Exercises", status: "locked" }
    ]
  },
  {
    id: 17,
    title: "Unit 17: 2D Arrays & Matrix Storage",
    description: "MODULE 3: Row-major contiguous mapping, 2D matrix declaration, and I/O.",
    color: "#ec4899",
    shadow: "#be185d",
    lessons: [
      { id: 1701, title: "2D Arrays & Row-Major Order", status: "locked" },
      { id: 1702, title: "Matrix Declaration in Memory", status: "locked" },
      { id: 1703, title: "Accessing Elements arr[i][j]", status: "locked" },
      { id: 1704, title: "Matrix Input/Output Routines", status: "locked" },
      { id: 1705, title: "2D Array Lab Programs", status: "locked" }
    ]
  },
  {
    id: 18,
    title: "Unit 18: Matrix Arithmetic Algorithms",
    description: "MODULE 3: Matrix multiplication O(N^3), addition, subtraction, and transpose.",
    color: "#14b8a6",
    shadow: "#0d9488",
    lessons: [
      { id: 1801, title: "Matrix Multiplication & Complexity", status: "locked" },
      { id: 1802, title: "Matrix Addition & Subtraction", status: "locked" },
      { id: 1803, title: "Matrix Scalar Multiplication", status: "locked" },
      { id: 1804, title: "Matrix Transpose & Symmetry", status: "locked" },
      { id: 1805, title: "Matrix Lab Problems", status: "locked" }
    ]
  },
  {
    id: 19,
    title: "Unit 19: Matrix Properties & Trace",
    description: "MODULE 3: Row/column sums, main/anti-diagonal trace, and identity checks.",
    color: "#8b5cf6",
    shadow: "#7c3aed",
    lessons: [
      { id: 1901, title: "Row & Column Sums in Matrices", status: "locked" },
      { id: 1902, title: "Main & Anti-Diagonal Elements", status: "locked" },
      { id: 1903, title: "Trace & Determinant Concepts", status: "locked" },
      { id: 1904, title: "Identity & Sparse Matrices", status: "locked" },
      { id: 1905, title: "Practice Matrix Problems", status: "locked" }
    ]
  },
  {
    id: 20,
    title: "Unit 20: 2D Grid Algorithms",
    description: "MODULE 3: Spiral traversals, symmetric matrix validation, and grid algorithms.",
    color: "#f43f5e",
    shadow: "#e11d48",
    lessons: [
      { id: 2001, title: "Nested Loop Traversal Patterns", status: "locked" },
      { id: 2002, title: "Spiral Matrix Traversal", status: "locked" },
      { id: 2003, title: "Pattern Generation Algorithms", status: "locked" },
      { id: 2004, title: "Grid Traversal Complexity", status: "locked" },
      { id: 2005, title: "University Lab Exercises", status: "locked" }
    ]
  },
  {
    id: 21,
    title: "Unit 21: Character Arrays & Strings",
    description: "MODULE 4: Null terminator '\\0', string literals vs char arrays, and safety.",
    color: "#8a2be2",
    shadow: "#6610b3",
    lessons: [
      { id: 2101, title: "Strings as Null-Terminated Arrays", status: "locked" },
      { id: 2102, title: "Character Array vs String Literal", status: "locked" },
      { id: 2103, title: "Reading Strings (Buffer Overflow Risk)", status: "locked" },
      { id: 2104, title: "Displaying Strings", status: "locked" },
      { id: 2105, title: "String Lab Programs", status: "locked" }
    ]
  },
  {
    id: 22,
    title: "Unit 22: Safe String Input Methods",
    description: "MODULE 4: fgets vs scanf vs gets, newline handling, and character ASCII.",
    color: "#f92f60",
    shadow: "#c91742",
    lessons: [
      { id: 2201, title: "Safe String Input (fgets vs scanf)", status: "locked" },
      { id: 2202, title: "Character Handling functions", status: "locked" },
      { id: 2203, title: "ASCII Conversions & Case Change", status: "locked" },
      { id: 2204, title: "Manual String Length Count", status: "locked" },
      { id: 2205, title: "String Processing Exercises", status: "locked" }
    ]
  },
  {
    id: 23,
    title: "Unit 23: String Standard Library",
    description: "MODULE 4: strlen, strcpy, strncpy, strcat, and strcmp lexicographical logic.",
    color: "#0284c7",
    shadow: "#0369a1",
    lessons: [
      { id: 2301, title: "strlen() Implementation & O(n)", status: "locked" },
      { id: 2302, title: "strcpy() vs strncpy() Safety", status: "locked" },
      { id: 2303, title: "strcat() & Concatenation", status: "locked" },
      { id: 2304, title: "strcmp() Lexicographical Compare", status: "locked" },
      { id: 2305, title: "String Library Lab", status: "locked" }
    ]
  },
  {
    id: 24,
    title: "Unit 24: String Algorithm Design",
    description: "MODULE 4: In-place reversal, palindrome checking, and anagram validation.",
    color: "#10b981",
    shadow: "#059669",
    lessons: [
      { id: 2401, title: "In-Place String Reversal", status: "locked" },
      { id: 2402, title: "Palindrome String Verification", status: "locked" },
      { id: 2403, title: "String Comparison Logic", status: "locked" },
      { id: 2404, title: "Anagram Checking Algorithm", status: "locked" },
      { id: 2405, title: "String Algorithm Problems", status: "locked" }
    ]
  },
  {
    id: 25,
    title: "Unit 25: Substring Search & Matching",
    description: "MODULE 4: Sliding window substring search and pattern matching.",
    color: "#f59e0b",
    shadow: "#b45309",
    lessons: [
      { id: 2501, title: "Substring Search & Sliding Window", status: "locked" },
      { id: 2502, title: "Naive Pattern Matching Algorithm", status: "locked" },
      { id: 2503, title: "Search Complexity Analysis", status: "locked" },
      { id: 2504, title: "C Substring Implementation", status: "locked" },
      { id: 2505, title: "String Matching Exercises", status: "locked" }
    ]
  },
  {
    id: 26,
    title: "Unit 26: Classical Number Theory in C",
    description: "MODULE 5: Prime sieve, Euclidean GCD, Fibonacci recursion tree, and Armstrong.",
    color: "#6366f1",
    shadow: "#4338ca",
    lessons: [
      { id: 2601, title: "Prime Sieve & Primality Testing", status: "locked" },
      { id: 2602, title: "Recursive Factorial & Stack Depth", status: "locked" },
      { id: 2603, title: "Fibonacci Sequence & Recursion Tree", status: "locked" },
      { id: 2604, title: "Armstrong & Digital Roots", status: "locked" },
      { id: 2605, title: "GCD Euclidean Algorithm", status: "locked" }
    ]
  },
  {
    id: 27,
    title: "Unit 27: Algorithmic Pattern Generation",
    description: "MODULE 5: Floyd's and Pascal's triangles, pyramids, and nested coordinate loops.",
    color: "#ec4899",
    shadow: "#be185d",
    lessons: [
      { id: 2701, title: "Floyd's & Pascal's Triangles", status: "locked" },
      { id: 2702, title: "Pyramid & Diamond Patterns", status: "locked" },
      { id: 2703, title: "Number Spiral Patterns", status: "locked" },
      { id: 2704, title: "Recursive Pattern Generation", status: "locked" },
      { id: 2705, title: "Exam Pattern Problems", status: "locked" }
    ]
  },
  {
    id: 28,
    title: "Unit 28: System Menu & Architecture",
    description: "MODULE 5: Modular software design, state machines, and multi-operation systems.",
    color: "#14b8a6",
    shadow: "#0d9488",
    lessons: [
      { id: 2801, title: "Menu-Driven Calculator in C", status: "locked" },
      { id: 2802, title: "State Loop & User Navigation", status: "locked" },
      { id: 2803, title: "Matrix Menu-Driven Tool", status: "locked" },
      { id: 2804, title: "Modular Function Design", status: "locked" },
      { id: 2805, title: "Software Architecture Lab", status: "locked" }
    ]
  },
  {
    id: 29,
    title: "Unit 29: Complexity & Program Tracing",
    description: "MODULE 5: Big-O analysis, GDB debugging, stack frames, and optimization.",
    color: "#8b5cf6",
    shadow: "#7c3aed",
    lessons: [
      { id: 2901, title: "Asymptotic Notation (Big-O, Omega)", status: "locked" },
      { id: 2902, title: "Flowchart & Control Flow Graphs", status: "locked" },
      { id: 2903, title: "Memory Tracing & Call Stack", status: "locked" },
      { id: 2904, title: "GDB Debugging & Core Dumps", status: "locked" },
      { id: 2905, title: "Code Optimization Techniques", status: "locked" }
    ]
  },
  {
    id: 30,
    title: "Unit 30: University Final Sprint & Viva",
    description: "MODULE 5: Pointers & dynamic memory, high-frequency lab questions, and mock exam.",
    color: "#f43f5e",
    shadow: "#e11d48",
    lessons: [
      { id: 3001, title: "Pointers & Arrays (University Core)", status: "unlocked" },
      { id: 3002, title: "Strings & Dynamic Memory Revision", status: "unlocked" },
      { id: 3003, title: "Structures, Unions & Enums Revision", status: "unlocked" },
      { id: 3004, title: "KTU / University Exam High-Frequency Problems", status: "unlocked" },
      { id: 3005, title: "University Comprehensive Mock Exam", status: "unlocked" }
    ]
  }
];
