import characters from './characters.js';
if(!localStorage.getItem('characters')){
    localStorage.setItem('characters', JSON.stringify(characters))
}

class Character{    
    #name = null;
    #imageUrl= null;
    #description = null;

    static createNewCharacter({name, imageUrl, description}){
        const NewCharacter = new Character();        
        NewCharacter.name = name;
        NewCharacter.imageUrl = imageUrl;
        NewCharacter.description = description;        
        return NewCharacter;
    }

    set name(newName){
        if(
            typeof(newName) !== 'string' ||
            newName === '' ||
            newName.length > 50
        )throw new Error('El nombre no es valido');
        this.#name=newName;
    }
    
    get name(){
        if(!this.#name)throw new Error('No hay ningun nombre');
        return this.#name;
    }

    set description(newDescription){        
        if(
            typeof(newDescription) !== 'string' ||
            newDescription === '' ||
            newDescription.length > 350
        )throw new Error('La descripción no es valida');
        this.#description=newDescription;
    }

    get description(){
        if(!this.#description)throw new Error('No hay ninguna descripción');
        return this.#description;
    }

    set imageUrl(newImageUrl){
        if(
            typeof(newImageUrl) !== 'string' ||
            newImageUrl === ''
        )throw new Error('Imagen no valida');
        this.#imageUrl = newImageUrl;
    }

    get imageUrl(){
        if(!this.#imageUrl)throw new Error('No hay ninguna imagen');
        return this.#imageUrl;
    }
}

class CharacterCollection{
    #characters = [];
    #currentIndex = 0;

    constructor(characters){        
        this.#characters = characters;
    }

    #pushCharacters(){
        localStorage.setItem('characters', JSON.stringify(this.#characters));
    }

    addNewCharacter(newCharacter){
        if(!(newCharacter instanceof Character))throw new Error('invalid character');
        this.#characters.push(newCharacter);
        this.#pushCharacters();
    }

    removeCharacter(index){
        if(!this.#characters.indexOf(index))throw new Error('invalid index');
        this.#characters.splice(index, 1);
        this.#pushCharacters();
    }

    updateCharacter(index, character){
        if(!(character instanceof Character))throw new Error('invalid character');
        if(!this.#characters.indexOf(index))throw new Error('invalid index');        
        this.#characters.splice(index, 1, character);
        this.#pushCharacters();
    }

    get currentCharacter(){
        return this.#characters[this.#currentIndex]
    }

    get nextCharacter(){        
        ++this.#currentIndex;
        if(this.#currentIndex > this.#characters.length - 1)return false;        
        return {
            last:(this.#currentIndex === this.#characters.length - 1)
        };
    }

    get previousCharacter(){
        --this.#currentIndex;
        if(this.#currentIndex < 0)return false;        
        return {
            first:(this.#currentIndex === 0)
        };
    }
}


const setup = ()=>{        
    const StoredData = JSON.parse(localStorage.getItem('characters'));
    const Characters = new CharacterCollection(StoredData.map(c => Character.createNewCharacter(c)));
    UpdateView(Characters.currentCharacter);
    start({Characters});
}

const start = ({Characters})=>{    
    const CharacterContainer = document.getElementById('character');    
    const BtnPrev = document.querySelector('.character__btn--prev');
    const BtnNext = document.querySelector('.character__btn--next');
    if(!(Characters instanceof CharacterCollection))throw new Event('Invalid Collection');

    /* Switch section */
    document.querySelector('.character__name')
    .addEventListener('click', ()=>{
        if(CharacterContainer.classList.contains('character--info'))return;
        CharacterContainer.classList.add('character--info');
    })

    document.querySelector('.character__btn--cancel')
    .addEventListener('click', ()=>{
        if(!CharacterContainer.classList.contains('character--info'))return;
        CharacterContainer.classList.remove('character--info');
    })

    /* Switch character */ 
    BtnPrev.addEventListener('click', ()=>{
            const HasPrevious = Characters.previousCharacter;
            if(!HasPrevious)return;
            if(HasPrevious.first && !BtnPrev.classList.contains('character__btn--disabled'))
                BtnPrev.classList.add('character__btn--disabled');
            if(BtnNext.classList.contains('character__btn--disabled'))
                BtnNext.classList.remove('character__btn--disabled');
            UpdateView(Characters.currentCharacter);
        });
    BtnNext.addEventListener('click', ()=>{
            const HasNext = Characters.nextCharacter;
            if(!HasNext)return
            if (HasNext.last && !BtnNext.classList.contains('character__btn--disabled'))
                BtnNext.classList.add('character__btn--disabled');
            if(BtnPrev.classList.contains('character__btn--disabled'))
                BtnPrev.classList.remove('character__btn--disabled');
            UpdateView(Characters.currentCharacter);
        });
}

const UpdateView = (character)=>{    
    if(!(character instanceof Character))throw new Error('Invalid Character');
    document.querySelector('.character__name').textContent = character.name;
    document.querySelector('.character__description').textContent = character.description;
    document.querySelector('.character__image').setAttribute('src',character.imageUrl);
}


document.addEventListener('DOMContentLoaded', setup)

