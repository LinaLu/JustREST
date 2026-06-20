import { ehrProvider } from './providers/ehr.js'

const providers = new Map([
  [ehrProvider.system, ehrProvider],
])

export function encodeRef(system, id) {
  return Buffer.from(`${system}:${id}`).toString('base64')
}

export function decodeRef(externalReference) {
  const decoded = Buffer.from(externalReference, 'base64').toString('utf8')
  const colonIndex = decoded.indexOf(':')
  return {
    system: decoded.slice(0, colonIndex),
    id: decoded.slice(colonIndex + 1),
  }
}

export function getProvider(system) {
  const provider = providers.get(system)
  if (!provider) throw new Error(`No provider registered for system: "${system}"`)
  return provider
}

export function getAllProviders() {
  return Array.from(providers.values())
}
