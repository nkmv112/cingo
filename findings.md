# Project Findings & Research

## Discoveries

- **Requirement:** "Web like Duolingo for C programming" -> Requires short, gamified lessons focusing on syntax and concepts.
- **Requirement:** Core mechanics include XP, streaks, and bite-sized exercises.
- **Technical Consideration:** Teaching C might require code execution. We need to decide between a backend code runner or in-browser WASM compilation to evaluate user submissions. Alternatively, we strictly use multiple choice / fill-in-the-blank for V1.

## Constraints

- **Format:** Gamified "Cards/Exercises" UI, similar to Duolingo.
- **Logic:** Progression unlock system (cannot do lesson 2 without passing lesson 1).

## Resources

- _Pending Research:_
  - WebAssembly C compilers (e.g., WASI, emscripten) for browser-based code execution.
  - UI libraries for vibrant, gamified web components.
