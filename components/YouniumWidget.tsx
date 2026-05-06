// components/YouniumWidget.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

type SDK = {
    renderComponent: (componentType: string, options: { containerId: string } & Record<string, unknown>) => void
  }

type WindowWithYounium = Window & {
  YouniumEmbedded?: {
    init: (config: unknown) => SDK
    COMPONENT_TYPES: {
      SUBSCRIPTION_LIST: string
      INVOICE_LIST: string
      ACCOUNT_INFO: string
    }
    onTokenExpired?: (cb: () => Promise<void>) => void
    updateToken?: (token: string) => void
  }
}

type YouniumWidgetProps = {
  userId: string
}

// Tasksy theme — matches our gray/dark accent palette
const TASKSY_THEME = {
  primaryColor: '#111827', // gray-900
  fontFamily: 'system-ui, -apple-system, sans-serif',
}

export function YouniumWidget({ userId }: YouniumWidgetProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)
  const sdkRef = useRef<SDK | null>(null)

  // Helper: fetch a fresh widget token from our backend
  const fetchToken = async (): Promise<string> => {
    const res = await fetch('/api/widget-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || `Token request failed: ${res.status}`)
    }
    const data = await res.json()
    return data.token
  }
  useEffect(() => {
    if (typeof window === 'undefined') return
    const win = window as WindowWithYounium
    if (win.YouniumEmbedded && !scriptLoaded) {
      console.log('[YouniumWidget] SDK already on window, reusing')
      setScriptLoaded(true)
    }
  }, [scriptLoaded])

  useEffect(() => {
    if (!scriptLoaded || initialized) return

    const init = async () => {
      const win = window as WindowWithYounium
      if (!win.YouniumEmbedded) {
        setError('Younium SDK not available on window')
        return
      }

      try {
        const token = await fetchToken()

        const sdk = win.YouniumEmbedded.init({
          token,
          apiEndpoint: 'https://api.selfservice.younium.net',
          theme: TASKSY_THEME,
          debug: true,
        })
        sdkRef.current = sdk

// Render the three components.
// SDK signature: renderComponent(type, optionsWithContainerId)
        sdk.renderComponent(
            win.YouniumEmbedded.COMPONENT_TYPES.SUBSCRIPTION_LIST,
            {
              containerId: 'younium-subscription',
              allowQuantityEdit: true,
              allowAddons: true,
              showPriceDetails: true,
            }
          )
  
          sdk.renderComponent(
            win.YouniumEmbedded.COMPONENT_TYPES.INVOICE_LIST,
            {
              containerId: 'younium-invoices',
              pageSize: 10,
              showDownloadButton: true,
            }
          )
  
          sdk.renderComponent(
            win.YouniumEmbedded.COMPONENT_TYPES.ACCOUNT_INFO,
            {
              containerId: 'younium-account',
              options: {
                allowEdit: true,
                showDetails: true,
              },
            }
          )

        setInitialized(true)

        // Wire token refresh — runs ~5 min before token expires
        if (win.YouniumEmbedded.onTokenExpired) {
          win.YouniumEmbedded.onTokenExpired(async () => {
            try {
              const newToken = await fetchToken()
              win.YouniumEmbedded?.updateToken?.(newToken)
              console.log('[YouniumWidget] Token refreshed')
            } catch (err) {
              console.error('[YouniumWidget] Token refresh failed', err)
            }
          })
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        console.error('[YouniumWidget] Init failed:', msg)
        setError(msg)
      }
    }

    init()
  }, [scriptLoaded, initialized, userId])

  return (
    <>
      <Script
        src="https://cdn.younium.net/selfservice-sdk/v3.0.0/younium-embedded-sdk.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        onError={(e) => {
          console.error('[YouniumWidget] Script failed to load:', e)
          setError('Failed to load Younium SDK script')
        }}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-red-900 mb-1">
            Couldn't load billing details
          </h3>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

{!initialized && !error && (
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
      )}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-700 px-1">
            Account information
          </h2>
          <div id="younium-account" />
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-700 px-1">
            Your subscription
          </h2>
          <div id="younium-subscription" />
        </section>

        <section className="space-y-2 md:col-span-2">
          <h2 className="text-sm font-semibold text-gray-700 px-1">
            Invoices
          </h2>
          <div id="younium-invoices" />
        </section>
      </div>
    </>
  )
}