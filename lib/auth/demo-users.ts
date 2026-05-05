// lib/auth/demo-users.ts

export const DEMO_USERS = {
    bob: {
      name: 'Bob',
      company: 'Pro Co',
      plan: 'Pro',
      youniumAccountNumber: 'A-000001',
    },
    carol: {
      name: 'Carol',
      company: 'Enterprise Co',
      plan: 'Enterprise',
      youniumAccountNumber: 'A-000002',
    },
  } as const
  
  export type DemoUserId = keyof typeof DEMO_USERS