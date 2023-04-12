import React, { FC } from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

import { Page } from '../Page/Page';

import classes from './General.module.styl';

const General: FC = () => {
    usePage(Pages.GENERAL);

    return (
        <Page className={classes.container}>
            <h1>Заголовок</h1>
        </Page>
    );
};

export default General;
