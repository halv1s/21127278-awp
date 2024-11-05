import admin from 'firebase-admin';

console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
console.log(
  'FIREBASE_PRIVATE_KEY:',
  process.env.FIREBASE_PRIVATE_KEY ? 'Loaded' : 'Not loaded',
);

// NOTE: Why do I have this kind of fallback value? Vercel build seems like not setting the env
// for my project, and these credentials are not that important, so I'm okay to expose it. Read more:
// - https://github.com/orgs/vercel/discussions/5347
// - https://www.vercel-status.com/incidents/snybsxv4v0vc
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID || 'ia03-user-registration',
      clientEmail:
        process.env.FIREBASE_CLIENT_EMAIL ||
        'firebase-adminsdk-9qk1r@ia03-user-registration.iam.gserviceaccount.com',
      privateKey:
        process.env.FIREBASE_PRIVATE_KEY ||
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDMF3I0QGSfFqja\n2zExpHfnE/9FPln+Or/WoC8XatzmzFI+1zdDkNO9o08HFh00FCt5bSIu83N/QvRl\nziiGJxxZqiRmkblqiUWfGrJR0irsJRQnm5mtpE9GBC1kEqVLQgFE7a5XA/sM425C\niGBKudTWcFm6ml6mTGL1CUKttk1/70vJ3X0BSlEMX0QIDBbM2ZX58Z1nUXP3uNrH\n5qWH4Kzur+SH56iu++EL2BrdP1e6gpNcZDUAhuT4RuYtpepXin/eT+laDNRZqoD9\naxibX5sIur+OR3SddCMJD13fvrtRlS+KiiPmxa7o1cJydXYueJKtuAY0bsLYiYz/\nE2FZxWqfAgMBAAECggEAIsqMaWPgw031kvlytWe4GOhLx94NMU2KjmfYH0HUTnPe\nQWAmx5nUvqssOaUHbW1Sy+xSu3Y85iDf0MsIFXZtWsuqUOHenc6w06KVa2VMc90O\nRoI7/GHaMbFcm4aiLuYdmUZ7RdIj5dqPXUAqShLLuZKFeU3/fJHg/KyLdVlydLBj\n+IPGrfMZb/jEChAEZxwRNjc6h7KTsP3BqFhUtIz9kW+3PDKAUiflEnWkE+p7yYWk\n88ZK8UkvlBbfd29FCADk+P3ySgT0IS/3CCgfbZ7T7IdTIw4vVHaWcV8mBmwfVR2+\nDMlpmavrH0Kj6zaISm1rcpWxZVpvR5snA7lyknSRwQKBgQD+H2D1A1qV5vL/ahsU\nBLB8tqcyr7PUXEY36AKgb5bMz8W7SkZKU5C3kW8Aa1c+QvMFg2Kuae1sSgswmNia\nKL7byFrUrfC/BmJDio5JwGxg2AMCTr4CPi1m1Yql48yV835UZHEn2hxvo0LTzOAf\nrZTefoT9tO0ucwjew/pKrnu2hwKBgQDNmXGkdTvpo09lRiHO1Ptap3ZlPg1eQ+Gq\nKLaImn7OGakpDzY1dnPjH2yHNPy6sV0tZCjgVLHVIk6xT+eEQtMK+WKJWnXEV635\nnoLPRgvZDEFTPMHC+GR1E2baIvFfW8Xw/z8+J9lB8tu6LRbFHMKSi79cke7prt1g\nzkoqGk4ZKQKBgQDoFyKHQ6PlCoPecDsA4nOJw4wax8v25Lug7b4QZzoUHqLZtjFS\nStX+Qc5eVKrei2jHHULwRoB4CXwEy2PwD8yYkHkciyw4Ww094HqpsxuIq2C8J8xz\n4fO3WsqBTfcY8MTtMLsECbk04Kf1JsV/SRqQxn6R9D820AtG4ThkIs2MWwKBgDcm\nriFbgVLPCAE2quL8puBOg6fs2VEsDGDEwxIpv1Ix9/qXpgb5W2TVjRtHz3OVGFWQ\nxJZIodt2dH2D3arQ8iPDefc2WNjuXDDVoGlRdOQoMW3OontWfjwZlEF3lh/qUlKv\nZZuavOC/8MkkRzNg36DH8/E1BE2TJrdNHv/kRobhAoGBAI0jRQPF/MIFUE8ZEGTB\ngLCVCuBaddY9huLziY22E/pA5P2wTI6oxpE/B30XVfT/+W5fHXgLAfIkc7ZTQypR\nMcA85TUQumKZwN9GQVtsQX0cHvsQ/c1M8sXE42dzs1QHkP9/aggI7ulBSIL1U3kp\n1myl84Aw1wI+OPuGkUuK4qZW\n-----END PRIVATE KEY-----\n',
    }),
    databaseURL: process.env.FIREBASE_PROJECT_ID || 'ia03-user-registration',
  });
}

export const db = admin.firestore();
