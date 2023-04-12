import { lazy, memo } from 'react';

export const NotFound = memo(lazy(() => import('./NotFound/NotFound')));
export const General = memo(lazy(() => import('./General/General')));
