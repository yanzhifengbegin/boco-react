import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { ConfigProvider } from 'antd';
import antd_zh_CN from 'antd/lib/locale-provider/zh_CN';
import antd_en_US from 'antd/lib/locale-provider/en_US';

import moment from 'moment';
import proxy from '../common/api';

require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

// 语言包枚举
export const SUPPORT_LOCALES = [
    {
        name: 'English',
        value: 'en-US',
    },
    {
        name: '中文',
        value: 'zh-CN',
    },
];

export const langKeysOptions = {
    urlLocaleKey: 'lang',
    localStorageLocaleKey: 'lang',
};

const DEFAULTLOCALE = 'zh-CN';

export class LocaleProvider extends Component {
    state = {
        initDone: false,
    };

    componentDidMount() {
        this.loadLocales();
    }

    determineLocale() {
        const options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // URL=>缓存=>默认值=>浏览器
        return (
            this.getLocaleFromURL(options) ||
            this.getLocaleFromLocalStorage(options) ||
            DEFAULTLOCALE ||
            this.getLocaleFromBrowser()
        );
    }

    getLocaleFromURL(options) {
        var urlLocaleKey = options.urlLocaleKey;

        if (urlLocaleKey) {
            var query = window.location.search.split('?');
            if (query.length >= 2) {
                var params = new URLSearchParams(query[1]);
                return params && params.get(urlLocaleKey);
            }
        }
    }

    getLocaleFromLocalStorage(options) {
        var localStorageLocaleKey = options.localStorageLocaleKey;
        if (localStorageLocaleKey && window.localStorage) {
            return localStorage.getItem(localStorageLocaleKey);
        }
    }

    getLocaleFromBrowser() {
        return navigator.language || navigator.userLanguage;
    }

    loadLocales() {
        let currentLocale = this.determineLocale(langKeysOptions);
        if (!find(SUPPORT, { value: currentLocale })) {
            currentLocale = DEFAULTLOCALE;
        }

        proxy.loadJSON({
                fullUrl: `${constant.LOCALES_PATH}/${currentLocale}.json`,
                type: 'get'
            }).then((res) => {
            intl.init({
                currentLocale,
                locales: {
                    [currentLocale]: window.locale,
                },
            }).then(() => {
                moment.locale(currentLocale);
                this.setState({
                    initDone: true,
                    antdLocale: currentLocale === 'en-US' ? antd_en_US : antd_zh_CN,
                });
                localStorage.setItem(langKeysOptions.localStorageLocaleKey, currentLocale);
            });
        });
    }

    render() {
        return (
            <ConfigProvider locale={this.state.antdLocale}>{this.state.initDone && this.props.children}</ConfigProvider>
        );
    }
}

export default intl;
