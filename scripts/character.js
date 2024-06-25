export class Character{
    // Define some private Fields
    #name = null;
    #imageUrl= null;
    #description = null;

    /* Generate a new instance */
    static createNewCharacter({name, imageUrl, description}){
        const NewCharacter = new Character();        
        NewCharacter.name = name;
        NewCharacter.imageUrl = imageUrl;
        NewCharacter.description = description;        
        return NewCharacter;
    }

    /* Validate string input */
    static ValidateTextInput(newValue = null, maxLength = null){
        if(
            !newValue ||
            typeof(newValue) !== 'string' ||
            newValue === '' ||
            (maxLength && newValue.length > maxLength)
        )throw new Error('invalid field');
    }

    /* Name */
    set name(newName){        
        Character.ValidateTextInput(newName, 50);
        this.#name=newName;
    }
    
    get name(){
        if(!this.#name)throw new Error('Name is empty');
        return this.#name;
    }

    /* Description */
    set description(newDescription){        
        Character.ValidateTextInput(newDescription, 350)
        this.#description=newDescription;
    }

    get description(){
        if(!this.#description)throw new Error('Description is empty');
        return this.#description;
    }

    /* Image Url */
    set imageUrl(newImageUrl){        
        Character.ValidateTextInput(newImageUrl)
        this.#imageUrl = newImageUrl;
    }

    get imageUrl(){
        if(!this.#imageUrl)throw new Error('Image is empty');
        return this.#imageUrl;
    }
}