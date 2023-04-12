import React, { FC, useLayoutEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { LayoutMain } from '@layouts/LayoutMain/LayoutMain';
import { General } from '@pages';
import { Pages } from '@types';

import './App.styl';

const App: FC = observer(() => {
    const { isAppReady } = useStore();
    const { initApi } = useController();

    useLayoutEffect(() => {
        initApi();
    }, [initApi]);

    if (!isAppReady) {
        return <div>Загрузка...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path={Pages.GENERAL} element={<LayoutMain />}>
                    <Route index element={<General />} />
                    <Route path="*" element={<Navigate to={Pages.NOT_FOUND} />} />
                </Route>
            </Routes>
        </Router>
    );
});

export default App;
