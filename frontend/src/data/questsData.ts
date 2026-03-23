export interface Quest {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  starterCode: string;
  expectedOutput: string;
}

export const questsData: Quest[] = [
  // ─── BEGINNER ─────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "First Steps",
    description: "Write a C program that prints exactly 'Hello, Cingo!' to the console.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Your code here\n    return 0;\n}",
    expectedOutput: "Hello, Cingo!"
  },
  {
    id: 2,
    title: "Basic Math",
    description: "Print the result of 15 + 27 to the console.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}",
    expectedOutput: "42"
  },
  {
    id: 3,
    title: "Variable Declaration",
    description: "Declare an integer variable with value 100 and print it.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // Declare your variable here\n    return 0;\n}",
    expectedOutput: "100"
  },
  {
    id: 4,
    title: "Even or Odd",
    description: "Check if the number 16 is even or odd. Print 'Even' or 'Odd' accordingly.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int num = 16;\n    \n    return 0;\n}",
    expectedOutput: "Even"
  },
  {
    id: 5,
    title: "The For Loop",
    description: "Use a for loop to print the numbers 1 to 5, each on a new line.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}",
    expectedOutput: "1\n2\n3\n4\n5"
  },
  {
    id: 6,
    title: "While Loop Countdown",
    description: "Using a while loop, print a countdown from 3 to 1, then print 'Blastoff!'. All on separate lines.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}",
    expectedOutput: "3\n2\n1\nBlastoff!"
  },
  {
    id: 7,
    title: "Average of Three",
    description: "Calculate and print the average of 10, 20, and 30. Print only the integer result (no decimal).",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20, c = 30;\n    // Calculate and print the average\n    return 0;\n}",
    expectedOutput: "20"
  },
  {
    id: 8,
    title: "Largest of Three",
    description: "Find and print the largest of three numbers: 42, 17, and 58.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int a = 42, b = 17, c = 58;\n    // Find the largest\n    return 0;\n}",
    expectedOutput: "58"
  },
  {
    id: 9,
    title: "Sum of Digits",
    description: "Calculate and print the sum of digits of the number 1234.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int num = 1234;\n    // Sum the digits: 1+2+3+4 = 10\n    return 0;\n}",
    expectedOutput: "10"
  },
  {
    id: 10,
    title: "Multiplication Table",
    description: "Print the multiplication table of 3 from 1 to 5. Format: '3 x 1 = 3', one per line.",
    difficulty: "Beginner",
    starterCode: "#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}",
    expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15"
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────────────────────
  {
    id: 11,
    title: "Prime Number Check",
    description: "Check if 17 is a prime number. Print 'Prime' if it is, otherwise print 'Not Prime'.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int num = 17;\n    // Check if prime\n    return 0;\n}",
    expectedOutput: "Prime"
  },
  {
    id: 12,
    title: "Armstrong Number",
    description: "Check if 153 is an Armstrong number (sum of cube of digits = number itself). Print 'Armstrong' or 'Not Armstrong'.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int num = 153;\n    // 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153\n    return 0;\n}",
    expectedOutput: "Armstrong"
  },
  {
    id: 13,
    title: "Fibonacci Sequence",
    description: "Print the first 7 Fibonacci numbers separated by spaces (starting from 0).",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    // 0 1 1 2 3 5 8\n    return 0;\n}",
    expectedOutput: "0 1 1 2 3 5 8"
  },
  {
    id: 14,
    title: "FizzBuzz",
    description: "Print numbers 1 to 15. For multiples of 3 print 'Fizz', multiples of 5 print 'Buzz', multiples of both print 'FizzBuzz', else print the number. One per line.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}",
    expectedOutput: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz"
  },
  {
    id: 15,
    title: "Array Summation",
    description: "Given the array {5, 10, 15, 20}, calculate and print the sum.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int arr[] = {5, 10, 15, 20};\n    // Calculate and print the sum\n    return 0;\n}",
    expectedOutput: "50"
  },
  {
    id: 16,
    title: "Find the Maximum",
    description: "Find and print the largest number in the array {12, 45, 7, 89, 23}.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int arr[] = {12, 45, 7, 89, 23};\n    // Find the max\n    return 0;\n}",
    expectedOutput: "89"
  },
  {
    id: 17,
    title: "Reverse Array",
    description: "Reverse the array {1, 2, 3, 4, 5} and print each element on a new line.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int n = 5;\n    // Print in reverse order\n    return 0;\n}",
    expectedOutput: "5\n4\n3\n2\n1"
  },
  {
    id: 18,
    title: "Create a Function",
    description: "Write a function named 'multiply' that takes two integers and returns their product. Call it with 7 and 6, and print the result.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\n// Write multiply function here\n\nint main() {\n    \n    return 0;\n}",
    expectedOutput: "42"
  },
  {
    id: 19,
    title: "Recursive Factorial",
    description: "Write a recursive function to calculate 5! (factorial of 5) and print the result.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\n// Write your factorial function\n\nint main() {\n    \n    return 0;\n}",
    expectedOutput: "120"
  },
  {
    id: 20,
    title: "String Length",
    description: "Calculate and print the length of the string 'Programming' WITHOUT using string.h.",
    difficulty: "Intermediate",
    starterCode: "#include <stdio.h>\n\nint main() {\n    char str[] = \"Programming\";\n    // Count manually\n    return 0;\n}",
    expectedOutput: "11"
  },

  // ─── ADVANCED ─────────────────────────────────────────────────────────────
  {
    id: 21,
    title: "Pointers Introduction",
    description: "Declare int x=50. Use a pointer to change x to 100, then print x.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n\nint main() {\n    int x = 50;\n    // Use a pointer to change x to 100\n    return 0;\n}",
    expectedOutput: "100"
  },
  {
    id: 22,
    title: "Pointer Swap",
    description: "Write a function 'swap(int *a, int *b)' that swaps two integers. Swap x=10 and y=20, then print 'x=20 y=10'.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // Your code here\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf(\"x=%d y=%d\", x, y);\n    return 0;\n}",
    expectedOutput: "x=20 y=10"
  },
  {
    id: 23,
    title: "Dynamic Memory",
    description: "Use malloc to allocate space for 3 integers. Assign values 7, 8, 9. Print them separated by spaces, then free the memory.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Allocate, assign, print, free\n    return 0;\n}",
    expectedOutput: "7 8 9"
  },
  {
    id: 24,
    title: "Define a Struct",
    description: "Define a struct 'Point' with int x and y. Create a Point with x=10, y=5 and print 'Point: (10, 5)'.",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n\n// Define Point struct here\n\nint main() {\n    \n    return 0;\n}",
    expectedOutput: "Point: (10, 5)"
  },
  {
    id: 25,
    title: "The Final Boss: Recursion",
    description: "Write a recursive function 'fib(n)' that returns the nth Fibonacci number (fib(0)=0, fib(1)=1). Print fib(7).",
    difficulty: "Advanced",
    starterCode: "#include <stdio.h>\n\n// Write fib recursively\n\nint main() {\n    printf(\"%d\", fib(7));\n    return 0;\n}",
    expectedOutput: "13"
  }
];
