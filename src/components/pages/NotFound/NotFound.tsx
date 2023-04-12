import React from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

import { Page } from '../Page/Page';

import classes from './NotFound.module.styl';

const NotFound = () => {
    usePage(Pages.NOT_FOUND);

    return (
        <Page className={classes['not-found']}>
            <div>Страница не найдена</div>
        </Page>
    );
};

export default NotFound;
