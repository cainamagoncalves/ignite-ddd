import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async create(notification: Notification) {
    this.notifications.push(notification)
  }

  async findById(notificationId: string) {
    const notification = this.notifications.find(
      (notification) => notification.id.toString() === notificationId,
    )

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification) {
    const notificationIndex = this.notifications.findIndex(
      (prevNotification) => prevNotification.id === notification.id,
    )

    this.notifications[notificationIndex] = notification
  }
}
