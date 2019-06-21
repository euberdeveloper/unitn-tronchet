import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import { Store } from 'vuex';

import firebaseApp from './firebase';

class FireAuth {

    private _user: User | null = null;
    get user(): User | null {
        return this._user;
    }
    set user(user: User | null) {
        this.store.dispatch('setUser', user);
        this._user = user;
    }

    private app: firebase.app.App;
    private auth: firebase.auth.Auth;
    private store: Store<any & { user: User }>;

    constructor(app: firebase.app.App, store: Store<any & { user: User }>) {
        this.app = app;
        this.auth = this.app.auth();
        this.store = store;
        this.onUserChanged();
    }

    async login(email: string, password: string): Promise<void> {
        if (!this.isLoggedIn()) {
            await this.auth.signInWithEmailAndPassword(email, password);
        }
    }

    async logout(): Promise<void> {
        await this.auth.signOut();
    }

    private isLoggedIn(): boolean {
        return this.user !== null;
    }

    private onUserChanged() {
        this.auth.onAuthStateChanged(user => {
            this.user = user;
        });
    }
}

let auth: FireAuth;

export function init(store: Store<any & { user: User }>) {
    auth = new FireAuth(firebaseApp, store);
}

export function get(): FireAuth {
    return auth;
}
