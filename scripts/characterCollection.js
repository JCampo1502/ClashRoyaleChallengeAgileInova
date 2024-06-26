import { Character } from "./character.js";

export class CharacterCollection{
    #characters = [];
    #currentIndex = 0;

    constructor(characters){
        /* Add characters */
        this.#characters = characters;
    }

    /* store sharacters */
    #pushCharacters(){
        const Characters = this.#characters.map(c => {        
            return{
                name:c.name,
                description:c.description,
                imageUrl:c.imageUrl
            }
        })        
        localStorage.setItem('characters', JSON.stringify(Characters));
    }

    /* Validate new character */
    #validateCharacter(newCharacter){
        if(!(newCharacter instanceof Character))throw new Error('invalid character');
    }

    addNewCharacter(newCharacter){
        this.#validateCharacter(newCharacter);
        this.#characters.push(newCharacter);
        this.#currentIndex = this.#characters.length - 1;
        this.#pushCharacters();
    }

    removeCharacter(index){
        this.#characters.splice(index, 1);
        this.#pushCharacters();
    }

    updateCharacter(index, character){
        this.#validateCharacter(character);
        if(!this.#characters.indexOf(index))throw new Error('invalid index');
        this.#characters.splice(index, 1, character);
        this.#pushCharacters();
    }

    get currentCharacter(){
        return this.#characters[this.#currentIndex]
    }
    
    get nextCharacter(){
        if(this.#currentIndex >= this.#characters.length - 1)return false;        
        ++this.#currentIndex;
        return {
            //Evaluate end
            last:(this.#currentIndex === this.#characters.length - 1)
        };
    }

    get previousCharacter(){        
        if(this.#currentIndex <= 0)return false;
        --this.#currentIndex;
        return {
            //Evaluate start
            first:(this.#currentIndex === 0)
        };
    }
}