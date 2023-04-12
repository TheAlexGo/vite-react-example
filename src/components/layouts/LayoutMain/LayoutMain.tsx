import React, { FC, Suspense, useLayoutEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';

import { useController } from '@hooks/useController';

/**
 * Шаблон для основных страниц приложения
 * @constructor
 */
export const LayoutMain: FC = observer((): JSX.Element => {
    const { changePage } = useController();
    const location = useLocation();

    useLayoutEffect(() => {
        changePage(location.pathname);
    }, [changePage, location.pathname]);

    return (
        <main>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Outlet />
            </Suspense>
        </main>
    );
});
