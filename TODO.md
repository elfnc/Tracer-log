
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
- [x] Create Work History page
- [x] Display historical works
- [x] Filter by date
- [x] Filter by status
- [x] Search by R#
- [x] Search by customer
- [x] Open work detail from history
- [x] Edit work from history

### Testing
- [x] Test create work
- [x] Test edit work
- [x] Test delete work
- [x] Test notes persistence
- [x] Test Kanban drag and drop
- [x] Test status persistence
- [x] Test date filtering
- [x] Test report generation
- [x] Test clipboard copy
- [x] Test report history
- [x] Test profile persistence
- [x] Test browser refresh persistence
- [x] Test empty states
- [x] Test responsive layout

### Critical Validation
- [x] Notes never appear in report
- [x] Report only includes work from selected date
- [x] Work status matches current data
- [x] Profile changes affect newly generated reports
- [x] Saved report content remains consistent
- [x] No duplicate work caused by repeated actions

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

---

## Future Project — Design Order Report

> Admin-oriented report system for Rotary & Digital Printing Design Orders.
>
> Status: Backlog
> Priority: After TracerLog MVP

### Design Order Management

#### Data Layer
- [ ] Define DesignOrder interface
- [ ] Define design order status type
- [ ] Setup design_orders table in Dexie
- [ ] Create design order repository
- [ ] Create design order store

#### Design Order CRUD
- [ ] Create Add Design Order form
- [ ] Input design number
- [ ] Input customer name
- [ ] Input designer name
- [ ] Select design type (Rotary / Digital)
- [ ] Select design date
- [ ] Upload design image
- [ ] Add progress status
- [ ] Implement create design order
- [ ] Implement edit design order
- [ ] Implement delete design order
- [ ] Add form validation
- [ ] Add confirmation dialog for delete

### Design Order Table

#### Table Layout
- [ ] Create Design Order table layout
- [ ] Display design image thumbnail
- [ ] Display customer name
- [ ] Display design number
- [ ] Display designer name
- [ ] Display design type
- [ ] Display progress status
- [ ] Display design date
- [ ] Add empty state
- [ ] Add loading / error state where applicable

#### Table Interaction
- [ ] Implement search by design number
- [ ] Implement search by customer
- [ ] Implement search by designer
- [ ] Add filter by design type (Rotary / Digital)
- [ ] Add filter by progress status
- [ ] Add date filter
- [ ] Open design order detail
- [ ] Edit design order from table

### Design Order Report Generator

#### Report Data
- [ ] Define DesignOrderReport interface
- [ ] Implement report generation logic
- [ ] Filter design orders by selected date
- [ ] Calculate total design count
- [ ] Generate customer list
- [ ] Group report data by customer where applicable
- [ ] Format date in Indonesian

#### Report Template
- [ ] Implement report header
- [ ] Display report date
- [ ] Display total design count
- [ ] Generate customer list
- [ ] Validate output against company report format

#### Report UI
- [ ] Create date picker
- [ ] Create report preview
- [ ] Create Copy Report button
- [ ] Implement clipboard functionality
- [ ] Show copy success feedback
- [ ] Implement save report
- [ ] Implement report history
- [ ] Implement regenerate report

#### Report Format Validation
- [ ] Validate weekday formatting
- [ ] Validate date formatting
- [ ] Validate total design count
- [ ] Validate customer list formatting
- [ ] Validate line break formatting
- [ ] Validate report output against company format

### Data Management

- [ ] Implement design order history
- [ ] Add import from Excel
- [ ] Add export to Excel
- [ ] Persist design order data to IndexedDB
- [ ] Test image persistence
- [ ] Test data persistence after browser refresh

### Testing

- [ ] Test create design order
- [ ] Test edit design order
- [ ] Test delete design order
- [ ] Test image upload
- [ ] Test search and filters
- [ ] Test report generation
- [ ] Test clipboard copy
- [ ] Test report history
- [ ] Test browser refresh persistence
- [ ] Test responsive layout
- [ ] Test duplicate design order handling

### Critical Validation

- [ ] Total design count matches filtered data
- [ ] Report only includes design orders from selected date
- [ ] Customer list matches report data
- [ ] Rotary and Digital orders are handled correctly
- [ ] Report output follows company format
- [ ] No duplicate design orders caused by repeated actions

---
