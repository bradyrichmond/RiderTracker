export function debounce<T>(func: (...param: T[]) => void, timeout = 3000) {
    let timer: number

    return (...args: T[]) => {
        window.clearTimeout(timer)
        timer = window.setTimeout(func, timeout, ...args)
    }
}