/**
 * MiniAPI.ts
 * LocalStorage API
 * 
 *  * Use abstract classes and generics.
 *  * 추상화 클래스와 제네릭을 사용하세요.
 * 
 *  localStorage.setItem(<key>, <value>);
 *  localStorage.getItem(<key>);
 *  localStorage.clearItem(<key>);
 *  localStorage.clear();
 */

// LocalStorage API
abstract class MiniStorage<T> {
    storage: { [key: string]: T } = {};

    abstract setItem(key: string, value: T): void;
    abstract getItem(key: string): T | null;
    abstract clearItem(key: string): void;
    abstract clear(): void;

    constructor() {
        this.storage = {};
    }
};

class MiniLocalStorage<T> extends MiniStorage<T> {
    setItem(key: string, value: T): void {
        this.storage[key] = value;
    }

    getItem(key: string): T | null {
        return this.storage[key] || null;
    }

    clearItem(key: string): void {
        delete this.storage[key];
    }

    clear(): void {
        this.storage = {};
    }
}

// Test
const miniLocalStorage = new MiniLocalStorage<string>();
miniLocalStorage.setItem("name", "Gapjin");
miniLocalStorage.setItem("gender", "man");
console.log(miniLocalStorage.getItem("name"));

miniLocalStorage.clearItem("name");
console.log(miniLocalStorage.getItem("name"));
console.log(miniLocalStorage.getItem("gender"));

miniLocalStorage.clear();
console.log(miniLocalStorage.getItem("name"));
console.log(miniLocalStorage.getItem("gender"));

//////////////////////////////////////////////////////////////////
// Geolocation API
type Position = {
    coords: {
        latitude: number;
        longitude: number;
    };
};
interface MiniGeolocation<T> {
    position: Position;
    getCurrentPosition(successFn: PositionCallback): void;
    getCurrentPosition(successFn: PositionCallback, errorFn: PositionErrorCallback): void;
    getCurrentPosition(successFn: PositionCallback, errorFn: PositionErrorCallback, options: PositionOptions): void;
    watchPosition(success: PositionCallback): number;
    watchPosition(success: PositionCallback, error: PositionErrorCallback): number;
    watchPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): number;
    clearWatch(id: number): void;
}

class MiniGeolocationAPI implements MiniGeolocation<Position> {
    position: Position = {
        coords: {
            latitude: 0,
            longitude: 0,
        }
    };

    getCurrentPosition(successFn: PositionCallback): void;
    getCurrentPosition(successFn: PositionCallback, errorFn: PositionErrorCallback): void;
    getCurrentPosition(successFn: PositionCallback, errorFn: PositionErrorCallback, options: PositionOptions): void;
    getCurrentPosition(successFn: PositionCallback, errorFn?: PositionErrorCallback, options?: PositionOptions): void {
        navigator.geolocation.getCurrentPosition(successFn, errorFn, options);
    }

    watchPosition(success: PositionCallback): number;
    watchPosition(success: PositionCallback, error: PositionErrorCallback): number;
    watchPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): number;
    watchPosition(success: PositionCallback, error?: PositionErrorCallback, options?: PositionOptions): number {
        return navigator.geolocation.watchPosition(success, error, options);
    }

    clearWatch(id: number): void {
        navigator.geolocation.clearWatch(id);
    }
}

const miniGeolocation = new MiniGeolocationAPI();
const sCallback: PositionCallback = (p) => {
    miniGeolocation.position.coords.latitude = p.coords.latitude;
    miniGeolocation.position.coords.longitude = p.coords.longitude;
    console.log("Latitude:", p.coords.latitude);
    console.log("Longitude:", p.coords.longitude);
    console.log("현재 위치는..."
        + "Latitude:"
        + miniGeolocation.position.coords.latitude 
        + ", " 
        + "Longitude:"
        + miniGeolocation.position.coords.longitude);
}
console.log(miniGeolocation.getCurrentPosition(sCallback));