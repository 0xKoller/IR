# Wallet Signup Flow

## Table of Contents

- [Wallet Signup Flow](#wallet-signup-flow)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Evaluation Criteria](#evaluation-criteria)
  - [Tips \& Tricks](#tips--tricks)
  - [Implementation Details \& Progress](#implementation-details--progress)
    - [Tech Stack \& Libraries](#tech-stack--libraries)
    - [Optimization](#optimization)
    - [UX/UI Decisions](#uxui-decisions)
    - [Developer Experience](#developer-experience)

We are going to build a digital wallet web-based signup flow. You are tasked with designing, implementing and deliverying a usable demo of a signup flow.
We want to see your ability to envision and ship a digital product.

Example from V0:

<img width="654" alt="image" src="https://github.com/user-attachments/assets/dde1cd1b-ee22-46f0-8996-c245271c575a" />

## Requirements

Build a uniquely flavored user experience for handling user registration and KYC verification.

The experience must be deployed and usable from a public-facing landing where the user can initiate the signup flow.

The flow must include getting the following information from the user:

1. User / Email registration
2. KYC verification information: name, full address, date of birth, and government ID

The flow must include error handling and loading states. Include the following use cases:

1. Email: alreadytaken@gmail.com -> "Email is already taken"
2. Country: Uruguay -> "This country is not supported"
3. Form Submissions, mocked or otherwise, should have at least 200ms of delay.

## Evaluation Criteria

- User experience and polish
- Technical Depth & Quality
- Product Sense & Thinking

The experience must be the best you can produce - errors in states, flows, or designs will affect your scoring significantly.

## Tips & Tricks

- Use your preferred tech stack. We want to evaluate the product on the technical implementation.
- The prompt is purposefully ambiguous to encourage creative solutions. Bring your own ideas and creativity to the table.
- Use of AI is encouraged, but pay attention to quality.
- No third-party integrations are necessary - you can mock responses from your own server or client.
- Consult the [Takehome Guide](https://docs.silver.dev/interview-ready/technical-fundamentals/code-quality/guia-de-takehomes) for more tips

## Implementation Details & Progress

### Tech Stack & Libraries

- **TanStack (React Query)**: Used for efficient server state management, caching, and data synchronization.
- **shadcn/ui**: Leveraged for rapid, high-quality UI component development.

### Optimization

- Implemented best practices for React performance, including memoization and efficient state updates.
- Used TanStack's built-in caching and background refetching to minimize unnecessary network requests and improve perceived speed.

### UX/UI Decisions

- **Loading Spinners**: Added clear loading indicators to communicate progress and prevent user confusion during async operations (e.g., form submission, KYC checks).
- **Error Handling**: All error states are surfaced with user-friendly messages, including specific cases (e.g., email already taken, unsupported country).
- **Form Feedback**: Real-time validation and feedback for smoother user experience.

### Developer Experience

- Modular, maintainable codebase with clear separation of concerns.
- Mocked backend responses for rapid prototyping and testing.

---

_This section will be updated as new features and improvements are added._
