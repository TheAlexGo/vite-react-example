import { createContext } from 'react';

import { toJS } from 'mobx';

import { ApiService } from '@services/ApiService';
import { store, Store } from '@store';
import { IApiCallback, Pages } from '@types';

export class AppController {
    store: Store;

    apiService: ApiService;

    constructor(appStore: Store) {
        this.store = appStore;
        this.apiService = new ApiService(this.apiCallback);
    }

    logger(message: unknown, ...optionalParams: unknown[]) {
        // eslint-disable-next-line prefer-rest-params,no-console
        console.log(message, ...optionalParams);
    }

    debug = (message: unknown, ...optionalParams: unknown[]) => {
        if (import.meta.env.DEV) {
            this.logger(message, ...optionalParams);
        }
    };

    apiCallback: IApiCallback = (method, result, data) => {
        this.debug(method, result, data);
    };

    initApi = async () => {
        this.debug('Начинается инициализация приложения...');
        if (this.store.isAppReady) {
            this.debug('Приложение уже инициализированно!');
            return false;
        }
        return this.apiService
            .initApi()
            .then((result) => result)
            .then<boolean>((result) => {
                this.debug('Приложение инициализированно успешно!');
                this.store.setIsAppReady(result);
                return result;
            });
    };

    changePage = (page: string) => {
        const { activePage } = this.store;
        if (page === activePage) {
            this.debug('Уже на странице:', page);
            return;
        }
        this.debug('Перешли на страницу:', page);
        this.store.setActivePage(page);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadPage = (page: Pages) => {
        const { currentStatePage, activePage, isPageLoaded } = this.store;
        if (isPageLoaded) {
            this.debug('Страница уже загружена:', activePage);
            return;
        }
        this.debug('Загрузили страницу:', activePage);
        if (currentStatePage) {
            this.debug('Загрузили состояние страницы:', toJS(currentStatePage));
            setTimeout(() => window.scrollTo(0, currentStatePage.positionY));
        }
        this.store.setIsPageLoaded(true);
    };

    leavePage = () => {
        const { isPageLoaded, activePage } = this.store;
        if (!isPageLoaded) {
            this.debug('Страницу уже покинули:', activePage);
            return;
        }
        this.debug('Покинули страницу:', activePage);
        const state = {
            positionY: window.scrollY
        };
        this.store.updateStatePages(state);
        this.store.setIsPageLoaded(false);
    };
}

export const appController = new AppController(store);
export const AppControllerContext = createContext<AppController>(appController);
