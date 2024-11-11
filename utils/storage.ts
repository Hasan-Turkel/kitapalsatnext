

// Storage'ı düzeltiyoruz. getItem'den false yerine null döndüreceğiz.

export const prefix = '@KitapAlSat';
const Storage = {
  setItem: async <T>(key: string, value: T): Promise<boolean> => {
    try {
      const k = `${prefix}:${key}`;
      const v = { data: value };

      await sessionStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  },

  getItem: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const value = sessionStorage.getItem(`${prefix}:${key}`);
      if (value === null) {
        return defaultValue;
      }

      return JSON.parse(value).data as T;
    } catch (error) {
      return defaultValue;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await sessionStorage.removeItem(`${prefix}:${key}`);
    } catch (error) {
      console.error(error);
    }
  },

  mergeItem: <T>(key: string, value: T): void => {
    try {
      const existingValue = sessionStorage.getItem(`${prefix}:${key}`);
      let mergedValue: { data: T };

      if (existingValue) {
        const existingParsed = JSON.parse(existingValue);
        mergedValue = { data: { ...existingParsed.data, ...value } };
      } else {
        mergedValue = { data: value };
      }

      sessionStorage.setItem(`${prefix}:${key}`, JSON.stringify(mergedValue));
    } catch (error) {
      console.error(error);
    }
  },

  clear: async (): Promise<void> => {
    try {
      const keys = Object.keys(sessionStorage);
      const blackList: string[] = []; // kara liste ekleyebilirsiniz
      const appKeys = keys.filter(
        (key) => key.startsWith(`${prefix}:`) && !blackList.includes(key)
      );

      appKeys.forEach((key) => sessionStorage.removeItem(key));
    } catch (error) {
      console.error(error);
    }
  },
};

export default Storage;


