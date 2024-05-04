const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

document.body.onload = () => {

    window.scrollTo(0, document.body.scrollHeight);
    
    let app = new App();

    let clickHandler = () => {
        app.start();
        startBtn.removeEventListener('click' , clickHandler);
        startBtn.classList.toggle('hidden');
        restartBtn.classList.toggle('hidden');

        // if(app.isGameOver) {
        //     startBtn.addEventListener('click' , clickHandler); 
        // }
        
    } 

    let restartClickHandler = (e) => {
        e.target.blur();
        e.preventDefault();
        e.stopPropagation();
        // restartBtn.removeEventListener('click' , restartClickHandler);
        app.restart();
        // restartBtn.removeEventListener('click' , restartClickHandler);
        // restartBtn.classList.toggle('hidden');
        // startBtn.classList.toggle('hidden');

        // if(app.isGameOver) {
        //     startBtn.addEventListener('click' , clickHandler); 
        // }
        
    }

    restartBtn.addEventListener('click' , restartClickHandler); 
    startBtn.addEventListener('click' , clickHandler); 

}