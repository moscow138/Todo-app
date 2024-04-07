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
    let item, text, x;
    // create Remove () => {}
    const del = () => {
        state.todos.filter((t) => t.id !== todo.id)
        item.remove();

    }
    // Create An Edit function...
    function edit(){
        // event to submit and escape (Blur) out of the input..
        function onKeyDown(event){
            switch(event.key){
                case 'Enter' : {
                  text.textContent = todo.text = editInput.value;
                  editInput.replaceWith(text);
                    break;
                }
                case 'Escape' : {
                    editInput.blur();
                    break;
                }
               
                default:
                    break;
            }

        }
        // cancel the Edit function..
        const cancel = () => (x.disabled = editInput.replaceWith(text));

        //create an edit input with mk() => {}
       let editInput = mk('input', {style:'flex: 1;'}, { value: todo.text, onkeydown: onKeyDown, onblur: cancel })
       // Replace the li with the input text..
       text.replaceWith(editInput);
       // Focus on The input..
       editInput.focus();
       // Making sure user can't delete during editing proccess...
       x.disabled = true;
       x.style = 'cursor: not-allowed;point-event: none'

    }

    item = mk('li', {className: 'todo-item'}, [
        (text = mk('span', { ondblclick: edit },[todo.text])),
       (x = mk('button', {onclick: del}, ['x']))
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