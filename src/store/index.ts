import { createContext } from 'react';

import { getPageName } from '@utils/routing';
import { makeAutoObservable } from 'mobx';

import { saveInLocalStorage } from '@store/saveInLocalStorage';
import { IPageState, Pages } from '@types';

export class Store {
    /**
     * Готово ли приложение к работе
     */
    isAppReady = false;
    activePage: string;
    statePages: Map<string, IPageState> = new Map<string, IPageState>();
    isPageLoaded = false;

    constructor() {
        makeAutoObservable(this);

        const currentPage = getPageName(window.location.pathname);
        if (currentPage) {
            const [, page] = currentPage;
            this.activePage = page;
        } else {
            this.activePage = Pages.GENERAL;
        }

        saveInLocalStorage<Store, keyof Store>(this, 'store', []);
    }

    setIsAppReady = (isAppReady: boolean) => {
        this.isAppReady = isAppReady;
    };

    setActivePage(page: string) {
        this.activePage = page;
    }

    setIsPageLoaded(isPageLoaded: boolean) {
        this.isPageLoaded = isPageLoaded;
    }

    updateStatePages(statePage: IPageState) {
        this.statePages.set(this.activePage, statePage);
    }

    get currentStatePage(): IPageState | null {
        return this.statePages.get(this.activePage) || null;
    }
}

export const store = new Store();
export const StoreContext = createContext<Store>(store);
