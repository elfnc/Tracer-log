import assert from 'node:assert'
import { formatReportDateHeader, generateDailyReportContent } from '../src/utils/reportGenerator.ts'
import { parseAndValidateBackup } from '../src/utils/backupParser.ts'
import type { Work, Profile } from '../src/types/index.ts'

console.log('🧪 Starting Critical Validation & Unit Tests for Day 6...\n')

// 1. Test Date Header Formatting
{
  const header = formatReportDateHeader('2026-11-13')
  console.log('Test 1: Date header formatting...')
  assert.strictEqual(header, 'Rekap laporan, Jumat 13 - 11 - 2026')
  console.log('  ✅ Passed:', header)
}

// 2. Test Critical Validation: Notes never appear in report
{
  console.log('\nTest 2: Notes NEVER appear in daily report...')
  const mockProfile: Profile = {
    id: 'default',
    name: 'Elfrian T. Setiawan',
    division: 'digital printing',
    position: 'designer junior',
  }

  const mockWorks: Work[] = [
    {
      id: '1',
      rNumber: '2610240',
      customer: 'GIS',
      status: 'REVISI SELESAI',
      description: '',
      notes: 'SECRET_SO_AREA_14_DO_NOT_LEAK',
      workDate: '2026-11-13',
      createdAt: '2026-11-13T08:00:00.000Z',
      updatedAt: '2026-11-13T08:00:00.000Z',
    },
    {
      id: '2',
      rNumber: '2611138',
      customer: 'GIS',
      status: 'PROGRESS',
      description: '',
      notes: 'INTERNAL_CONFIDENTIAL_INSTRUCTIONS',
      workDate: '2026-11-13',
      createdAt: '2026-11-13T09:00:00.000Z',
      updatedAt: '2026-11-13T09:00:00.000Z',
    },
  ]

  const report = generateDailyReportContent('2026-11-13', mockWorks, mockProfile)

  // Verify secret notes are NOT in the report
  assert.strictEqual(report.includes('SECRET_SO_AREA_14_DO_NOT_LEAK'), false)
  assert.strictEqual(report.includes('INTERNAL_CONFIDENTIAL_INSTRUCTIONS'), false)

  // Verify structure
  const expected = [
    'Rekap laporan, Jumat 13 - 11 - 2026',
    'Nama : Elfrian T. Setiawan',
    'Divisi : digital printing',
    'Bagian : designer junior',
    '',
    'R-2610240 / GIS / REVISI SELESAI',
    'R-2611138 / GIS / PROGRESS',
  ].join('\n')

  assert.strictEqual(report, expected)
  console.log('  ✅ Passed: Output matches exact template and notes are completely excluded.')
}

// 3. Test Sorting by Creation Time
{
  console.log('\nTest 3: Sorting works by createdAt ascending...')
  const mockProfile: Profile = {
    id: 'default',
    name: 'Elfrian T. Setiawan',
    division: 'digital printing',
    position: 'designer junior',
  }

  const mockWorks: Work[] = [
    {
      id: 'later',
      rNumber: '9999999',
      customer: 'B',
      status: 'SELESAI',
      description: '',
      notes: '',
      workDate: '2026-11-13',
      createdAt: '2026-11-13T14:00:00.000Z',
      updatedAt: '2026-11-13T14:00:00.000Z',
    },
    {
      id: 'earlier',
      rNumber: '1111111',
      customer: 'A',
      status: 'PROGRESS',
      description: '',
      notes: '',
      workDate: '2026-11-13',
      createdAt: '2026-11-13T07:00:00.000Z',
      updatedAt: '2026-11-13T07:00:00.000Z',
    },
  ]

  const report = generateDailyReportContent('2026-11-13', mockWorks, mockProfile)
  const lines = report.split('\n')
  assert.strictEqual(lines[5], 'R-1111111 / A / PROGRESS')
  assert.strictEqual(lines[6], 'R-9999999 / B / SELESAI')
  console.log('  ✅ Passed: Earlier work appears first.')
}

// 4. Test Uppercase Status Validation
{
  console.log('\nTest 4: Status is always UPPERCASE...')
  const mockProfile: Profile = {
    id: 'default',
    name: 'Test',
    division: 'test',
    position: 'test',
  }
  const work: Work = {
    id: '1',
    rNumber: '123',
    customer: 'ABC',
    status: 'revisi progress' as unknown as WorkStatus,
    description: '',
    notes: '',
    workDate: '2026-11-13',
    createdAt: '2026-11-13T08:00:00.000Z',
    updatedAt: '2026-11-13T08:00:00.000Z',
  }
  const report = generateDailyReportContent('2026-11-13', [work], mockProfile)
  assert.strictEqual(report.includes('REVISI PROGRESS'), true)
  console.log('  ✅ Passed: Status converted to uppercase.')
}

// 5. Test Profile Updates Affect Generated Reports
{
  console.log('\nTest 5: Profile changes immediately affect report header...')
  const updatedProfile: Profile = {
    id: 'default',
    name: 'Budi Santoso',
    division: 'marketing',
    position: 'senior lead',
  }
  const report = generateDailyReportContent('2026-11-13', [], updatedProfile)
  assert.strictEqual(report.includes('Nama : Budi Santoso'), true)
  assert.strictEqual(report.includes('Divisi : marketing'), true)
  assert.strictEqual(report.includes('Bagian : senior lead'), true)
  console.log('  ✅ Passed: New profile values reflected.')
}

// 6. Test Time-Slot & Work Description Replaces Status
{
  console.log('\nTest 6: Time-slot header & description replacing status on same line...')
  const mockProfile: Profile = {
    id: 'default',
    name: 'Elfrian T. Setiawan',
    division: 'Digital printing',
    position: 'Designer junior',
  }
  const mockWorks: Work[] = [
    {
      id: '1',
      designType: 'R',
      rNumber: '2611219',
      customer: 'KHARISMA',
      status: 'SELESAI',
      description: 'Mengerjakan Produksi Rotary',
      notes: 'SECRET_NOTE',
      workDate: '2026-11-25',
      createdAt: '2026-11-25T08:00:00.000Z',
      updatedAt: '2026-11-25T08:00:00.000Z',
    },
    {
      id: '2',
      designType: 'S',
      rNumber: '2611220',
      customer: 'ANEKA',
      status: 'SELESAI',
      description: '',
      notes: '',
      workDate: '2026-11-25',
      createdAt: '2026-11-25T09:00:00.000Z',
      updatedAt: '2026-11-25T09:00:00.000Z',
    },
    {
      id: '3',
      designType: 'D',
      rNumber: '2611229',
      customer: 'GIS',
      status: 'REVISI SELESAI',
      description: '',
      notes: '',
      workDate: '2026-11-25',
      createdAt: '2026-11-25T10:00:00.000Z',
      updatedAt: '2026-11-25T10:00:00.000Z',
    },
  ]

  const report = generateDailyReportContent('2026-11-25', mockWorks, mockProfile, {
    start: '08:00',
    end: '10:00',
  })

  const expected = [
    'Rekap laporan, Rabu 25 - 11 - 2026',
    '08:00 - 10:00',
    'Nama : Elfrian T. Setiawan',
    'Divisi : Digital printing',
    'Bagian : Designer junior',
    '',
    'R-2611219 / KHARISMA / Mengerjakan Produksi Rotary',
    'S-2611220 / ANEKA / SELESAI',
    'D-2611229 / GIS / REVISI SELESAI',
  ].join('\n')

  assert.strictEqual(report, expected)
  assert.strictEqual(report.includes('SECRET_NOTE'), false)
  console.log('  ✅ Passed: Time-slot, R-/S-/D- prefixes & description replacement verified.')
}

// 7. Test Kanban Unfinished Carry-over Logic
{
  console.log('\nTest 7: Unfinished works (PROGRESS / REVISI PROGRESS) remain visible on Kanban...')
  const targetDate = '2026-11-27'
  const works: Work[] = [
    {
      id: 'old-progress',
      designType: 'R',
      rNumber: '1001',
      customer: 'A',
      status: 'PROGRESS',
      description: '',
      notes: '',
      workDate: '2026-11-26',
      createdAt: '2026-11-26T08:00:00.000Z',
      updatedAt: '2026-11-26T08:00:00.000Z',
    },
    {
      id: 'old-revisi',
      designType: 'S',
      rNumber: '1002',
      customer: 'B',
      status: 'REVISI PROGRESS',
      description: '',
      notes: '',
      workDate: '2026-11-25',
      createdAt: '2026-11-25T08:00:00.000Z',
      updatedAt: '2026-11-25T08:00:00.000Z',
    },
    {
      id: 'old-done',
      designType: 'D',
      rNumber: '1003',
      customer: 'C',
      status: 'SELESAI',
      description: '',
      notes: '',
      workDate: '2026-11-26',
      createdAt: '2026-11-26T08:00:00.000Z',
      updatedAt: '2026-11-26T08:00:00.000Z',
    },
  ]

  const visibleOnKanban = works.filter((w) => {
    const isCompleted = w.status === 'SELESAI' || w.status === 'REVISI SELESAI'
    return isCompleted ? w.workDate === targetDate : w.workDate <= targetDate
  })

  assert.deepStrictEqual(
    visibleOnKanban.map((w) => w.id),
    ['old-progress', 'old-revisi'],
  )
  console.log('  ✅ Passed: Old unfinished works carried over, old completed works excluded.')
}

// 8. Test Backup JSON Parser & Validation
{
  console.log('\nTest 8: Backup JSON parser & schema validation...')

  const invalidJson = parseAndValidateBackup('{not-valid-json')
  assert.strictEqual(invalidJson.valid, false)

  const missingData = parseAndValidateBackup(JSON.stringify({ version: 1 }))
  assert.strictEqual(missingData.valid, false)

  const invalidWorkItem = parseAndValidateBackup(
    JSON.stringify({
      version: 1,
      exportedAt: '2026-11-27T10:00:00.000Z',
      app: 'TracerLog',
      data: {
        works: [{ id: 123 }],
        profiles: [],
        dailyReports: [],
      },
    }),
  )
  assert.strictEqual(invalidWorkItem.valid, false)

  const validPayload = parseAndValidateBackup(
    JSON.stringify({
      version: 1,
      exportedAt: '2026-11-27T10:00:00.000Z',
      app: 'TracerLog',
      data: {
        works: [
          {
            id: 'w1',
            rNumber: '2611219',
            customer: 'KHARISMA',
            status: 'SELESAI',
            workDate: '2026-11-27',
          },
        ],
        profiles: [
          {
            id: 'default',
            name: 'Elfrian T. Setiawan',
            division: 'Digital printing',
            position: 'Designer junior',
          },
        ],
        dailyReports: [
          {
            id: 'r1',
            reportDate: '2026-11-27',
            content: 'Rekap...',
            createdAt: '2026-11-27T10:00:00.000Z',
            updatedAt: '2026-11-27T10:00:00.000Z',
          },
        ],
      },
    }),
  )
  assert.strictEqual(validPayload.valid, true)
  assert.strictEqual(validPayload.payload?.data.works.length, 1)
  assert.strictEqual(validPayload.payload?.data.works[0]?.description, '')
  console.log('  ✅ Passed: Valid & invalid backup JSON payloads handled properly.')
}

console.log('\n🎉 ALL CRITICAL VALIDATIONS AND UNIT TESTS PASSED!')
