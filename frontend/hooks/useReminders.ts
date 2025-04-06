import { useState, useEffect } from 'react';
import { endpoints } from '@/lib/api';

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  userId: string;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await endpoints.reminders.list();
      setReminders(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reminders');
    } finally {
      setLoading(false);
    }
  };

  const createReminder = async (data: Omit<Reminder, 'id' | 'userId'>) => {
    try {
      const response = await endpoints.reminders.create(data);
      setReminders(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reminder');
      throw err;
    }
  };

  const updateReminder = async (id: string, data: Partial<Reminder>) => {
    try {
      const response = await endpoints.reminders.update(id, data);
      setReminders(prev => prev.map(reminder => 
        reminder.id === id ? response.data : reminder
      ));
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update reminder');
      throw err;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await endpoints.reminders.delete(id);
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete reminder');
      throw err;
    }
  };

  return {
    reminders,
    loading,
    error,
    createReminder,
    updateReminder,
    deleteReminder,
    refreshReminders: fetchReminders,
  };
}
