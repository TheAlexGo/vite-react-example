export interface IApi {
    test: () => void;
}

export type IApiCallbackResult = 'ok' | 'cancel';
export type IApiMethod = keyof IApi;

export type IApiCallback<T = string> = (
    method: IApiMethod,
    result: IApiCallbackResult,
    data: T
) => void;

/**
 * Для проверки корректности выбранной страницы
 */
export enum Pages {
    NOT_FOUND = '/not_found',
    GENERAL = '/'
}

export interface IPageState {
    positionY: number;
}
