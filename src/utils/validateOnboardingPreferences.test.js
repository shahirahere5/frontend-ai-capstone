import { describe, it, expect } from 'vitest'
import {
  validateOnboardingPreferences,
  isOnboardingPreferencesValid,
} from './validateOnboardingPreferences'

describe('validateOnboardingPreferences', () => {
  it('returns no errors for valid input', () => {
    const errors = validateOnboardingPreferences({
      fullName: 'Jane Doe',
      experienceLevel: 'intermediate',
      preferredLanguage: 'en',
    })

    expect(errors).toEqual({})
    expect(
      isOnboardingPreferencesValid({
        fullName: 'Jane Doe',
        experienceLevel: 'intermediate',
        preferredLanguage: 'en',
      }),
    ).toBe(true)
  })

  it('requires full name', () => {
    const errors = validateOnboardingPreferences({
      fullName: '   ',
      experienceLevel: 'beginner',
      preferredLanguage: 'en',
    })

    expect(errors.fullName).toBe('Full name is required.')
  })

  it('rejects full names shorter than 2 characters', () => {
    const errors = validateOnboardingPreferences({
      fullName: 'A',
      experienceLevel: 'beginner',
      preferredLanguage: 'en',
    })

    expect(errors.fullName).toBe('Full name must be at least 2 characters.')
  })

  it('requires a valid experience level', () => {
    const errors = validateOnboardingPreferences({
      fullName: 'Jane Doe',
      experienceLevel: '',
      preferredLanguage: 'en',
    })

    expect(errors.experienceLevel).toBe('Please select an experience level.')
  })

  it('rejects invalid experience levels', () => {
    const errors = validateOnboardingPreferences({
      fullName: 'Jane Doe',
      experienceLevel: 'advanced',
      preferredLanguage: 'en',
    })

    expect(errors.experienceLevel).toBe('Please select an experience level.')
  })

  it('requires preferred language', () => {
    const errors = validateOnboardingPreferences({
      fullName: 'Jane Doe',
      experienceLevel: 'expert',
      preferredLanguage: '',
    })

    expect(errors.preferredLanguage).toBe('Please select a preferred language.')
  })

  it('returns multiple errors when several fields are invalid', () => {
    const errors = validateOnboardingPreferences({
      fullName: '',
      experienceLevel: '',
      preferredLanguage: '',
    })

    expect(errors).toEqual({
      fullName: 'Full name is required.',
      experienceLevel: 'Please select an experience level.',
      preferredLanguage: 'Please select a preferred language.',
    })
    expect(
      isOnboardingPreferencesValid({
        fullName: '',
        experienceLevel: '',
        preferredLanguage: '',
      }),
    ).toBe(false)
  })
})
