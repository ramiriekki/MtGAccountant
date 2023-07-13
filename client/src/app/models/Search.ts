export class Search {
    constructor(
        public name?: string,
        public rarities?: string[],
        public minPrice?: number,
        public maxPrice?: number,
        public sets?: string[],
        public colors?: string[],
        public owned?: boolean
    ) {}
}
