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
        localStorage.setItem('characters', JSON.stringify(this.#characters));
    }

    /* Validate new character */
    #validateCharacter(newCharacter){
        if(!(newCharacter instanceof Character))throw new Error('invalid character');
    }

    addNewCharacter(newCharacter){
        this.#validateCharacter();
        this.#characters.push(newCharacter);
        this.#pushCharacters();
    }

    removeCharacter(index){
        this.#validateCharacter();
        this.#characters.splice(index, 1);
        this.#pushCharacters();
    }

    updateCharacter(index, character){
        this.#validateCharacter();
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