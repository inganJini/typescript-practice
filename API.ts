// LocalStorage API Implementation

abstract class AbstractStorage<T> {
    abstract setItem(key: string, value: T): void;
    abstract getItem(key: string): T | null;
    abstract clearItem(key: string): void;
    abstract clear(): void;
}

class TestLocalStorage<T> extends AbstractStorage<T> {
    setItem(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): T | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    clearItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}

// Usage Example
const localStorageInstance = new TestLocalStorage<string>();
localStorageInstance.setItem("name", "John Doe");
console.log(localStorageInstance.getItem("name"));
localStorageInstance.clearItem("name");
localStorageInstance.clear();

// Geolocation API Implementation
class GeolocationAPI {
    getCurrentPosition(success: PositionCallback): void;
    getCurrentPosition(success: PositionCallback, error: PositionErrorCallback): void;
    getCurrentPosition(success: PositionCallback, error: PositionErrorCallback, options: PositionOptions): void;
    getCurrentPosition(success: PositionCallback, error?: PositionErrorCallback, options?: PositionOptions): void {
        navigator.geolocation.getCurrentPosition(success, error, options);
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

// Usage Example
const geolocation = new GeolocationAPI();
const successCallback: PositionCallback = (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
};

const errorCallback: PositionErrorCallback = (error) => {
    console.error("Error:", error.message);
};

geolocation.getCurrentPosition(successCallback);
const watchId = geolocation.watchPosition(successCallback, errorCallback);
geolocation.clearWatch(watchId);