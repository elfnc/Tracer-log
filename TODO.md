
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
- [ ] Create Kanban Board layout
- [ ] Create PROGRESS column
- [ ] Create SELESAI column
- [ ] Create REVISI PROGRESS column
- [ ] Create REVISI SELESAI column
- [ ] Create Work Card component
- [ ] Display R# on work card
- [ ] Display customer on work card
- [ ] Display notes indicator
- [ ] Display work date

### Kanban Interaction
- [ ] Implement drag and drop
- [ ] Update work status when moved
- [ ] Persist status changes
- [ ] Click card to open work detail
- [ ] Add search by R#
- [ ] Add search by customer
- [ ] Add date filter
- [ ] Add empty state per column
- [ ] Add loading / error state where applicable

---

## Day 4 — Daily Report Generator

### Report Data
- [ ] Define DailyReport interface
- [ ] Setup daily_reports table in Dexie
- [ ] Create report repository
- [ ] Create report store
- [ ] Implement report generation logic
- [ ] Filter work by selected report date
- [ ] Sort work by creation time
- [ ] Format date in Indonesian
- [ ] Read profile data for report header

### Report Template
- [ ] Implement report header
- [ ] Display employee name
- [ ] Display division
- [ ] Display position
- [ ] Generate work list
- [ ] Display R# / customer / status
- [ ] Exclude work notes from generated report
- [ ] Handle empty report

### Report UI
- [ ] Create date picker
- [ ] Create report preview
- [ ] Create Copy Report button
- [ ] Implement clipboard functionality
- [ ] Show copy success feedback
- [ ] Implement save report
- [ ] Implement report history
- [ ] Implement regenerate report

### Report Format Validation
- [ ] Validate weekday formatting
- [ ] Validate date formatting
- [ ] Validate uppercase status
- [ ] Validate line break formatting
- [ ] Validate report output against company format

---

## Day 5 — Dashboard & Profile

### Dashboard
- [ ] Create dashboard layout
- [ ] Display today's total work
- [ ] Display completed work count
- [ ] Display progress work count
- [ ] Display revision work count
- [ ] Display recent works
- [ ] Add quick action to create work
- [ ] Add shortcut to Daily Report
- [ ] Add dashboard date display

### Personal Profile
- [ ] Define Profile interface
- [ ] Setup profiles table in Dexie
- [ ] Create profile store
- [ ] Create profile settings form
- [ ] Input employee name
- [ ] Input division
- [ ] Input position
- [ ] Save profile
- [ ] Load profile on app initialization
- [ ] Update report header from profile

### UI Refinement
- [ ] Refine dashboard spacing
- [ ] Refine work card appearance
- [ ] Refine modal appearance
- [ ] Refine form validation feedback
- [ ] Add responsive behavior for mobile
- [ ] Check dark mode consistency

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
