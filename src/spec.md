# Specification

## Summary
**Goal:** Ensure Event 1 and Event 4 gameplay always provides a visible English “Skip” button to advance to the next level, while keeping the existing flow and progress behavior.

**Planned changes:**
- In Event 1 (gameId: "default") gameplay UI, show a visible “Skip” button during levels.
- In Event 4 (gameId: "promises-100") gameplay UI, show a visible “Skip” button during levels.
- Implement skip behavior to advance to the next level and update the displayed/current level accordingly.
- Keep the “Skip” button visible on the final level (level 100) but disable it so it cannot be clicked.

**User-visible outcome:** When playing Event 1 or Event 4, users can always see a “Skip” button to move past the current level; on level 100 the button is shown but disabled.
