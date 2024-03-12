export const getEnvVariables = () => {
    import.meta.env; //Lo vimos en el testing del journal

    return {
        ...import.meta.env
    }
}