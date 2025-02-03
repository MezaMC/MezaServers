import type {NitroApp} from "nitropack/types";

export default function registerDataUpdater(
    nitroApp: NitroApp,
    updateFunction: Function,
    intervalMinutes: number
) {
    updateFunction();
    const updater = setInterval(updateFunction, intervalMinutes * 60_000)

    nitroApp.hooks.hookOnce('close', () => {
        clearInterval(updater)
    });
}