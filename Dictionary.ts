/*
    add: 단어를 추가함.
    get: 단어의 정의를 리턴함.
    delete: 단어를 삭제함.
    update: 단어를 업데이트 함.
    showAll: 사전 단어를 모두 보여줌.
    count: 사전 단어들의 총 갯수를 리턴함.
    upsert 단어를 업데이트 함. 존재하지 않을시. 이를 추가함. (update + insert = upsert)
    exists: 해당 단어가 사전에 존재하는지 여부를 알려줌.
    bulkAdd: 다음과 같은 방식으로. 여러개의 단어를 한번에 추가할 수 있게 해줌. [{term:"김치", definition:"대박이네~"}, {term:"아파트", definition:"비싸네~"}]
    bulkDelete: 다음과 같은 방식으로. 여러개의 단어를 한번에 삭제할 수 있게 해줌. ["김치", "아파트"]
*/

type Words = {
    [key: string]: string;
};


class Dict {
    private words: Words;
    constructor () {
        this.words = {};
    }

    add(word: Word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.def;
        }
    }

    get(term: string): string | undefined {
        return this.words[term]
    }

    showAll() {
        const keys = Object.keys(this.words)
        keys.forEach(x => console.log(x.toString()));
    }
    
    delete(term: string) {
        delete this.words[term];
    }

    update(key: string, def: string) {
        if (this.words[key] !== undefined) {
            this.words[key] = def;
        }
    }

    count(): number {
        const cnt = Object.keys(this.words).length;
        return cnt;
    }

    exists(term: string): boolean {
        return this.words.hasOwnProperty(term);
    }

    upsert(term: string, definition: string): void {
        this.words[term] = definition;
    }

    bulkAdd(wordList: { term: string; definition: string }[]): void {
        wordList.forEach(({ term, definition }) => this.add(new Word(term, definition)));
    }

    bulkDelete(termList: string[]): void {
        termList.forEach((term) => this.delete(term));
    }

}


class Word {
    constructor(
        public term: string,
        public def: string
    ) {}
 }

//////////////////////////////////////

const dict = new Dict();

const chicken = new Word("chicken", "최애 요리");
const pizza = new Word("pizza", "완전식품 피자");

// get
console.log(dict.get("chiken"));

//update
dict.update("chicken", "맛있는 치킨");
console.log(dict.get("chiken"));

// exists
console.log(dict.exists("pizza")); // true
console.log(dict.exists("burger")); // false

dict.upsert("burger", "햄버거는 건강식!");
console.log(dict.get("burger"));

dict.upsert("pizza", "치즈많은 이재모피자");
console.log(dict.get("pizza"));

dict.bulkAdd([
    { term: "kimchi", definition: "한국인의 밥도둑" },
    { term: "coffee", definition: "생명수" },
]);

dict.showAll();

dict.bulkDelete(["kimchi", "coffee"])
dict.showAll();

console.log(`사전 단어 수: ${dict.count()}`);
