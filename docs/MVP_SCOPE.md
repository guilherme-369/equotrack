# EquoTrack MVP Scope

The MVP contains exactly five primary pages.

## 1. Dashboard

Route:

/

Purpose:

Provide a concise operational overview.

Content:

- active practitioners;
- sessions registered during the current month;
- sessions pending registration;
- recent records;
- pending sessions.

Do not add decorative analytics.

---

## 2. Practitioners

Route:

/praticantes

Purpose:

Allow users to locate practitioners and access their longitudinal history.

Content:

- search;
- status filter;
- practitioner name;
- last session;
- status;
- navigation to practitioner history.

Use fictional data.

---

## 3. Practitioner History

Route:

/praticantes/:id

Purpose:

Display chronological session history.

This is one of the most important screens in the MVP.

Content:

- practitioner identification;
- number of registered sessions;
- first record;
- latest record;
- chronological timeline;
- structured observations;
- narrative observations;
- access to complete session record;
- action to register a new session.

Do not calculate arbitrary clinical improvement percentages.

---

## 4. New Session

Route:

/sessoes/nova

Purpose:

Demonstrate standardized session recording.

Groups:

### Motor

- posture;
- balance;
- assistance level.

### Behavioral

- response to commands;
- engagement;
- behavior.

### Communication and interaction

- communication;
- social interaction;
- interaction with horse.

### Session

- performed activities;
- incidents;
- complementary observations.

Include a discreet notice explaining that prototype variables are
demonstrative and require professional evaluation before clinical use.

---

## 5. Reports

Route:

/relatorios

Purpose:

Demonstrate consolidation of structured and narrative records.

Content:

- practitioner selection;
- date range;
- number of sessions;
- consolidated structured observations;
- chronological narrative records;
- print action.

A real PDF generation system is not required for the initial MVP.

---

# Explicitly outside MVP

Do not implement:

- authentication;
- login;
- backend;
- production database;
- professional permission system;
- notifications;
- WhatsApp integration;
- AI-generated clinical analysis;
- complex scheduling;
- billing;
- document upload;
- complete electronic health record;
- advanced analytics;
- unrelated settings pages.
