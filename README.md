# FC Mobile Redeem Codes — Production Web Application

A full-stack, real-time FC Mobile redeem code platform reproducing the Figma design specification with Firebase, Cloud Firestore, and Firebase Authentication.

## Features

- **Dynamic Public Feed:** Real-time discovery of active, verified FC Mobile redeem codes directly from Cloud Firestore.
- **Copy & Official Redemption:** 1-click clipboard copy with dynamic visual feedback ("COPIED!") and direct integration to Electronic Arts' official redemption portal (`https://redeem.fcm.ea.com/`).
- **Real-Time Verification:** Displays verification status badges (`ACTIVE`, `EXPIRING_SOON`, `EXPIRED`, `LIMIT_REACHED`, `DISABLED`, `PENDING_VERIFICATION`) with relative timestamps ("Checked 15 minutes ago").
- **Search, Filter & Sort:** Instant client-side search by code string, rewards, or campaigns, with status filter buttons and sort selectors.
- **Featured Drops:** Prominent banner highlighting current top-tier player packs and coin rewards.
- **Complete Figma Design Sections:**
  - Header with navigation and responsive mobile drawer
  - Hero with live active counter
  - Featured code drop card
  - Active & Expired code locker cards
  - How to Redeem 5-step interactive guide
  - Status lifecycle protocols explanation
  - Community reviews & testimonials
  - Expandable FAQ accordion
  - Footer with legal non-affiliation disclaimers
- **Protected Admin Console (`#admin` or `#login`):**
  - Secure Firebase Authentication
  - Real-time KPI counters (Total Codes, Active, Expiring Soon, Expired, Pending Verification, Featured)
  - Full Code Management: Add, Edit, Verify with notes, Feature toggle
  - **Soft Delete:** Codes are marked `deleted: true` rather than purged from the database, preserving audit history with one-click restore.
  - **Seed Demo Data Utility:** Rapidly populate or reset initial development datasets.
- **Automated Expiration Worker:** Firebase Cloud Function scheduled to transition codes to `EXPIRING_SOON` and `EXPIRED` automatically.
- **Security Rules:** Strict Firestore Security Rules ensuring public users have read-only access to non-deleted codes, with authenticated admin-only writes and disabled hard deletes.

---

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Supply your Firebase Web credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_OFFICIAL_REDEEM_URL=https://redeem.fcm.ea.com/
```
*(Note: If Firebase credentials are not provided initially, the application will automatically run in local dev preview mode with seed test data.)*

### 3. Run Locally
```bash
npm run dev
```

---

## Admin Access

- **Public Route:** Open `http://localhost:5173/`
- **Admin Sign-In:** Click **Admin Login** in the header or navigate to `http://localhost:5173/#login`
- **Default Dev Preview Credentials:**
  - **Email:** `admin@fcmobile.com`
  - **Password:** `Admin@12345`

---

## Firestore Database Schema

### Collection: `codes`
```typescript
{
  id: string;                    // Document ID
  code: string;                  // e.g. "FCMOBILE2026"
  reward: string;                // e.g. "1,000 Coins + Elite Player Pack"
  status: CodeStatus;            // 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'LIMIT_REACHED' | 'DISABLED' | 'PENDING_VERIFICATION'
  releaseDate: string;           // "YYYY-MM-DD"
  expirationDate: string | null; // ISO String or null
  source?: string;               // e.g. "Official EA FC Stream"
  sourceUrl?: string;            // Link to source announcement
  notes?: string;                // Restriction/region details
  usageLimit?: number | null;    // Redemption quota
  featured: boolean;             // Highlighted in top banner
  verificationDate?: string;     // ISO timestamp of last test
  verificationNotes?: string;    // Verification test log
  deleted: boolean;              // Soft-delete flag (default: false)
  createdAt: string | Timestamp;
  updatedAt: string | Timestamp;
}
```

---

## Deploying Firebase Security Rules & Cloud Functions

1. **Deploy Security Rules:**
```bash
firebase deploy --only firestore:rules,firestore:indexes
```

2. **Deploy Scheduled Worker Functions:**
```bash
cd functions
npm install
firebase deploy --only functions
```
