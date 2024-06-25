import { App } from "./app.js"


document.addEventListener('DOMContentLoaded',async ()=>{        
    try {
        /* set storage */
        if(!localStorage.getItem('characters')){
            const Data = await (await fetch('scripts/data.json')).json();
            localStorage.setItem('characters', JSON.stringify(Data))
        }

        /* Run App */
        const Application = new App();
        Application.setup();
        Application.start();

    } catch (error) {
        /* Show Error */
        console.error(error);
        alert('Ups! ha ocurrido un error');
    }
})

