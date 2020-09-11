 function onOff(){
        document
            .querySelector("#modal")
            .classList
            .toggle("hide")

        document
            .queryselector("body")
            .classlist
            toggle("hideScroll")
            
        document   
            .queryselector("body")
            .classlist
            toggle("addScroll")
}

function checkFields(event){
    const ValuesToCheck = [
        "image",
        "title",
        "category",
        "description",
        "link"
    ]

    const isEmpty = ValuesToCheck.find(function(value){

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()
        
        if(checkIfIsString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }
}
