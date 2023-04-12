import { Pages } from '@types';

export const getPageName = (page: string): [string, Pages] | null =>
    Object.entries(Pages).find(([, value]) => page.includes(value)) || null;
