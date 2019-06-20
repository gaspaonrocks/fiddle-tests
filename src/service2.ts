import { Service1 } from "./service1";

export class Service2 {
    constructor(
        private service1: Service1,
    ) { }

    getPromise = () => {
        return this.service1
            .getDataWithPromise()
            .then(success => console.log(`I'M DOING MORE AWESOME STUFF HERE !!!`, success))
            .catch(error => console.error(`so very very sad...`, error))
            .finally(() => console.log(`that's it i'm done.`));
    }

    getObservable = () => {
        this.service1
            .getDataWithObservable()
            .subscribe(
                success => console.log(`I'M DOING MORE AWESOME STUFF HERE !!!`, success.data),
                error => console.error(`so very very sad...`, `Error: status ${error.response.status}, ${error.response.statusText}`),
                () => console.log(`that's it i'm done.`)
            );
    }
}

export const service2 = new Service2(new Service1());