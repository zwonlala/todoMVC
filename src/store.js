import {Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery} from './item';

export default class Store {
    constructor(name, callback) {
        const localStorage = window.localStorage;
        let liveTodos;

        this.getLocalStorage = () => {
            return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
        };

        this.setLocalStorage = (todos) => {
            localStorage.setItem(name, JSON.stringify(liveTodos = todos));
        };

        if (callback) {
            callback();
        }
    }

    find(query, callback) {
        const todos = this.getLocalStorage();
        let k;

        callback(todos.filter(todo => {
            for (k in query) {
                if (query[k] !== todo[k]) {
                    return false;
                }
            }
            return true;
        }));
    }

    update(update, callback) {
        const id = update.id;
        const todos = this.getLocalStorage();
        let i = todos.length;
        let k;

        while (i--) {
            if (todos[i].id === id) {
                for (k in update) {
                    todos[i][k] = update[k];
                }
                break;
            }
        }

        this.setLocalStorage(todos);

        if (callback) {
            callback();
        }
    }

    insert(item, callback) {
        const todos = this.getLocalStorage();
        todos.push(item);
        this.setLocalStorage(todos);

        if (callback) {
            callback();
        }
    }

    remove(query, callback) {
        let k;
        
        const todos = this.getLocalStorage().filter(todo => {
            for (k in query) {
                if (query[k] !== todo[k]) {
                    return true;
                }
            }
            return false;
        });

        this.setLocalStorage(todos);

        if (callback) {
            callback(todos);
        }
    }

    count(callback) {
        this.find(emptyItemQuery, data => {
            const total = data.length;

            let i = total;
            let completed = 0;

            while (i--) {
                completed += data[i].completed;
            }
            callback(total, total - completed, completed);
        });
    }
}

