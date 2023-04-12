import { useEffect, useLayoutEffect } from 'react';

import { useController } from '@hooks/useController';
import { Pages } from '@types';

/**
 * Хук для загрузки UI страницы (шапки)
 *
 * ИСПОЛЬЗОВАТЬ ВО ВСЕХ КОМПОНЕНТАХ СТРАНИЦ
 * @param page
 */
export const usePage = (page: Pages) => {
    const { loadPage, leavePage } = useController();

    useEffect(() => {
        loadPage(page);
    }, [loadPage, page]);

    useLayoutEffect(() => leavePage, [leavePage]);
};
