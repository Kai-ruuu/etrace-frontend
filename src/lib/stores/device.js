import { writable } from 'svelte/store';

export const deviceHeight = writable(0)

if (typeof window !== 'undefined') {
    deviceHeight.set(window.innerHeight)
    window.addEventListener('resize', () => deviceHeight.set(window.innerHeight))
}