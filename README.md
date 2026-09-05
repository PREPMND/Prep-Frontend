# PREP — From Problems to Solutions

> **A civic problem-solving platform that turns citizen-reported challenges into structured, research-backed, actionable solutions.**

PREP is built around a simple idea:

**Reporting a problem should be the beginning of the process — not the end.**

Most grievance systems stop when a complaint receives a ticket number. PREP is designed to close the loop by connecting the people who experience problems with the institutions, researchers, social organizations, and government bodies capable of solving them.

---

## 🌍 The Idea

```text
                 ┌─────────────────────┐
                 │      CITIZEN        │
                 │  Reports a problem  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      CHALLENGE      │
                 │ Structured + AI     │
                 │ assisted + evidence │
                 └──────────┬──────────┘
                            │
                            ▼
              ┌───────────────────────────┐
              │   RELEVANT ORGANIZATIONS  │
              │ Universities • R&D • NGOs │
              │ Government • Institutions │
              └─────────────┬─────────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │       RESEARCH      │
                 │ Evidence + analysis │
                 │ + practical work    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      SOLUTION       │
                 │ Research-backed    │
                 │ actionable proposal │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     GOVERNMENT      │
                 │ Review → Implement  │
                 └──────────┬──────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │    SOLVED    │
                    └──────────────┘
```

PREP therefore isn't intended to be another complaint portal.

It is an **end-to-end problem-resolution ecosystem**.

---

# ✨ Why PREP?

Real-world problems are everywhere.

What is often missing is the bridge between:

- **ground reality**
- **credible evidence**
- **research capability**
- **institutional expertise**
- **government execution**
- **public accountability**

PREP is designed to become that bridge.

A citizen may know *what* is wrong.

A researcher may know *how* it could be solved.

An institution may have the expertise and resources to investigate it.

A government body may have the authority to implement the solution.

**PREP connects them.**

---

# 🚀 What Already Exists

The current platform foundation includes several production-oriented pieces.

### 👤 Authentication

Protected platform access with JWT-based authentication.

The system separates:

```text
Who is the user?
        ↓
What role do they have?
        ↓
Which organization do they represent?
        ↓
What can they do within that organization?
```

---

### 🧩 Challenge Reporting

Citizens can report real-world challenges with:

- Title
- Detailed description
- Category
- Subcategory
- Location
- Supporting evidence

Challenges are persisted independently from the AI layer, so an AI failure does not destroy the core reporting flow.

---

### 🤖 AI-Assisted Classification

PREP can analyze a challenge and suggest:

```text
Category
Subcategory
Confidence
```

The AI is deliberately treated as an **assistant**, not an authority.

The platform can use AI to structure incoming real-world problems while keeping the underlying challenge data deterministic and reviewable.

---

### 🔎 Duplicate Detection

New challenges can be compared against relevant existing challenges using semantic similarity.

Instead of blindly creating another copy of the same problem:

```text
New challenge
      ↓
Find relevant candidates
      ↓
Semantic similarity
      ↓
Potential duplicates
```

This allows PREP to surface related problems without automatically blocking legitimate reports.

---

### 📸 Evidence & Media

Media is handled through a dedicated media service rather than coupling file storage directly to the challenge domain.

```text
Upload evidence
      ↓
Media service
      ↓
mediaId
      ↓
Challenge
```

This separation keeps the challenge service focused on domain logic.

---

### 🏢 Organization-Aware Architecture

Organizations are first-class entities.

The system is designed for:

- Universities
- Research institutions
- Government departments
- Government agencies
- NGOs
- Social-development organizations
- Private organizations through the platform configuration

A user can belong to multiple organizations with different responsibilities.

For example:

```text
User
 ├── University A → ADMIN
 ├── Research Institute B → MEMBER
 └── Government Department → OFFICER
```

This is intentionally different from simply putting an `organizationId` into a JWT.

**Authentication answers who you are.**

**Organization membership answers who you represent.**

**Organization authorization answers what you can do there.**

---

# 🏛️ The Organization Layer

One of the important architectural goals of PREP is to model the real ecosystem around a problem.

Organizations have their own:

- Identity
- Type
- Verification state
- Profile
- Members
- Organization roles
- Location
- Contact information

The platform can therefore move toward:

```text
Challenge
    ↓
Which organizations are relevant?
    ↓
Who inside those organizations can act?
    ↓
What work is being done?
```

This creates the foundation for institution-driven problem solving rather than passive complaint collection.

---

# 📍 Grounded in Jharkhand

The initial ecosystem is being built around a researched Jharkhand organization directory covering:

- Educational institutions
- R&D organizations
- Government departments
- Government agencies / utilities
- NGOs and social-development organizations

The research includes institutions such as IIT (ISM) Dhanbad, NIT Jamshedpur, BIT Mesra, Ranchi University, Birsa Agricultural University and XISS, along with research organizations including CSIR-CIMFR, CSIR-NML, SAIL RDCIS and ICAR research organizations. fileciteturn4file0L13-L60 fileciteturn4file0L63-L106

The government ecosystem includes departments covering areas such as roads, water, health, agriculture, education, rural development, urban development, environment, energy and more. fileciteturn4file0L109-L169

This gives PREP a realistic starting point instead of filling the application with arbitrary fictional institutions.

---

# 🔄 The Problem Lifecycle

PREP is designed around a transparent lifecycle:

```text
PENDING
   ↓
UNDER RESEARCH
   ↓
SOLUTION PROPOSED
   ↓
UNDER IMPLEMENTATION
   ↓
SOLVED
```

Every stage represents a meaningful transition.

The long-term goal is for citizens to see not just:

> "Your complaint has been registered."

but:

> **"Here is what happened after you reported it."**

---

# 🧠 Architecture Philosophy

PREP is being built as a modular system rather than a single giant application.

The backend is separated into domain-oriented services such as:

```text
Authentication
       │
       ├── Identity
       └── Access tokens

Challenges
       │
       ├── Challenge lifecycle
       ├── AI classification
       └── Duplicate detection

Media
       │
       └── Evidence storage

Organizations
       │
       ├── Organization identity
       ├── Membership
       ├── Organization roles
       └── Organization authorization

Future
       │
       ├── Research
       ├── Solutions
       ├── Government workflows
       └── Notifications
```

The architecture is deliberately designed so that individual capabilities can evolve independently.

---

# ⚡ Built for Asynchronous Scale

As the platform grows, expensive workflows can move away from the request/response path.

The planned infrastructure includes:

**Kafka + Redis + BullMQ**

For example:

```text
Challenge Created
       │
       ▼
   API Response
       │
       ▼
     Kafka
       │
 ┌─────┼─────────────┐
 ▼     ▼             ▼
AI   Duplicate   Organization
     Detection    Matching

Redis + BullMQ
       │
       ├── Background jobs
       ├── Retries
       ├── Media processing
       └── Notifications
```

The goal isn't to use infrastructure for the sake of saying it was used.

The goal is to introduce asynchronous architecture where the product actually benefits from it.

---

# 🔐 Security & Authorization

PREP is designed with layered authorization in mind.

```text
JWT Authentication
        ↓
Platform identity
        ↓
Organization membership
        ↓
Organization role
        ↓
Permission
```

This prevents the common mistake of treating:

```text
ADMIN
```

as a universal permission.

An administrator of one organization should not automatically become an administrator everywhere.

---

# 🎯 The Bigger Vision

Imagine a citizen reports:

> "The main road connecting several villages has severe potholes and accidents are occurring."

Instead of ending there:

```text
Citizen reports problem
        ↓
AI structures the challenge
        ↓
Evidence is attached
        ↓
Similar problems are detected
        ↓
Relevant organizations are surfaced
        ↓
Research institution investigates
        ↓
Evidence-backed solution is proposed
        ↓
Responsible government body reviews it
        ↓
Implementation begins
        ↓
Citizen sees the progress
        ↓
Problem is resolved
```

That is the product we are building.

---

# 🧪 Current Development Philosophy

PREP is being developed incrementally.

We are prioritizing:

1. **Correct domain modeling**
2. **Reliable core workflows**
3. **Strong separation of responsibilities**
4. **Realistic organization data**
5. **Clear authorization boundaries**
6. **AI where it genuinely improves the workflow**
7. **Asynchronous infrastructure where scale requires it**
8. **A polished frontend that exposes the underlying architecture clearly**

The objective is not to build a collection of disconnected features.

The objective is to build a coherent system.

---

# 🛣️ Roadmap

### Phase 1 — Foundation

- Authentication
- Challenge reporting
- Media
- AI classification
- Duplicate detection
- Organization identity
- Organization memberships
- Organization-level authorization

### Phase 2 — Discovery

- Challenge discovery
- Organization discovery
- Location-aware filtering
- Relevant organization matching

### Phase 3 — Research

- Institution challenge pickup
- Research workspace
- Research findings
- Collaboration

### Phase 4 — Solutions

- Research-backed solution submission
- Government review
- Approval / rejection with reasoning
- Solution lifecycle

### Phase 5 — Implementation

- Implementation tracking
- Status history
- Citizen visibility
- Notifications
- Realtime updates

### Phase 6 — Scale

- Kafka events
- Redis
- BullMQ workers
- Caching
- Background processing
- Retry strategies
- Analytics

---

# 🧭 What Makes PREP Different

Most systems optimize for:

> **"Can we register the complaint?"**

PREP asks:

> **"What happens after the complaint?"**

That leads to a fundamentally different architecture.

```text
Complaint
   ≠
Resolution
```

PREP attempts to build the infrastructure connecting the two.

---

# 💎 The Core Principle

> ### **A reported problem should have a path to a researched solution, an accountable decision, and a visible outcome.**

That's PREP.

---

## Project Status

🚧 **Actively under development**

The platform is currently being developed with the citizen challenge workflow and organization ecosystem as the core foundation. Research, solution, government execution, event-driven processing and additional collaboration capabilities are being built progressively.

