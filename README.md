# Internal Ticketing & Case Management System (Backend)

A production-oriented, API-first backend system for managing internal support tickets with **clear ownership, auditability, and role-based workflows**.

This project focuses on **backend correctness and system design**, not UI.

---

## Overview

Organizations often manage internal support (IT, HR, Ops, Academic support) via emails or chats, which leads to:

- Lost requests  
- No clear ownership  
- No audit trail  
- Poor visibility into workload and resolution time  

This system centralizes internal requests into a **structured, auditable ticket lifecycle** designed for real-world internal tools.

---

## Core Design Principles

- API-first (no frontend included)
- Strong role boundaries
- Explicit ownership and transfer rules
- Full audit history
- Transaction-safe operations
- Maintainable, explainable backend logic

---

## Roles

### Requester
- Raises tickets
- Views and comments on own tickets
- Cannot control workflow or assignment

### Support Agent
- Owns ticket resolution
- Assigns, prioritizes, and moves tickets through lifecycle
- Communicates with requesters

### Admin
- Manages users, roles, tickets and system configuration
- Has system-level visibility
- Does not work on tickets directly

---

## Ticket Lifecycle

- Tickets start unassigned
- Only agents can move tickets forward
- Closed tickets are immutable
- Every state change is logged

---

## Ownership & Auditability

- Only **one agent owns a ticket at a time**
- Ownership changes require explicit transfer with reason
- All actions are recorded:
  - Status changes
  - Assignments
  - Comments
  - Actor and timestamp
- No hard deletes (soft deletes only)

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- Transaction-based workflows
- Environment-based configuration

---

## Success Criteria

- No tickets are lost  
- Ownership is always clear  
- Ticket history is fully auditable  
- Role-based access is enforced  
- Backend logic is easy to reason about and extend  

---

## About the Author

Built as a **serious backend engineering portfolio project**, reflecting real-world internal systems rather than tutorial-style CRUD apps.

---


