
// Buttons in array to insert with forEach loop!
let calculator_buttons = [
    {
        name : "delete",
        symbol : "↚",
        formula : false,
        type : "key"
    },{
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },,{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        
        name : "open-bracket",
        symbol : "(",
        formula : "(",
        type : "operator"
    },{
         name : "close-bracket",
         symbol : ")",
         formula : ")",
         type : "operator"  
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
];

// Select the Elements with querySelector to change the content later
const input_element=document.querySelector('.input');
const output_operation=document.querySelector('.operation .value')
const output_result=document.querySelector('.result .value')

// Creation of Buttons
function createButtons(){
    const buttons_per_row=4;
    let added_buttons=0;

    calculator_buttons.forEach(button=>{
        if(added_buttons % buttons_per_row == 0){
            input_element.innerHTML=input_element.innerHTML+`<div class="row"> </div>`;
        }

        const row= document.querySelector(".row:last-child");

        row.innerHTML+=`<button id="${button.name}"> ${button.symbol} </button>`

        added_buttons++;
    })
}
createButtons();

// Finding Target Button
// Event listener to whole input element to avoid giving eventlistener to each button!!
input_element.addEventListener("click", event=>{

    // target button has the complete button info
   const target_button= event.target;

   calculator_buttons.forEach(button=>{
    //    Comparing every button name with target button id
       if(button.name===target_button.id) 
       calculator(button)
   })

})

let data={
    operation:[],
    result:[]
}

// Calculator function 
function calculator(button){

    if(button.type=="number"){
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }
    else if(button.type=="operator"){
        data.operation.push(button.symbol);
        data.result.push(button.formula);
        
    }
    else if(button.type=="key"){
        if(button.name=="clear"){
            data.operation=[];
            data.result=[];
            updateOutputResult(0);
           
        }else if(button.name=="delete"){
            data.operation.pop()
            data.result.pop()
        }
    }
    else if(button.type=="calculate"){
        let join_result=data.result.join('')


        let result;

        // Syntax Errors Handling!!
        try{
            result= eval(join_result)
        }catch(error){
            if(error instanceof SyntaxError){
                // output_result.innerHTML="Syntax Error!"
                // return;

                result="Syntax Error!";
                updateOutputResult(result);
                return;
            }
        }

        updateOutputResult(result);


        // Format the result
        result=formatResult(result)

        // Clear old elements to push new result for later use!
        data.result=[];
        data.operation=[];

        // push the new result to perform more operations on this result!!
        data.operation.push(result)
        data.result.push(result)

        updateOutputResult(result)
        // to avoid updating output operation value with the result value-- return them!!!
        // since return is used...if calculate button is pressed the 'updateOutputOperation()' 
        // wont be called!!!
        return;
    }
    
    updateOutputOperation( data.operation.join('') )
}

function updateOutputOperation(join_operation){
    output_operation.innerHTML=join_operation;
}
function updateOutputResult(join_result){
    output_result.innerHTML=join_result;
}


// How many digits to display on the screen
const max_output_digits=10;
const output_precision=5;

function formatResult(result){

    if(getCount(result) > max_output_digits){
        if(isFloat(result)){
            const result_int= parseInt(result)
            const result_int_length= getCount(result_int)

            if(result_int_length> max_output_digits){
                return result.toPrecision(output_precision)
            }else{
                let num_after_decimal= max_output_digits-result_int_length
                return result.toFixed(num_after_decimal)
            }
        }else{
            return result.toPrecision(output_precision);
        }
    }else{
        return result;
    }

}

function isFloat(result){
    return result % 1!=0;
}

function getCount(result){
    return result.toString().length;
}