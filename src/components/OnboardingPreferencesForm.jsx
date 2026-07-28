import { useState } from 'react'
import {
  EXPERIENCE_LEVELS,
  PREFERRED_LANGUAGES,
  validateOnboardingPreferences,
  isOnboardingPreferencesValid,
} from '../utils/validateOnboardingPreferences'
import './OnboardingPreferencesForm.css'

const EXPERIENCE_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  expert: 'Expert',
}

function OnboardingPreferencesForm() {
  const [fullName, setFullName] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [preferredLanguage, setPreferredLanguage] = useState('')
  const [guidedTour, setGuidedTour] = useState(true)
  const [touched, setTouched] = useState({
    fullName: false,
    experienceLevel: false,
    preferredLanguage: false,
  })

  const formValues = { fullName, experienceLevel, preferredLanguage }
  const errors = validateOnboardingPreferences(formValues)
  const isValid = isOnboardingPreferencesValid(formValues)

  function markTouched(field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched({
      fullName: true,
      experienceLevel: true,
      preferredLanguage: true,
    })

    if (!isValid) return

    console.log('Onboarding started:', {
      fullName: fullName.trim(),
      experienceLevel,
      preferredLanguage,
      guidedTour,
    })
  }

  return (
    <form
      className="onboarding-form"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="onboarding-form-title"
    >
      <h2 id="onboarding-form-title" className="onboarding-form__title">
        Onboarding Preferences
      </h2>
      <p className="onboarding-form__description">
        Tell us a bit about yourself so we can personalize your experience.
      </p>

      <div className="onboarding-form__field">
        <label htmlFor="full-name">Full Name</label>
        <input
          id="full-name"
          name="fullName"
          type="text"
          className="onboarding-form__input"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          onBlur={() => markTouched('fullName')}
          aria-invalid={touched.fullName && Boolean(errors.fullName)}
          aria-describedby={
            touched.fullName && errors.fullName ? 'full-name-error' : undefined
          }
          autoComplete="name"
          required
        />
        {touched.fullName && errors.fullName && (
          <p id="full-name-error" className="onboarding-form__error" role="alert">
            {errors.fullName}
          </p>
        )}
      </div>

      <fieldset
        className="onboarding-form__field"
        aria-invalid={touched.experienceLevel && Boolean(errors.experienceLevel)}
      >
        <legend className="onboarding-form__legend">Experience Level</legend>
        <div className="onboarding-form__radio-group">
          {EXPERIENCE_LEVELS.map((level) => (
            <div key={level} className="onboarding-form__radio-option">
              <input
                id={`experience-${level}`}
                name="experienceLevel"
                type="radio"
                className="onboarding-form__radio"
                value={level}
                checked={experienceLevel === level}
                onChange={(event) => setExperienceLevel(event.target.value)}
                onBlur={() => markTouched('experienceLevel')}
              />
              <label htmlFor={`experience-${level}`}>
                {EXPERIENCE_LABELS[level]}
              </label>
            </div>
          ))}
        </div>
        {touched.experienceLevel && errors.experienceLevel && (
          <p
            id="experience-level-error"
            className="onboarding-form__error"
            role="alert"
          >
            {errors.experienceLevel}
          </p>
        )}
      </fieldset>

      <div className="onboarding-form__field">
        <label htmlFor="preferred-language">Preferred Language</label>
        <select
          id="preferred-language"
          name="preferredLanguage"
          className="onboarding-form__select"
          value={preferredLanguage}
          onChange={(event) => setPreferredLanguage(event.target.value)}
          onBlur={() => markTouched('preferredLanguage')}
          aria-invalid={
            touched.preferredLanguage && Boolean(errors.preferredLanguage)
          }
          aria-describedby={
            touched.preferredLanguage && errors.preferredLanguage
              ? 'preferred-language-error'
              : undefined
          }
          required
        >
          {PREFERRED_LANGUAGES.map(({ value, label }) => (
            <option key={value || 'placeholder'} value={value}>
              {label}
            </option>
          ))}
        </select>
        {touched.preferredLanguage && errors.preferredLanguage && (
          <p
            id="preferred-language-error"
            className="onboarding-form__error"
            role="alert"
          >
            {errors.preferredLanguage}
          </p>
        )}
      </div>

      <div className="onboarding-form__field">
        <div className="onboarding-form__checkbox-row">
          <input
            id="guided-tour"
            name="guidedTour"
            type="checkbox"
            className="onboarding-form__checkbox"
            checked={guidedTour}
            onChange={(event) => setGuidedTour(event.target.checked)}
          />
          <label htmlFor="guided-tour">Enable Guided Tour</label>
        </div>
      </div>

      <button
        type="submit"
        className="onboarding-form__submit"
        disabled={!isValid}
      >
        Start Onboarding
      </button>
    </form>
  )
}

export default OnboardingPreferencesForm
