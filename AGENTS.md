# EquoTrack — Codex Instructions

## Project

EquoTrack is an academic MVP for structured recording and longitudinal
tracking of equine-assisted therapy sessions.

Before implementing or modifying UI, read:

- docs/PRODUCT.md
- docs/MVP_SCOPE.md
- docs/DESIGN_SYSTEM.md

These documents are the source of truth for product scope and visual design.

## Working principles

1. Inspect the existing codebase before modifying files.
2. Implement only what the current task requests.
3. Do not add features outside MVP_SCOPE.md.
4. Prefer simple implementations over premature abstractions.
5. Reuse existing components before creating new ones.
6. Do not introduce dependencies without a concrete reason.
7. Preserve the visual language defined in DESIGN_SYSTEM.md.
8. Use mock data unless explicitly instructed otherwise.
9. Do not present prototype variables as clinically validated measures.
10. Keep code readable and appropriately typed.

## Stack

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

Do not introduce a backend, database, authentication system, state management
framework, animation framework, or component library unless explicitly requested.

## Design workflow

When creating or substantially modifying UI, use the frontend-design skill
when available.

Project-specific rules in DESIGN_SYSTEM.md take precedence over generic
recommendations from skills.

Do not redesign unrelated areas while implementing a feature.

## UI restrictions

Do not use:

- gradients
- glassmorphism
- excessive shadows
- oversized typography
- decorative charts
- floating decorative cards
- excessive border radius
- emojis as interface icons
- arbitrary accent colors
- decorative illustrations
- meaningless metrics
- unnecessary animations
- generic dashboard filler
- a card around every section

The interface should look like a restrained professional working tool,
not a generated dashboard template.

## Validation

After meaningful implementation changes:

1. run TypeScript checks when configured;
2. run lint when configured;
3. run the production build;
4. fix errors introduced by the change;
5. check basic responsive behavior.

Do not claim a check passed unless it was actually executed.

## Scope discipline

If a requested feature conflicts with MVP_SCOPE.md, mention the conflict
before expanding the scope.

When requirements are ambiguous, choose the simplest solution compatible
with the existing product documentation.
