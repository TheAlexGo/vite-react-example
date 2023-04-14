import React, { FC, useLayoutEffect } from 'react';

import { AUTO_MODIFIER, DARK_MODIFIER, LIGHT_MODIFIER } from '@utils/constants';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { LayoutMain } from '@layouts/LayoutMain/LayoutMain';
import { General, NotFound } from '@pages';
import { Pages, Themes } from '@types';

import './App.styl';

const App: FC = observer(() => {
    const { isAppReady, activeTheme } = useStore();
    const { initApi } = useController();

    useLayoutEffect(() => {
        initApi();
    }, [initApi]);

    useLayoutEffect(() => {
        const { classList } = document.documentElement;
        classList.remove(AUTO_MODIFIER, DARK_MODIFIER, LIGHT_MODIFIER);
        switch (activeTheme) {
            case Themes.AUTO:
                classList.add(AUTO_MODIFIER);
                break;
            case Themes.DARK:
                classList.add(DARK_MODIFIER);
                break;
            case Themes.LIGHT:
                classList.add(LIGHT_MODIFIER);
                break;
        }
    }, [activeTheme]);

    if (!isAppReady) {
        return <div>Загрузка...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path={Pages.GENERAL} element={<LayoutMain />}>
                    <Route index element={<General />} />
                    <Route path={Pages.NOT_FOUND} element={<NotFound />} />
                    <Route path="*" element={<Navigate to={Pages.NOT_FOUND} />} />
                </Route>
            </Routes>
        </Router>
    );
});

export default App;
