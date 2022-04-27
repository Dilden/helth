import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { thePast } from '../utils/dates';

let myDay, defaultDay;
let timeline = [];
myDay = defaultDay = {
    date: new Date(),
    water: 0,
    calories: 0,
    salt: 0
};

if (browser) {
    myDay = JSON.parse(localStorage.getItem('today')) || defaultDay;
    timeline = JSON.parse(localStorage.getItem('history')) || [];
    if (thePast(myDay.date)) {
        timeline.push(myDay);
        myDay = defaultDay;
    }
}

export const history = writable(timeline);
export const today = writable(myDay);

if (browser) {
    today.subscribe((value) => localStorage.setItem('today', JSON.stringify(value)));
}
