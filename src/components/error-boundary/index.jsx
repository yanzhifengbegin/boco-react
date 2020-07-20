import React from 'react';
import Exception from '../exception';
// import * as Sentry from '@sentry/browser';
import { withRouter } from 'react-router-dom';
import eruda from 'eruda';

const ENVIRONMENT_DOMAINS = {
    production: [],
    staging: ['s-*.udesk.cn', '*.udeskt1.com', '*.udeskt2.com', '*.udeskt3.com', '*.cem.tryudesk.com'],
    development: ['*.ud.com', 'local-*.udesk.cn', '*.local.udesk.cn', 'localhost'],
};

class ErrorBoundary extends React.Component {
    showException = false;

    static getDerivedStateFromError(error) {}
    componentDidMount() {
        if (this.matchTestEnv()) {
            eruda.init();
        }
    }
    componentDidCatch(error, info) {
        console.error(error, '-----', info);
        this.showException = true;
        this.forceUpdate();
    }

    matchTestEnv() {
        let environmentKeys = Object.keys(ENVIRONMENT_DOMAINS);
        for (let index = 0; index < environmentKeys.length; index++) {
            let environment = environmentKeys[index];
            let domains = ENVIRONMENT_DOMAINS[environment];
            if (Array.isArray(domains) && domains.length > 0) {
                for (let domainsIndex = 0; domainsIndex < domains.length; domainsIndex++) {
                    let domainRule = domains[domainsIndex];
                    if (typeof domainRule === 'string') {
                        let regExp = new RegExp(
                            '^' + domainRule.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$&').replace('\\*', '.*') + '$',
                            'i'
                        );
                        let regIp = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
                        if (regExp.test(window.location.hostname) || regIp.test(window.location.hostname)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    render() {
        if (this.showException) {
            this.showException = false;
            return <Exception />;
        }

        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);
