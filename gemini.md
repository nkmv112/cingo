# Project Constitution (gemini.md)

## 1. Data Schemas

### Input Schema (Raw Lesson Data)

```json
{
  "lesson_id": "uuid",
  "module": "string (e.g., Pointers, Arrays, Control Flow)",
  "title": "string",
  "difficulty": "int (1-5)",
  "content": "string (markdown explaining concept)",
  "exercises": [
    {
      "exercise_id": "uuid",
      "type": "string (multiple_choice, fill_in_blank, code_execution)",
      "question": "string",
      "options": ["string"], 
      "correct_answer": "string",
      "hints": ["string"]
    }
  ]
}
```

### Output Payload Schema (Frontend Progress State)

```json
{
  "user_id": "uuid",
  "current_lesson_id": "uuid",
  "xp_earned": "int",
  "streak_days": "int",
  "hearts_remaining": "int (0-5)",
  "module_progress": "float (0-100)"
}
```

### User Profile Schema

```json
{
  "user_id": "uuid",
  "username": "string",
  "experience_level": "string (beginner, intermediate)",
  "completed_lessons": ["lesson_id"],
  "xp_total": "int",
  "daily_goal_met": "boolean"
}
```

## 2. Behavioral Rules

- **Bite-Sized Learning:** Lessons must be broken down into micro-concepts (like Duolingo).
- **Gamification:** Incorporate streaks, XP, and hearts to encourage regular practice.
- **Onboarding Flow:**
  1. Landing Page (Select Experience Level)
  2. Baseline Assessment (or start from scratch)
  3. Register/Login
  4. Personalized Learning Path Dashboard
- **Interactive Feedback:** Immediate pass/fail visual feedback on exercises with positive reinforcement.

## 3. Architectural Invariants

- **Layer 1 (Architecture):** SOPs determine logic and learning paths.
- **Layer 2 (Navigation):** Routing logic only (Frontend progression view).
- **Layer 3 (Tools):**
  - Backend API to serve lesson data and validate answers.
  - Optional sandboxed environment (or browser WASM) for `code_execution` tasks.
- **Data-First:** No coding until Data Schemas are confirmed.
- **Self-Annealing:** Fix tools -> Test -> Update Architecture.

## 4. Maintenance Log

- **[Protocol 0]**: Defined schemas for C Programming Learning App.
