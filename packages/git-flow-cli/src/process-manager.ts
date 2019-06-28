export namespace ProcessManager {
    let internalProcess;

    export const registerProcess = (proc) => {
        internalProcess = proc;
    };

    export const getProcess = () => internalProcess;

    export const cleanScreen = () => internalProcess.stdout.write('\x1Bc');
}