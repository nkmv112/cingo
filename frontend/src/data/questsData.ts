export interface Quest {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  starterCode: string;
  expectedOutput: string;
}

export const questsData: Quest[] = [
  // ─── BEGINNER (Core Syntax, Memory & Operators) ───────────────────────────
  {
    id: 1,
    title: "University Header & Format Specifiers",
    description: "Write a program that prints formatted student output: 'Roll: 101 | Grade: A | GPA: 9.80' on a single line.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int roll = 101;\n    char grade = 'A';\n    float gpa = 9.80;\n    // Print formatted using printf format specifiers\n    return 0;\n}",
    expectedOutput: "Roll: 101 | Grade: A | GPA: 9.80"
  },
  {
    id: 2,
    title: "Bitwise Parity Check",
    description: "Use the bitwise AND operator (&) to check if 29 is Odd or Even. Print 'Odd' or 'Even'.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int n = 29;\n    // Use bitwise (n & 1)\n    return 0;\n}",
    expectedOutput: "Odd"
  },
  {
    id: 3,
    title: "Bitwise Power of 2 Check",
    description: "Check if integer 64 is a power of 2 using the formula ((n & (n-1)) == 0). Print 'Power of 2' or 'Not Power of 2'.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int n = 64;\n    // Check bitwise power of 2\n    return 0;\n}",
    expectedOutput: "Power of 2"
  },
  {
    id: 4,
    title: "Euclidean GCD Algorithm",
    description: "Find the Greatest Common Divisor (GCD) of 48 and 18 using Euclidean remainder method. Print the GCD.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int a = 48, b = 18;\n    // While b != 0: temp = b, b = a % b, a = temp\n    return 0;\n}",
    expectedOutput: "6"
  },
  {
    id: 5,
    title: "Armstrong Number Verification",
    description: "Check if 371 is an Armstrong number (3^3 + 7^3 + 1^3 = 27 + 343 + 1 = 371). Print 'Armstrong' or 'Not Armstrong'.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int n = 371, temp, rem, sum = 0;\n    // Extract digits and sum cubes\n    return 0;\n}",
    expectedOutput: "Armstrong"
  },
  {
    id: 6,
    title: "Matrix Diagonal Trace",
    description: "Calculate the trace (sum of main diagonal elements) of a 3x3 matrix {{1,2,3},{4,5,6},{7,8,9}}. Print the sum.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int mat[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    int sum = 0, i;\n    // Sum mat[i][i]\n    return 0;\n}",
    expectedOutput: "15"
  },
  {
    id: 7,
    title: "Sum of Series (1 + 1/2 + 1/3...)",
    description: "Compute the sum of series 1 + 1/2 + 1/3 + 1/4 using float division. Print with 2 decimal places: 'Sum: 2.08'.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int n = 4;\n    float sum = 0.0;\n    // Accumulate 1.0f / i\n    return 0;\n}",
    expectedOutput: "Sum: 2.08"
  },
  {
    id: 8,
    title: "Count Set Bits (Brian Kernighan's Algorithm)",
    description: "Count the number of 1s (set bits) in the binary representation of 29 (binary: 11101). Print the count.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int n = 29, count = 0;\n    // While n > 0: n = n & (n - 1), count++\n    return 0;\n}",
    expectedOutput: "4"
  },
  {
    id: 9,
    title: "Right-Angled Floyd's Triangle",
    description: "Print a 3-row Floyd's triangle with consecutive numbers:\n1\n2 3\n4 5 6",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int rows = 3, num = 1, i, j;\n    // Nested loops for Floyd's triangle\n    return 0;\n}",
    expectedOutput: "1\n2 3\n4 5 6"
  },
  {
    id: 10,
    title: "Evaluation of Operator Precedence",
    description: "Evaluate and print the expression result: int a = 5, b = 2; printf(\"%d\", a + b * 3 / 2 - 1);",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 2;\n    // Expression: 5 + (2 * 3) / 2 - 1 = 5 + 6/2 - 1 = 5 + 3 - 1 = 7\n    return 0;\n}",
    expectedOutput: "7"
  },

  // ─── INTERMEDIATE (Algorithms, Matrices, Strings) ───────────────────────────
  {
    id: 11,
    title: "Binary Search Algorithm (O(log n))",
    description: "Implement Binary Search on sorted array {11, 22, 33, 44, 55, 66, 77} to find key 55. Print 'Found at index 4'.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int arr[] = {11, 22, 33, 44, 55, 66, 77};\n    int n = 7, key = 55;\n    // Binary search logic (low, high, mid)\n    return 0;\n}",
    expectedOutput: "Found at index 4"
  },
  {
    id: 12,
    title: "Bubble Sort Implementation",
    description: "Sort array {64, 34, 25, 12, 22} in ascending order. Print the sorted elements separated by space.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22};\n    int n = 5, i, j, temp;\n    // Bubble sort nested loops\n    return 0;\n}",
    expectedOutput: "12 22 34 64"
  },
  {
    id: 13,
    title: "Matrix Transpose",
    description: "Transpose the 2x3 matrix {{1,2,3},{4,5,6}}. Print the resulting 3x2 matrix elements row by row.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int a[2][3] = {{1,2,3},{4,5,6}};\n    int trans[3][2], i, j;\n    // trans[j][i] = a[i][j]\n    return 0;\n}",
    expectedOutput: "1 4\n2 5\n3 6"
  },
  {
    id: 14,
    title: "String Palindrome Check (Without string.h)",
    description: "Check if char str[] = \"radar\"; is a palindrome WITHOUT using string.h. Print 'Palindrome' or 'Not Palindrome'.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    char str[] = \"radar\";\n    // Two pointer check from start and end\n    return 0;\n}",
    expectedOutput: "Palindrome"
  },
  {
    id: 15,
    title: "Manual String Copy (my_strcpy)",
    description: "Copy string 'KTU_EXAM' from src to dest array manually. Print 'Copied: KTU_EXAM'.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    char src[] = \"KTU_EXAM\";\n    char dest[20];\n    // Copy char by char until null terminator\n    return 0;\n}",
    expectedOutput: "Copied: KTU_EXAM"
  },
  {
    id: 16,
    title: "Recursive Power Calculation (x^n)",
    description: "Write a recursive function 'power(int base, int exp)' that computes 2^6. Print the result.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint power(int base, int exp) {\n    // Base case and recursive step\n}\n\nint main() {\n    printf(\"%d\\n\", power(2, 6));\n    return 0;\n}",
    expectedOutput: "64"
  },
  {
    id: 17,
    title: "Structure Student Record",
    description: "Define struct Student with roll (int) and marks (float). Create instance {roll: 12, marks: 88.5}. Print 'ID: 12 Marks: 88.5'.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\n// Define struct Student\n\nint main() {\n    // Initialize and print\n    return 0;\n}",
    expectedOutput: "ID: 12 Marks: 88.5"
  },
  {
    id: 18,
    title: "Frequency of Elements in Array",
    description: "Count the occurrences of number 7 in array {7, 2, 7, 4, 7, 8, 7}. Print 'Count: 4'.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int arr[] = {7, 2, 7, 4, 7, 8, 7};\n    int n = 7, target = 7, count = 0;\n    // Count occurrences\n    return 0;\n}",
    expectedOutput: "Count: 4"
  },
  {
    id: 19,
    title: "Recursive Sum of Digits",
    description: "Write a recursive function 'sumDigits(int n)' to compute sum of digits of 942. Print the result.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint sumDigits(int n) {\n    if (n == 0) return 0;\n    return (n % 10) + sumDigits(n / 10);\n}\n\nint main() {\n    printf(\"%d\\n\", sumDigits(942));\n    return 0;\n}",
    expectedOutput: "15"
  },
  {
    id: 20,
    title: "Linear Search with Comparison Count",
    description: "Perform Linear Search on {10, 20, 30, 40, 50} for key 30. Print 'Found at index 2 after 3 comparisons'.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int key = 30, i;\n    // Track comparisons and print\n    return 0;\n}",
    expectedOutput: "Found at index 2 after 3 comparisons"
  },

  // ─── ADVANCED (Pointers, Dynamic Memory, Linked Structures) ───────────────
  {
    id: 21,
    title: "Call-by-Reference Pointer Swap",
    description: "Implement 'void swap(int *a, int *b)' using dereferencing pointers. Swap a=40, b=90. Print 'a=90 b=40'.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int a = 40, b = 90;\n    swap(&a, &b);\n    printf(\"a=%d b=%d\\n\", a, b);\n    return 0;\n}",
    expectedOutput: "a=90 b=40"
  },
  {
    id: 22,
    title: "Dynamic Array Allocation (malloc & free)",
    description: "Use malloc() to allocate memory for 4 integers: {10, 20, 30, 40}. Compute and print their sum 'Sum: 100', then free memory.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // malloc(4 * sizeof(int)), assign values, sum, free()\n    return 0;\n}",
    expectedOutput: "Sum: 100"
  },
  {
    id: 23,
    title: "Self-Referential Linked List Node",
    description: "Define a struct Node with int data and struct Node* next. Connect node1 (10) -> node2 (20). Traverse and print '10 -> 20 -> NULL'.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    struct Node n1 = {10, NULL}, n2 = {20, NULL};\n    n1.next = &n2;\n    printf(\"%d -> %d -> NULL\\n\", n1.data, n1.next->data);\n    return 0;\n}",
    expectedOutput: "10 -> 20 -> NULL"
  },
  {
    id: 24,
    title: "Stack Push & Pop Simulator in C",
    description: "Simulate a Stack with array and top pointer. Push 15, Push 25, then Pop and print the popped element: 'Popped: 25'.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n\n#define MAX 5\nint stack[MAX], top = -1;\n\nvoid push(int val) { stack[++top] = val; }\nint pop() { return stack[top--]; }\n\nint main() {\n    push(15);\n    push(25);\n    printf(\"Popped: %d\\n\", pop());\n    return 0;\n}",
    expectedOutput: "Popped: 25"
  },
  {
    id: 25,
    title: "Tower of Hanoi Minimum Moves",
    description: "Compute the total minimum recursive moves required for Tower of Hanoi with 4 disks (formula: 2^n - 1). Print 'Moves: 15'.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n\nint hanoiMoves(int n) {\n    if (n == 1) return 1;\n    return 2 * hanoiMoves(n - 1) + 1;\n}\n\nint main() {\n    printf(\"Moves: %d\\n\", hanoiMoves(4));\n    return 0;\n}",
    expectedOutput: "Moves: 15"
  }
];
