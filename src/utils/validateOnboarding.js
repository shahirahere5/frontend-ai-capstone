const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const ROLES = [
  { value: '', label: 'Select a role' },
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'product', label: 'Product Manager' },
  { value: 'student', label: 'Student' },
  { value: 'other', label: 'Other' },
]

export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

export const INTEREST_OPTIONS = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'devops', label: 'DevOps' },
  { value: 'ai', label: 'AI / ML' },
]

export const initialFormData = {
  fullName: '',
  email: '',
  role: '',
  experience: '',
  interests: [],
  newsletter: false,
  termsAccepted: false,
}

export function validateField(name, value) {
  switch (name) {
    case 'fullName':
      if (!value.trim()) return 'Full name is required.'
      if (value.trim().length < 2) return 'Name must be at least 2 characters.'
      return ''

    case 'email':
      if (!value.trim()) return 'Email is required.'
      if (!EMAIL_PATTERN.test(value.trim())) return 'Enter a valid email address.'
      return ''

    case 'role':
      if (!value) return 'Please select your role.'
      return ''

    case 'experience':
      if (!value) return 'Please select your experience level.'
      return ''

    case 'interests':
      if (!value.length) return 'Select at least one interest.'
      return ''

    case 'termsAccepted':
      if (!value) return 'You must accept the terms to continue.'
      return ''

    default:
      return ''
  }
}

export function validateForm(formData) {
  const fields = ['fullName', 'email', 'role', 'experience', 'interests', 'termsAccepted']
  const errors = {}

  for (const field of fields) {
    const error = validateField(field, formData[field])
    if (error) errors[field] = error
  }

  return errors
}
