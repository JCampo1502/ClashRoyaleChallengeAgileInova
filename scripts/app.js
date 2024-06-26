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
    }
    
    start(){
        this.updateView();
        
        /* Start behaviors */
        this.#paginationAction();
        this.#formActions();
        
    }
    #formActions(){        
        const CreationContainer = document.querySelector('.main__article--creator');
        const OpenFormBtn = document.querySelector('.character__btn--create');
        const CloseFormBtn = document.querySelector('.form__action--close');

        //Open Modal 
        OpenFormBtn.addEventListener('click', ()=>{
            CreationContainer.classList.add('main__article--open')
        })
        CloseFormBtn.addEventListener('click', ()=>{
            CreationContainer.classList.remove('main__article--open')
            document.querySelector('.character__image--creator')
            .setAttribute('src','./assets/default.png');        
        })

        //switch image
        document.getElementById('image').addEventListener(
            'change',this.#updatePreviewImage.bind(this));

        //Add character
        document.getElementById('characterCreator').addEventListener(
            'submit', this.#createNewCharacter.bind(this))
    }

    #getPreviewImageUrl(file){
        const Render = new FileReader();
        if(
            !file || 
            (
                file.type !== 'image/jpeg' &&  
                file.type !== 'image/png' && 
                file.type !== 'image/jpg'
            )
        )throw new Error('invalid image format');
        Render.readAsDataURL(file);
        return new Promise((res, rej)=>{
            Render.onload = ()=>res(Render.result);
            Render.onerror = rej;
        })
    }

    async #updatePreviewImage(e){        
        const File =e?.target?.files[0];
        const ImagePreview = document.querySelector('.character__image--creator');
        const ImageUrl = await this.#getPreviewImageUrl(File);
        ImagePreview.setAttribute('src',ImageUrl);
    }

    async #createNewCharacter(e){
        const Form = document.getElementById('characterCreator');
        const ImageFile = Form.image.files[0];
        const Name = Form.name.value;
        const Description = Form.description.value;
        const NewCharacter = new Character();

        e.preventDefault();

        /* Start some validations */
        if(
            !Form || 
            !Name || 
            !Description || 
            !ImageFile || 
            Name === ''|| 
            Description == ''
        )return;

        /* Set Character Parameters */
        NewCharacter.name = Name;
        NewCharacter.description = Description;
        NewCharacter.imageUrl = await this.#getPreviewImageUrl(ImageFile);        
        this.#characters.addNewCharacter(NewCharacter);

        /* Clean up */
        /* Reset from */
        Form.reset();        
        document.querySelector('.character__image--creator')
            .setAttribute('src','./assets/default.png');
        /* close form */
        document.querySelector('.main__article--creator')
            .classList.remove('main__article--open');
        /* set new character */
        document.querySelector('.character__btn--next')
            .classList.add('character__btn--disabled');
        this.updateView();
    }
    
    #paginationAction(){
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