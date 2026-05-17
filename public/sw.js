// public/sw.js
// Service Worker for VellCareAI Push Notifications

const CACHE_NAME = 'vellcareai-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('VellCareAI Service Worker installed');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('VellCareAI Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Push event - handles incoming push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received');

  let data = {
    title: 'VellCareAI',
    body: 'You have a new health update',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'vellcareai-notification',
    url: '/dashboard'
  };

  if (event.data) {
    try {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    tag: data.tag,
    data: { url: data.url },
    requireInteraction: false,
    silent: false,
    vibrate: [200, 100, 200],
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const url = event.notification.data?.url || '/dashboard';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // If app is already open, focus it
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      // Otherwise open new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});

// Background sync for check-in reminders
self.addEventListener('sync', (event) => {
  if (event.tag === 'checkin-reminder') {
    event.waitUntil(sendCheckinReminder());
  }
});

async function sendCheckinReminder() {
  await self.registration.showNotification('VellCareAI Daily Check-In 📋', {
    body: 'Good morning! Time to log your health data for today.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'checkin-reminder',
    data: { url: '/dashboard' },
    vibrate: [200, 100, 200]
  });
}
