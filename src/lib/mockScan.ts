// Mock barcode scan for UI work only. Replace with real scanning later.

export type ScanOutcome = 'success' | 'failure'

export type ScannedProduct = {
  name: string
  expires: string
}

export type ScanResult = { ok: true; product: ScannedProduct } | { ok: false }

export const MOCK_SCAN_DELAY_MS = 500

export const MOCK_PRODUCT: ScannedProduct = {
  name: 'Organic Milk',
  expires: 'Apr 25, 2025',
}

export async function mockScan(outcome: ScanOutcome): Promise<ScanResult> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_SCAN_DELAY_MS))
  if (outcome === 'failure') {
    return { ok: false }
  }
  return { ok: true, product: MOCK_PRODUCT }
}
