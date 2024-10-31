// func return true if screen size is lg
export const isLarge = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
        return true
    }
    return false
}