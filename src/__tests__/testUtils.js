import mediaQuery from "css-mediaquery";
// Función para crear una implementación personalizada de matchMedia
export function createMatchMedia(width) {
    window.matchMedia = (query) => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
    });
}
