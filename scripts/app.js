import { Character } from "./character.js";
import { CharacterCollection } from "./characterCollection.js";

export class App{
    #characters = null;

    setup(){
        //Get stored data
        const StoredData = JSON.parse(localStorage.getItem('characters'))
            .map(c => Character.createNewCharacter(c));//Create Objects
        //Set characters        
        this.#characters =  new CharacterCollection(StoredData);
        this.updateView();
    }

    start(){
        /* Elements */
        const CharacterContainer = document.getElementById('character');    
        const BtnPrev = document.querySelector('.character__btn--prev');
        const BtnNext = document.querySelector('.character__btn--next');   

        /* Functions */
        const ShowPrev = ()=>{
            const HasPrevious = this.#characters.previousCharacter;
            //Has Previus?
            if(!HasPrevious)return
            //Add class
            if(HasPrevious.first) BtnPrev.classList.add('character__btn--disabled');
            BtnNext.classList.remove('character__btn--disabled');                    
            //Update View
            this.updateView();
        }
        
        const ShowNext = ()=>{
            const HasNext = this.#characters.nextCharacter;
            //Has next?
            if(!HasNext)return
            //Add Clases
            if (HasNext.last ) BtnNext.classList.add('character__btn--disabled');
            BtnPrev.classList.remove('character__btn--disabled');
            //Update View
            this.updateView();            
        }
        
        //Switch section Events
        document.querySelector('.character__name').addEventListener('click', 
            ()=>CharacterContainer.classList.add('character--info'))

        document.querySelector('.character__btn--cancel').addEventListener('click', 
            ()=>CharacterContainer.classList.remove('character--info'));

        //Change Page Events
        BtnPrev.addEventListener('click', ShowPrev.bind(this));
        BtnNext.addEventListener('click', ShowNext.bind(this));
    }

    updateView(){
        //Get current character        
        const CurrentCharacter = this.#characters.currentCharacter;
        /* Update Fields */
        document.querySelector('.character__name').textContent = CurrentCharacter.name;
        document.querySelector('.character__description').textContent = CurrentCharacter.description;
        document.querySelector('.character__image').setAttribute('src',CurrentCharacter.imageUrl);
    }
}