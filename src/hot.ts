export function hot(module: any) {
    if (module && module.hot) {
        module.hot.accept();
    }
}
