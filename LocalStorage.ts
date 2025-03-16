interface SStorage<T> {
    [key: string] : T;
};

class LocalStorage<T> {
    private storage: SStorage<T> = {}
    set(key: string, value: T) {
        this.storage[key] = value;
    }
    remove(key: string) {
        delete this.storage[key];
    }
    get(key: string): T {
        return this.storage[key];
    }
    clear() {
        this.storage = {}
    }
}

const stringsStorage = new LocalStorage<string>()
stringsStorage.get("ket")
stringsStorage.set("hello", "and how are you?")

const booleansStorage = new LocalStorage<boolean>()
booleansStorage.get("xxx")
booleansStorage.set("hello", true)

console.log(stringsStorage);
console.log(booleansStorage);

