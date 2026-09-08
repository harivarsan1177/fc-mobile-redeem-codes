import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

/**
 * Scheduled Cloud Function running every hour:
 * 1. Checks non-deleted codes in ACTIVE or EXPIRING_SOON status.
 * 2. If expirationDate <= now: updates status to EXPIRED.
 * 3. If expirationDate is within next 48 hours: updates status to EXPIRING_SOON.
 */
export const updateCodeStatusesHourly = onSchedule('every 1 hours', async () => {
  const now = new Date();
  const fortyEightHoursAhead = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const codesRef = db.collection('codes');
  const snapshot = await codesRef
    .where('deleted', '==', false)
    .where('status', 'in', ['ACTIVE', 'EXPIRING_SOON'])
    .get();

  if (snapshot.empty) {
    console.log('No active/expiring codes to process.');
    return;
  }

  const batch = db.batch();
  let updatedCount = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (!data.expirationDate) return;

    const expDate = new Date(data.expirationDate);

    // 1. Expired check
    if (expDate <= now && data.status !== 'EXPIRED') {
      batch.update(doc.ref, {
        status: 'EXPIRED',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      updatedCount++;
    }
    // 2. Expiring soon check
    else if (
      expDate > now &&
      expDate <= fortyEightHoursAhead &&
      data.status === 'ACTIVE'
    ) {
      batch.update(doc.ref, {
        status: 'EXPIRING_SOON',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      updatedCount++;
    }
  });

  if (updatedCount > 0) {
    await batch.commit();
    console.log(`Successfully transitioned ${updatedCount} codes to updated statuses.`);
  } else {
    console.log('All code statuses are currently up to date.');
  }
});
