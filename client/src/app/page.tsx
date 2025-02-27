'use client';

import PushNotificationManager from './_notification/PushNotificationManager';
import InstallPrompt from './_notification/InstallPrompt';

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
      안녕
    </div>
  );
}
