import { useState } from 'react'
import {
  EXPERIENCE_LEVELS,
  INTEREST_OPTIONS,
  ROLES,
  initialFormData,
  validateField,
  validateForm,
} from '../utils/validateOnboarding'
import './OnboardingForm.css'

function OnboardingForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name] || submitted) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }))
    }
  }

  function handleBlur(name) {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }))
  }

  function toggleInterest(interest) {
    const nextInterests = formData.interests.includes(interest)
      ? formData.interests.filter((item) => item !== interest)
      : [...formData.interests, interest]

    updateField('interests', nextInterests)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)

    const nextErrors = validateForm(formData)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  function handleReset() {
    setFormData(initialFormData)
    setErrors({})
    setTouched({})
    setSubmitted(false)
  }

  if (submitted && Object.keys(errors).length === 0 && !isSubmitting) {
    const selectedRole = ROLES.find((role) => role.value === formData.role)?.label
    const selectedExperience = EXPERIENCE_LEVELS.find(
      (level) => level.value === formData.experience,
    )?.label
    const selectedInterests = INTEREST_OPTIONS.filter((option) =>
      formData.interests.includes(option.value),
    )
      .map((option) => option.label)
      .join(', ')

    return (
      <section className="onboarding onboarding--success" aria-live="polite">
        <div className="onboarding__card">
          <h1>Welcome aboard, {formData.fullName.trim()}!</h1>
          <p className="onboarding__lead">
            Your preferences have been saved. Here is a summary of what you shared:
          </p>
          <dl className="onboarding__summary">
            <div>
              <dt>Email</dt>
              <dd>{formData.email}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{selectedRole}</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>{selectedExperience}</dd>
            </div>
            <div>
              <dt>Interests</dt>
              <dd>{selectedInterests}</dd>
            </div>
            <div>
              <dt>Newsletter</dt>
              <dd>{formData.newsletter ? 'Subscribed' : 'Not subscribed'}</dd>
            </div>
          </dl>
          <button type="button" className="onboarding__submit" onClick={handleReset}>
            Start over
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="onboarding">
      <div className="onboarding__card">
        <header className="onboarding__header">
          <p className="onboarding__eyebrow">Step 1 of 1</p>
          <h1>Tell us about yourself</h1>
          <p className="onboarding__lead">
            Set your preferences so we can personalize your experience.
          </p>
        </header>

        <form className="onboarding__form" onSubmit={handleSubmit} noValidate>
          <div className="onboarding__field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              onBlur={() => handleBlur('fullName')}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              placeholder="Jane Doe"
            />
            {errors.fullName && (
              <p id="fullName-error" className="onboarding__error" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="onboarding__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(event) => updateField('email', event.target.value)}
              onBlur={() => handleBlur('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p id="email-error" className="onboarding__error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="onboarding__field">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={(event) => updateField('role', event.target.value)}
              onBlur={() => handleBlur('role')}
              aria-invalid={Boolean(errors.role)}
              aria-describedby={errors.role ? 'role-error' : undefined}
            >
              {ROLES.map((role) => (
                <option key={role.value || 'placeholder'} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && (
              <p id="role-error" className="onboarding__error" role="alert">
                {errors.role}
              </p>
            )}
          </div>

          <fieldset
            className="onboarding__fieldset"
            aria-invalid={Boolean(errors.experience)}
            aria-describedby={errors.experience ? 'experience-error' : undefined}
          >
            <legend>Experience level</legend>
            <div className="onboarding__radio-group">
              {EXPERIENCE_LEVELS.map((level) => (
                <label key={level.value} className="onboarding__radio">
                  <input
                    type="radio"
                    name="experience"
                    value={level.value}
                    checked={formData.experience === level.value}
                    onChange={(event) => updateField('experience', event.target.value)}
                    onBlur={() => handleBlur('experience')}
                  />
                  <span>{level.label}</span>
                </label>
              ))}
            </div>
            {errors.experience && (
              <p id="experience-error" className="onboarding__error" role="alert">
                {errors.experience}
              </p>
            )}
          </fieldset>

          <fieldset
            className="onboarding__fieldset"
            aria-invalid={Boolean(errors.interests)}
            aria-describedby={errors.interests ? 'interests-error' : undefined}
          >
            <legend>Interests</legend>
            <p className="onboarding__hint">Choose at least one area you care about.</p>
            <div className="onboarding__checkbox-group">
              {INTEREST_OPTIONS.map((option) => (
                <label key={option.value} className="onboarding__checkbox">
                  <input
                    type="checkbox"
                    name="interests"
                    value={option.value}
                    checked={formData.interests.includes(option.value)}
                    onChange={() => toggleInterest(option.value)}
                    onBlur={() => handleBlur('interests')}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {errors.interests && (
              <p id="interests-error" className="onboarding__error" role="alert">
                {errors.interests}
              </p>
            )}
          </fieldset>

          <label className="onboarding__checkbox onboarding__checkbox--inline">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={(event) => updateField('newsletter', event.target.checked)}
            />
            <span>Send me product updates and tips by email</span>
          </label>

          <div className="onboarding__field">
            <label className="onboarding__checkbox onboarding__checkbox--inline">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={(event) => updateField('termsAccepted', event.target.checked)}
                onBlur={() => handleBlur('termsAccepted')}
                aria-invalid={Boolean(errors.termsAccepted)}
                aria-describedby={errors.termsAccepted ? 'terms-error' : undefined}
              />
              <span>I agree to the terms of service and privacy policy</span>
            </label>
            {errors.termsAccepted && (
              <p id="terms-error" className="onboarding__error" role="alert">
                {errors.termsAccepted}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="onboarding__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving preferences…' : 'Save preferences'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default OnboardingForm
