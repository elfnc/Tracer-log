import assert from 'node:assert'
import { formatReportDateHeader, generateDailyReportContent } from '../src/utils/reportGenerator.ts'
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
    'divisi : digital printing',
    'bagian : designer junior',
    '',
    'R# 2610240 / GIS / REVISI SELESAI',
    'R# 2611138 / GIS / PROGRESS',
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
      notes: '',
      workDate: '2026-11-13',
      createdAt: '2026-11-13T07:00:00.000Z',
      updatedAt: '2026-11-13T07:00:00.000Z',
    },
  ]

  const report = generateDailyReportContent('2026-11-13', mockWorks, mockProfile)
  const lines = report.split('\n')
  assert.strictEqual(lines[5], 'R# 1111111 / A / PROGRESS')
  assert.strictEqual(lines[6], 'R# 9999999 / B / SELESAI')
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
  assert.strictEqual(report.includes('divisi : marketing'), true)
  assert.strictEqual(report.includes('bagian : senior lead'), true)
  console.log('  ✅ Passed: New profile values reflected.')
}

console.log('\n🎉 ALL CRITICAL VALIDATIONS AND UNIT TESTS PASSED!')
