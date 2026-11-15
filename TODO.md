
# TracerLog — TODO

> Personal Worklog & Daily Report Generator
>
> Challenge: Week 1
> Target: 7 Days
> Status: In Progress

---

## Day 1 — Project Foundation

### Project Setup
- [x] Initialize Vue 3 + Vite + TypeScript
- [x] Setup Tailwind CSS
- [x] Install Pinia
- [x] Install Dexie.js
- [x] Install Lucide Vue
- [x] Install date-fns
- [x] Setup project folder structure

### UI Foundation
- [x] Define color palette
- [x] Define typography (Plus Jakarta Sans)
- [x] Setup dark mode
- [x] Create application layout
- [x] Create sidebar navigation
- [x] Create responsive layout
- [x] Create reusable button component
- [x] Create reusable input component
- [x] Create reusable modal component
- [x] Create reusable badge component

### Navigation
- [x] Dashboard page
- [x] Kanban Board page
- [x] Daily Report page
- [x] Work History page
- [x] Settings page

---

## Day 2 — Work Management

### Data Layer
- [x] Define Work interface
- [x] Define WorkStatus type
- [x] Setup Dexie database
- [x] Create works table
- [x] Create work repository
- [x] Create Pinia work store

### Work CRUD
- [x] Create Add Work form
- [x] Input R# number
- [x] Input customer name
- [x] Select work status
- [x] Select work date
- [x] Add work notes
- [x] Implement create work
- [x] Implement edit work
- [x] Implement delete work
- [x] Implement work detail modal
- [x] Add form validation
- [x] Add confirmation dialog for delete

### Work Notes
- [x] Add notes field to work detail
- [x] Implement notes editing
- [x] Persist notes to IndexedDB
- [x] Show notes indicator on work card
- [x] Ensure notes are internal only

---

## Day 3 — Kanban Board

### Kanban Layout
- [x] Create Kanban Board layout
- [x] Create PROGRESS column
- [x] Create SELESAI column
- [x] Create REVISI PROGRESS column
- [x] Create REVISI SELESAI column
- [x] Create Work Card component
- [x] Display R# on work card
- [x] Display customer on work card
- [x] Display notes indicator
- [x] Display work date

### Kanban Interaction
- [x] Implement drag and drop
- [x] Update work status when moved
- [x] Persist status changes
- [x] Click card to open work detail
- [x] Add search by R#
- [x] Add search by customer
- [x] Add date filter
- [x] Add empty state per column
- [x] Add loading / error state where applicable

---

## Day 4 — Daily Report Generator

### Report Data
- [x] Define DailyReport interface
- [x] Setup daily_reports table in Dexie
- [x] Create report repository
- [x] Create report store
- [x] Implement report generation logic
- [x] Filter work by selected report date
- [x] Sort work by creation time
- [x] Format date in Indonesian
- [x] Read profile data for report header

### Report Template
- [x] Implement report header
- [x] Display employee name
- [x] Display division
- [x] Display position
- [x] Generate work list
- [x] Display R# / customer / status
- [x] Exclude work notes from generated report
- [x] Handle empty report

### Report UI
- [x] Create date picker
- [x] Create report preview
- [x] Create Copy Report button
- [x] Implement clipboard functionality
- [x] Show copy success feedback
- [x] Implement save report
- [x] Implement report history
- [x] Implement regenerate report

### Report Format Validation
- [x] Validate weekday formatting
- [x] Validate date formatting
- [x] Validate uppercase status
- [x] Validate line break formatting
- [x] Validate report output against company format

---

## Day 5 — Dashboard & Profile

### Dashboard
- [x] Create dashboard layout
- [x] Display today's total work
- [x] Display completed work count
- [x] Display progress work count
- [x] Display revision work count
- [x] Display recent works
- [x] Add quick action to create work
- [x] Add shortcut to Daily Report
- [x] Add dashboard date display

### Personal Profile
- [x] Define Profile interface
- [x] Setup profiles table in Dexie
- [x] Create profile store
- [x] Create profile settings form
- [x] Input employee name
- [x] Input division
- [x] Input position
- [x] Save profile
- [x] Load profile on app initialization
- [x] Update report header from profile

### UI Refinement
- [x] Refine dashboard spacing
- [x] Refine work card appearance
- [x] Refine modal appearance
- [x] Refine form validation feedback
- [x] Add responsive behavior for mobile
- [x] Check dark mode consistency

---

## Day 6 — Work History & Testing

### Work History
- [ ] Create Work History page
- [ ] Display historical works
- [ ] Filter by date
- [ ] Filter by status
- [ ] Search by R#
- [ ] Search by customer
- [ ] Open work detail from history
- [ ] Edit work from history

### Testing
- [ ] Test create work
- [ ] Test edit work
- [ ] Test delete work
- [ ] Test notes persistence
- [ ] Test Kanban drag and drop
- [ ] Test status persistence
- [ ] Test date filtering
- [ ] Test report generation
- [ ] Test clipboard copy
- [ ] Test report history
- [ ] Test profile persistence
- [ ] Test browser refresh persistence
- [ ] Test empty states
- [ ] Test responsive layout

### Critical Validation
- [ ] Notes never appear in report
- [ ] Report only includes work from selected date
- [ ] Work status matches current data
- [ ] Profile changes affect newly generated reports
- [ ] Saved report content remains consistent
- [ ] No duplicate work caused by repeated actions

---

## Day 7 — Finalization

### Documentation
- [ ] Create README.md
- [ ] Write project overview
- [ ] Write feature list
- [ ] Document tech stack
- [ ] Document installation steps
- [ ] Document usage instructions
- [ ] Add screenshots
- [ ] Document local-first data storage
- [ ] Document known limitations

### Release
- [ ] Run production build
- [ ] Fix build errors
- [ ] Fix console errors
- [ ] Perform final UI review
- [ ] Test real daily report workflow
- [ ] Prepare GitHub repository
- [ ] Publish MVP

### Retrospective
- [ ] Record completed features
- [ ] Record bugs found during usage
- [ ] Record improvements for future version
- [ ] Evaluate usefulness in actual work

---

## Future Development — Out of Scope

### Productivity
- [ ] Pomodoro timer
- [ ] Focus session history
- [ ] Desktop notification

### Data
- [ ] Export report to TXT
- [ ] Export works to CSV
- [ ] Backup data to JSON
- [ ] Restore data from JSON

### Desktop
- [ ] PWA installation
- [ ] Windows tray application
- [ ] Desktop application with Tauri

### Analytics
- [ ] Weekly work summary
- [ ] Monthly work summary
- [ ] Work status statistics
- [ ] Revision statistics

---

## Definition of Done

- [ ] All MVP features implemented
- [ ] Work CRUD works correctly
- [ ] Kanban Board works correctly
- [ ] Notes are persisted
- [ ] Daily Report Generator produces correct output
- [ ] Notes are excluded from reports
- [ ] Copy Report works
- [ ] Work History works
- [ ] Profile settings work
- [ ] Data persists after browser refresh
- [ ] Production build succeeds
- [ ] README is complete
- [ ] MVP is usable in daily work
