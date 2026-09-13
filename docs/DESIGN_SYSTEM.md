# EquoTrack Design System

## Direction and scope

EquoTrack expresses **technology supporting structured care in an equotherapy
environment**: professional, calm, welcoming and contemporary, with clinical
clarity and a subtle connection to nature. Warmth comes from the green brand,
human language and considered typography, not decorative imagery.

This document is the official target for controlled visual refinement. It
supersedes the previous visual specification; it does not claim the current
application already implements these tokens. Apply changes only in separately
requested implementation tasks. Product scope remains governed by PRODUCT.md
and MVP_SCOPE.md.

Preserve exactly five primary pages: `/`, `/praticantes`, `/praticantes/:id`,
`/sessoes/nova` and `/relatorios`. Preserve shared mock data, search and filters,
routing, chronology and disclosure, form validation and simulated saving,
report aggregation, date filtering, printing and responsive behavior. Visual
refinement must not add functionality, dependencies or clinical interpretation.

## Color tokens and responsibilities

| Token | Value | Role |
| --- | --- | --- |
| `background` | `#F8F9FA` | Application background; subtle table header surface |
| `surface` | `#FFFFFF` | Reading surfaces, controls and documents |
| `brand` | `#2D5A4C` | Structural green, identity and sidebar |
| `brand-dark` | `#23483D` | Strong structural areas and brand hover states |
| `brand-soft` | `#EAF2EE` | Selected states on light surfaces; restrained green grouping |
| `action` | `#3B82F6` | Foundational action blue; non-text action emphasis |
| `action-strong` | `#2563EB` | Accessible filled CTA, important links; darker base-blue hover |
| `action-hover` | `#1D4ED8` | Hover/pressed treatment for accessible CTAs and links |
| `action-soft` | `#EFF6FF` | Subtle interactive background |
| `foreground` | `#1E293B` | Primary text |
| `muted` | `#64748B` | Secondary text, labels and supporting information |
| `border` | `#E2E8F0` | Neutral separators and surface borders |
| `control-border` | `#7B8BA1` | Control boundaries when needed for identification |
| `success` | `#16A34A` | Actual success indicators |
| `warning` | `#D97706` | Actual warning indicators |
| `error` | `#DC2626` | Errors and genuinely destructive actions |
| `success-text` | `#166534` | Success text on white/light neutral surfaces |
| `warning-text` | `#92400E` | Warning text on white/light neutral surfaces |

Green owns identity, structural emphasis, sidebar and selected navigation.
Blue owns primary actions, important links and focus/action emphasis. Do not
alternate them arbitrarily. Brand green may support an “Ativo” badge or a
subtle positive context; it must not imply clinical improvement. “Pausado”
remains neutral, not a warning. Status colors convey status, never decoration.

Use 60–30–10 as a compositional guide: roughly 60% neutral/off-white surfaces,
30% structural green **and supporting neutral hierarchy**, and 10% blue action
emphasis. These are not area quotas; do not fill 30% of the content with green.

### Contrast takes precedence

The requested white label on `#3B82F6` has approximately **3.68:1** contrast.
It cannot be the default 16px/500 CTA treatment under the AA text target.
Keep that foundation color, but use **white on `#2563EB`** for normal-sized
filled CTA labels (approximately **5.17:1**), with `#1D4ED8` on hover.
Do not enlarge button labels to evade the contrast requirement.

Likewise, `success` and `warning` do not provide sufficient normal-text
contrast against white; use their text variants or `foreground` alongside a
status icon. `border` is a separator token, not a sufficient sole control
boundary on white. Use `control-border` where the boundary identifies a control.
Recheck actual foreground/background combinations, opacity and all states;
these calculated examples are not a declaration of application compliance.

## Typography

Headings use **Plus Jakarta Sans**; body and UI use **Inter**. Use `sans-serif`
fallbacks and retain readable layouts while fonts load. Do not add fonts until
an implementation task authorizes the visual migration.

| Role | Family | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| H1 / page title | Plus Jakarta Sans | 32px | 700 | 1.25 | -0.02em |
| H2 / major section | Plus Jakarta Sans | 24px | 600 | 1.3 | -0.01em |
| H3 / subsection | Plus Jakarta Sans | 20px | 600 | 1.35 | normal |
| Body / narrative / UI | Inter | 16px | 400 | 1.5 | normal |
| Small / label | Inter | 14px | 500 | 1.4 | 0.01em |

Use typography and alignment to establish hierarchy before adding containers.
Compact field-group headings may use the label style while retaining the
correct semantic heading level. Dates and counts may use tabular numerals.
Keep narrative text comfortably readable; no oversized marketing typography.

## Spacing, dimensions and responsiveness

Use an **8pt layout system**: 8, 16, 24, 32, 48 and, only when necessary, 64px.

| Context | Value |
| --- | --- |
| Page horizontal padding | Desktop 32px; tablet 24px; mobile 16px |
| Section spacing | 32–48px according to hierarchy |
| Card padding | 24px |
| Compact internal gaps | 8–16px |
| Form group spacing | 24–32px |
| General content maximum | 1440px |
| Form, history and report reading maximum | Approximately 900px |
| Sidebar width | 240–256px; target 256px |
| Practical interactive target | At least 44 × 44px |

The 8pt system governs layout, not every measurement: 1px borders, focus
outlines, icon dimensions, 12px button vertical padding and 44px targets are
intentional exceptions. Keep information density useful; avoid excessive air.

Keep current breakpoints: mobile below 768px; tablet 768–1024px; desktop above
1024px. Desktop uses the persistent sidebar. Smaller screens retain compact
navigation without additional destinations. Forms and summaries stack on
mobile; narrative fields remain full width. Tables become readable compact
rows where appropriate. Preserve keyboard access, content and chronology;
prevent uncontrolled horizontal scrolling and support zoom/reflow.

## Surfaces, radii and elevation

| Token | Value |
| --- | --- |
| Input radius | 8px |
| Button radius | 8px |
| Card radius | 12px |
| Modal radius, only if separately required | 12px |
| Badge radius | Pill permitted for compact semantic status |
| Standard shadow | `0 1px 3px rgba(0, 0, 0, 0.05)` |
| Elevated shadow | `0 10px 15px -3px rgba(0, 0, 0, 0.08)` |
| Surface border | `1px solid #E2E8F0` |

Cards use white, the surface border, 12px radius, standard shadow and 24px
padding. Use them for meaningful information groups, never every field,
heading or form section. Elevated shadows are exceptional functional feedback,
not a default hover effect for every row. Most separation comes from spacing,
borders, typography and surface contrast. Do not make the interface float.

## Navigation and brand

The desktop sidebar is a primary identity element: `brand` or `brand-dark`
background, a restrained EquoTrack brand area and light text. Use white for
active text and `#E2E8F0` for quieter, readable inactive text. An active item
may use `rgba(255, 255, 255, 0.12)` over the structural green, reinforced by
weight and `aria-current`; validate contrast after compositing. On light
navigation surfaces, use `brand-soft` with `brand` text.

Keep only Dashboard, Praticantes, Nova sessão and Relatórios. Use Lucide icons
consistently, normally 16, 18 or 20px within adequate targets. Decorative icons
are hidden from assistive technology; icon-only controls need accessible names.

At most one small, flat nature/equestrian-inspired brand detail may be considered
in a future authorized refinement, away from navigation text. It must not become
an illustration, stock image or repeated horse motif. The identity must work
without it. Do not add Settings, Professionals, Calendar or other destinations.

## Buttons, links and focus

- **Primary CTA:** accessible action fill `#2563EB`, white text, Inter 16px/500,
  approximately 12px 24px padding, 8px radius and at least 44px height. Hover or
  pressed fill uses `action-hover`. `#3B82F6` remains the foundation color;
  the contrast exception above governs white-label buttons.
- **Secondary:** white or transparent, 1px border, `foreground` text, 8px radius
  and at least 44px height. Use a stronger boundary when required for contrast.
- **Destructive:** error styling only for genuinely destructive actions;
  defining the style does not authorize new edit/delete functionality.
- **Links:** `action-strong`, with underlining or another non-color cue where
  needed to distinguish them from surrounding text.
- **Focus:** visible 2px outline with 2px offset; action-blue family on light
  surfaces. On dark green, use a contrasting light outer ring so focus remains
  visible. Focus must not depend on hover or be clipped by a container.

Provide approximately 44 × 44px targets for navigation, controls, timeline and
session actions, especially on touch screens. Expand hit areas without enlarging
icons unnecessarily. Disabled states must remain understandable and semantic.

## Tables, forms and status

Tables use clear headers on a subtle neutral surface, horizontal separators,
comfortable rows, strong name hierarchy, muted secondary values and restrained
hover feedback. Avoid heavy grids, excessive vertical lines and strong zebra
striping. Keep appropriate table semantics and accessible row navigation.

Forms remain continuous sections: heading/legend, optional supporting text,
fields, spacing and subtle divider. Controls use at least 44px height, 8px radius,
neutral surfaces and visible focus. Use two columns where natural on larger
screens, one on mobile, and full-width narrative areas.

Associate labels and controls; mark required fields with a restrained asterisk.
Preserve inline error text, `aria-invalid`, error descriptions and first-invalid
focus. Success, warning and error feedback uses text plus a suitable icon when
additional clarity is needed, never color alone. Preserve the explicit simulated
save message and the discreet prototype notices; do not turn them into alerts.

## Page-specific continuity

- **Dashboard:** retain the existing operational overview and meaningful groups;
  add no decorative metrics, charts or filler.
- **Praticantes:** retain local name search, status filtering, count feedback,
  empty state and navigation to each practitioner's history.
- **History:** chronology remains central, with dates, restrained markers,
  subtle vertical line, structured observations and narrative content. Preserve
  accessible disclosure and practitioner preselection for a new session.
- **Nova sessão:** maintain all existing fields, native controls, validation and
  local mock-save behavior. Visual grouping must preserve narrative importance.
- **Relatórios:** distinguish configuration UI from the white document preview.
  Preserve deterministic frequencies, date filtering and chronological records.
  Print only the report content, hiding application navigation and controls;
  remove decorative borders/shadows, retain readable text and sensible page breaks.

## Accessibility and implementation checks

Target **WCAG 2.1 AA**. Use at least 4.5:1 for normal text and 3:1 for qualifying
large text; essential visual control/state cues need 3:1 against adjacent colors.
See the W3C guidance on [text contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
and [non-text contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html).
The practical 44px target is this product's usability standard, not a claim that
WCAG 2.1 AA universally mandates that size.

Preserve semantic headings, labels, keyboard operation, skip navigation,
visible focus, disclosure state and assistive-technology feedback. State must
remain understandable without color. Check actual rendered combinations,
including small text on tinted backgrounds and sidebar interaction states.

When implementation is requested, reuse AppLayout, StatusBadge, SessionTimeline
and established native control patterns. There are currently no shared Button
or Input components. Separate brand and action tokens deliberately: the existing
`primary` token serves both roles and must not be blindly recolored globally.
Run configured lint, TypeScript checks and production build after meaningful
code changes, plus responsive, keyboard and print checks relevant to the change.

## Restraint and prohibited patterns

Avoid the appearance of a generic admin template, hospital enterprise suite,
fintech product, children's application, futuristic health concept, AI landing
page or rustic horse-themed website. Use brand, palette, language and spacing
for the equestrian connection.

Do not use glassmorphism, neon, giant typography, excessive rounded cards,
floating widgets, excessive shadows, emojis, decorative charts or stock imagery,
rainbow cards, excessive colored icon containers, unnecessary content or motion.
Gradients are not a default decoration; AGENTS.md currently prohibits them, so
they remain excluded. The optional brand detail above does not authorize a
prohibited decorative illustration.

Allow only useful hover/focus feedback, typically 150–200ms, respecting reduced
motion. No entrance animations. Never introduce meaningless analytics, arbitrary
progress percentages, clinical scores, diagnoses, recommendations or AI clinical
conclusions. Prototype variables remain demonstrative and unvalidated.
