'use client';

import PushNotificationManager from './_notification/PushNotificationManager';
import InstallPrompt from './_notification/InstallPrompt';
import LiveIcon from './assets/icons/live.svg';

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
      <LiveIcon />
    </div>
  );
}
