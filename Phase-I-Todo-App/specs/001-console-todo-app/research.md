# Research Summary: Console Todo Application

## Decision: Project Structure
**Rationale**: Selected clean architecture with distinct layers (models, repositories, services, CLI, utils) to ensure separation of concerns and testability. This follows the architecture requirements specified in the feature spec.

**Alternatives considered**: 
- Monolithic structure (rejected for lack of separation)
- More complex architecture (rejected as over-engineering for Phase I)

## Decision: In-Memory Storage Implementation
**Rationale**: Using Python's built-in data structures (dict/list) to store todos in memory. This satisfies the constraint of in-memory only storage without external dependencies and supports the requirement to limit to 10,000 todos.

**Alternatives considered**:
- Using external in-memory solutions (violates standard library constraint)
- File-based storage (violates in-memory only constraint)

## Decision: CLI Framework
**Rationale**: Using Python's built-in `input()` and `print()` functions for the console interface, with a simple menu-driven approach. This avoids external dependencies while providing a clear user experience that meets the requirements.

**Alternatives considered**:
- argparse (for command-line arguments rather than interactive menu)
- Rich library (provides enhanced UI but violates standard library constraint)
- Click (popular CLI framework but violates standard library constraint)

## Decision: Input Validation Approach
**Rationale**: Implementing validation functions in a dedicated validators.py module to check title/description lengths and other constraints. This keeps validation logic centralized and reusable across the application.

**Alternatives considered**:
- Inline validation in each function (rejected for duplication)
- Third-party validation libraries (violates standard library constraint)

## Decision: Error Handling and Logging
**Rationale**: Creating a dedicated errors.py module with custom exceptions and logging infrastructure to satisfy the requirement that the app "never crash on bad input" and to provide observability.

**Alternatives considered**:
- Generic exception handling (rejected for lack of specificity)
- Third-party logging frameworks (violates standard library constraint)