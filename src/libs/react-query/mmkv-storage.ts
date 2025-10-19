import { MMKV } from 'react-native-mmkv';
import { PersistedClient, Persister } from '@tanstack/react-query-persist-client';

const storage = new MMKV({
  id: 'react-query-cache',
});

export const mmkvStorage: Persister = {
  persistClient: async (client: PersistedClient) => {
    try {
      storage.set('react-query-cache', JSON.stringify(client));
    } catch (error) {
      // Handle error silently or log if needed
    }
  },
  restoreClient: async () => {
    try {
      const cachedClient = storage.getString('react-query-cache');
      if (cachedClient) {
        return JSON.parse(cachedClient);
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      storage.delete('react-query-cache');
    } catch (error) {
      // Handle error silently
    }
  },
};
