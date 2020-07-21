import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';
import { LocaleProvider } from './components/locale-provider';

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <div className="boco-react">
            <Provider store={store}>
                <LocaleProvider>
                    <Router>
                        <App />
                    </Router>
                </LocaleProvider>
            </Provider>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
