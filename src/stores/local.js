import { browser } from '$app/env';
import { writable, readable } from 'svelte/store';
import { thePast } from '../utils/dates';

let currentDay, defaultDay;
currentDay = defaultDay = {
    date: new Date(),
    water: 0,
    calories: 0,
    salt: 0
};
let history = [];

if (browser) {
    // get local 'today' if it exists; if it doesn't get empty day object
    currentDay = JSON.parse(localStorage.getItem('today')) || defaultDay;

    // get local 'history' if it exists; otherwise empty array
    history = JSON.parse(localStorage.getItem('history') || '[]');

    // if today.date is a day ago...
    if (thePast(currentDay.date)) {
        // ...push current today onto history array...
        history.push(currentDay);

        // ... and reset today
        currentDay = defaultDay;
    }
}

// set today store to current day
export const todayStore = writable(currentDay);
//export const historyStore = readable(history);

if (browser) {
    // update local 'today ' storage if values change
    todayStore.subscribe((value) =>
        localStorage.setItem('today', JSON.stringify(value))
    );
    localStorage.setItem('history', JSON.stringify(history));
}
