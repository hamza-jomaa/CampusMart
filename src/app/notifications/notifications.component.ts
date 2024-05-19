import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  userId: number;

  ngOnInit(): void {
    console.log('NotificationsComponent initialized.');
    this.initLocalData();
    this.loadNotifications();
    console.log('NotificationsComponent end');
  }
  
  initLocalData(): void {
    const localDataString = localStorage.getItem('user');
    if (localDataString) {
      const localData = JSON.parse(localDataString);
      this.userId = Number(localData.login_ConsumerID); // Parse as number
      console.log('User ID:', this.userId);
    } else {
      console.error('No local data found');
    }
  }

  loadNotifications(): void {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    console.log('All Notifications:', allNotifications);
    console.log('User ID:', this.userId);
    this.notifications = allNotifications.filter((n: any) => Number(n.userId) === this.userId); // Load all notifications
    console.log('Filtered Notifications:', this.notifications);
  }

  markAsRead(notificationIndex: number): void {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notification = this.notifications[notificationIndex];
    const index = allNotifications.findIndex((n: any) => n.userId === notification.userId && n.message === notification.message);
    if (index > -1) {
      allNotifications[index].isRead = true;
      localStorage.setItem('notifications', JSON.stringify(allNotifications));
      this.notifications[notificationIndex].isRead = true; // Update the local notification
    }
  }

  removeNotification(notificationIndex: number): void {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notification = this.notifications[notificationIndex];
    const index = allNotifications.findIndex((n: any) => n.userId === notification.userId && n.message === notification.message);
    if (index > -1) {
      allNotifications.splice(index, 1);
      localStorage.setItem('notifications', JSON.stringify(allNotifications));
      this.notifications.splice(notificationIndex, 1); // Remove the local notification
    }
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }
}
