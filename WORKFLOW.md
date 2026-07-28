# WORKFLOW

## AI-Assisted Development Workflow Comparison

For this assignment, I implemented the same feature twice for my AI Website Onboarding Assistant capstone. The selected feature was an onboarding preferences form that collects a user's full name, experience level, preferred language, and whether they want a guided tour. The goal was to compare the results of using a vague AI prompt versus a precise, structured prompt.

### Round One: Vague Prompt

In the first round, I used a single, minimal prompt: "Build a React onboarding preferences form with validation." I accepted the generated output without providing additional context or requirements. The generated form worked, but it lacked several important aspects. Validation was basic, accessibility considerations were limited, and the overall structure required manual review. The AI also made assumptions about the implementation because the prompt did not specify expected behavior.

### Round Two: Precise Prompt

For the second round, I started a fresh AI session and used a detailed prompt describing the required fields, project structure, validation rules, accessibility requirements, responsive layout, and verification steps. I also instructed the AI to review its own implementation, identify accessibility issues, and write tests for the validation logic.

The second implementation was significantly better. Every input had an associated label, validation messages were displayed inline, the submit button remained disabled until all required fields were valid, and the component structure was more organized. Because the prompt included verification instructions, less manual review was required after the code was generated.

### Comparison

The difference between both approaches was clear. The vague prompt produced functional code but omitted several important details, including stronger validation, accessibility improvements, and better organization. The precise prompt generated a more complete solution that closely matched the intended behavior. Although writing the detailed prompt took longer, it reduced the amount of time spent reviewing and correcting the generated code.

### AI Mistake Found

One issue I identified in the first implementation was that the validation logic allowed incomplete or invalid input to be submitted. The generated form also lacked some accessibility improvements such as properly associated labels for every input. These issues were corrected during the second implementation through clearer instructions and verification.

This exercise demonstrated that effective AI-assisted development depends on writing precise specifications, defining constraints, verifying the output, and reviewing the generated code instead of accepting it without validation.