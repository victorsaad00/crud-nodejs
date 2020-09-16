(function readyJS(win, doc) {
    if(doc.querySelectorAll('.delete')){
        //console.log(doc.querySelectorAll('.delete'));
        for(let i = 0; i < doc.querySelectorAll('.delete').length; i++){
            doc.querySelectorAll('.delete')[i].addEventListener('click', function(event){
                if(confirm('Do you really want to delete this?')){
                    return true;
                } else {
                    event.preventDefault();
                }
            });
        }
    }
})(window, document)