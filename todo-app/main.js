import './utils/bling'
import './style.css'

//creating two function....

//function one: App function
function app(){
//state
let state = {id: 0, todos: []}
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
        mk('button', {type: 'submit', onclick: add}, ['Add Todo'])
    ])),

    (ui.todos = mk('ul', {id:'todos'}))
]);
//create a Todo Function..
function createTodo(todo){
    let item, text;

    item = mk('li', {className: 'todo-item'}, [
        (text = mk('span', {},[todo.text]))
    ]);
    return item;
}
//adding li items to the ui..
function add(event){

  event.preventDefault();
  const text = ui.input.value;
  //checking if there is a text value from the input..
  if(!text) return
  const todo = {text, completed:false, id: Date.now()};
  //clearing the value of the todo..
  ui.input.value = '';
//saving the copy of your todo items..
  state.todos.push(todo);
  ui?.todos.prepend(createTodo(todo))
}

}// app() closing tag..

//function two: Rendering Function
function render(){
    document.body.prepend(app())
}
render()