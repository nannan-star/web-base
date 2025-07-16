export interface LocaleValue {
  'zh-CN': string;
  'en-US': string;
  [key: string]: string;
}

export interface LocaleObject {
  [key: string]: LocaleValue;
}

// 使用闭包来管理缓存
const createLocaleManager = () => {
  const cache = new Map<string, Record<string, string>>();

  return (localeObj: LocaleObject, curlocale: string): Record<string, string> => {
    const cacheKey = `${JSON.stringify(localeObj)}-${curlocale}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    const result: Record<string, string> = {};
    Object.keys(localeObj).forEach((key) => {
      const value = localeObj[key][curlocale];
      if (!value) {
        console.warn(`Missing translation for key: ${key} in locale: ${curlocale}`);
        // 尝试使用英文作为回退
        result[key] = localeObj[key]['en-US'] || key;
      } else {
        result[key] = value;
      }
    });

    cache.set(cacheKey, result);
    return result;
  };
};

export const getLocaleRes = createLocaleManager();
