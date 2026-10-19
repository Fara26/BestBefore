// Placeholder inventory for UI work only. Replace with inventory API integration later.
import type { ReactNode } from 'react'
import { EggIcon, LeafIcon, MilkIcon } from '../components/icons'

export type InventoryItem = {
  id: string
  name: string
  bestBefore: string
  icon: ReactNode
  tone: 'green' | 'amber'
}

export type NewItem = {
  name: string
  brand?: string
  barcode?: string
  quantity: number
  purchaseDate: string
  bestBefore: string
}

export const MOCK_ADD_DELAY_MS = 500

export const mockItems: InventoryItem[] = [
  { id: '1', name: 'Spinach', bestBefore: '2026-11-29', icon: <LeafIcon />, tone: 'green' },
  { id: '2', name: 'Milk', bestBefore: '2026-11-28', icon: <MilkIcon />, tone: 'green' },
  { id: '3', name: 'Eggs', bestBefore: '2026-11-30', icon: <EggIcon />, tone: 'amber' },
]

export async function mockAddItem(item: NewItem): Promise<{ ok: true; item: NewItem }> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_ADD_DELAY_MS))
  return { ok: true, item }
}
