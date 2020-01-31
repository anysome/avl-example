import store from './lib/store';
import history from './lib/history';

class APP {

    constructor() {
        const userStr = store.getItem('__user__');
        this.user = userStr ? JSON.parse(userStr) : null;
    }

    user = null;

    history = history;

    login = (newUser) => {
        this.user = newUser;
        store.setItem('__user__', JSON.stringify(this.user));
    };

    logout = () => {
        this.user = null;
        store.removeItem('__user__');
        history.push('/user/login');
    };
};

const app = new APP();

export default app;