export const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'expert']

export const PREFERRED_LANGUAGES = [
  { value: '', label: 'Select a language' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
]

export function validateOnboardingPreferences({
  fullName,
  experienceLevel,
  preferredLanguage,
}) {
  const errors = {}

  const trimmedName = fullName.trim()
  if (!trimmedName) {
    errors.fullName = 'Full name is required.'
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
  }

  if (!EXPERIENCE_LEVELS.includes(experienceLevel)) {
    errors.experienceLevel = 'Please select an experience level.'
  }

  if (!preferredLanguage) {
    errors.preferredLanguage = 'Please select a preferred language.'
  }

  return errors
}

export function isOnboardingPreferencesValid(fields) {
  return Object.keys(validateOnboardingPreferences(fields)).length === 0
}
