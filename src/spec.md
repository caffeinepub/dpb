# Specification

## Summary
**Goal:** Replace the Events Hub (post-password unlock) header’s current logo icon with a user-provided uploaded image.

**Planned changes:**
- Add the two uploaded images (`file_000000007b7c7206b4fb54a3c1ce9985.png`, `file_00000000b7ac720681a2c7cc9dc00ef9 (1).jpg`) to the frontend as static assets.
- Update the post-unlock Events Hub header to remove the existing icon logo and display the selected uploaded image instead.
- Ensure the new header logo is responsive across common mobile widths (no awkward cropping/overflow).

**User-visible outcome:** After entering the password and viewing the Events Hub event list, users see the new uploaded header logo instead of the previous icon, and it displays cleanly on mobile screens.
