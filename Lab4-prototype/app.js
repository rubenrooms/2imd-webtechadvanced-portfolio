class App {
    constructor() {
        this.start();
    }

    start(){
        navigator.geolocation.getCurrentPosition((position)=> {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;


        })
    }
}

let app = new App();