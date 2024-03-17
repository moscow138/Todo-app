import './utils/bling'
import './style.css'

//creating two function....

//function one: App function
function app(){
//state

//ui
let ui = {
    input:$('input'),
    form:$('form')
}

console.log(ui)

return mk('div', {id:'app'}, [
        
        mk('h1',null, ['Todo App: John Ogheneochuko Version']),
        (ui.form = mk('form',{id:'form'}, [
        (ui.input = mk('input', {className:'todo', type:'text',id: 'todo', placeholder: 'Enter a Todo'})),
        mk('button', {type: 'submit'}, ['Add Todo'])
    ])),

    mk('ul', {id:'todos'})
]);
//create a Todo Function..
function createTodo(todo){
    let item;

    item = mk('li', {className: 'todo-item'}, [
        mk('span', {},[todo.text])
    ]);
    return item;
}
createTodo({text: 'buy milk'})
}// app() closing tag..

//function two: Rendering Function
function render(){
    document.body.prepend(app())
}
render()