export class Tag {

    private _name: string;

    constructor(n: string) {
        this._name = n;
    }

    get name(): string{
        return this._name;
    }
}
