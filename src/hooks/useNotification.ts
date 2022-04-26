import { useState } from 'react'

enum NotificationType {
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
}

type NotificationItem = {
  type: NotificationType
  title: string
  desc: string
}

const useNotification = () => {
  const [messages, setMessages] = useState<NotificationItem[]>([])

  const pushNotification = (type: NotificationType, title: string, desc: string) => {
    setMessages((prev) => [...prev, { type, title, desc }])
  }
}

export default useNotification
