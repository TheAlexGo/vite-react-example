import { Pages } from '@types';

export const getPageName = (page: string): Pages | null => {
    const result = Object.entries(Pages).find(([, value]) => page.includes(value));
    if (result) {
        return result[1] as Pages;
    }
    return null;
};
