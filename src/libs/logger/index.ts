export const Logger = {
    log(...args: any[]) {
        console.log("Logger: ", ...args);
    },
    error(...args: any[]) {
        console.error("Logger: ", ...args);
    },
    info(...args: any[]){
        console.info("Logger: ", ...args);
    }
}