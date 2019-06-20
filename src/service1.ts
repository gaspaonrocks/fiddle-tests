import axios from "axios";
import { from } from "rxjs";

export class Service1 {
    constructor() { }

    private URLpromise = "https://jsonplaceholder.typicode.com/todos/9";
    private URLobservable = "https://jsonplaceholder.typicode.com/todos/149";

    getDataWithPromise = () => {
        return axios
            .get(this.URLpromise)
            .then(data => {
                console.log(`I'm supposed to do some awesome stuf here !!!`, data.data);
                return data.data;
            })
            .catch(error => {
                console.error('nay', error);
                return error.data;
            });
    }

    getDataWithObservable = () => {
        return from(axios.get(this.URLobservable))
            .pipe(data => {
                data.subscribe(
                    success => console.log(`I'm supposed to do some awesome stuf here !!!`, success),
                    error => console.error('nay', `Error: status ${error.response.status}, ${error.response.statusText}`));
                return data;
            });
    }
}