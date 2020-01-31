import store from './lib/store';
import history from './lib/history';

class APP {

    constructor() {
        const userStr = store.getItem('__usr__');
        this.user = userStr ? JSON.parse(userStr) : null;
    }

    user = null;

    history = history;

    login = (newUser) => {
        this.user = newUser;
        store.setItem('__usr__', JSON.stringify(this.user));
    };

    logout = () => {
        this.user = null;
        store.removeItem('__usr__');
        history.push('/login');
    };
};

const app = new APP();

export default app;

