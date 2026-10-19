// Mock auth responses for UI work only. Replace with BetterAuth integration later.

export type AuthResult = { ok: true } | { ok: false; error: string }

export const MOCK_DELAY_MS = 500
export const MOCK_INVALID_EMAIL = 'wrong@example.com'
export const MOCK_TAKEN_EMAIL = 'taken@example.com'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function mockLogin(email: string): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS)
  if (email === MOCK_INVALID_EMAIL) {
    return { ok: false, error: 'Invalid email or password' }
  }
  return { ok: true }
}

export async function mockRegister(email: string): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS)
  if (email === MOCK_TAKEN_EMAIL) {
    return { ok: false, error: 'An account with this email already exists' }
  }
  return { ok: true }
}

// Always succeeds so the UI never reveals whether an account exists.
export async function mockForgotPassword(): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS)
  return { ok: true }
}
