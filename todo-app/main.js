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
//programmatically test out the App
function testTodoApp(root){
    // get the current app container
    const app = [].find.call(root.children, (child) => child.id === 'app');
    // get the form, input, add
    const form = app.firstElementChild;
    const input = form.firstElementChild;
    const add = form.lastElementChild;
    // create a loop to create 1000 todos
    for(let eachTodo = 0; eachTodo < 1000; eachTodo++){
         // create input.value
    input.value = `Todo ${eachTodo}`;
    // trigger the change and click event
    input.dispatchEvent(new Event('change'));
    add.dispatchEvent(new Event('click'));
    }
   
    // get all li
    const allTodo = [].slice.call(app.lastElementChild.children);
    // Delete all todos with another loop
    for(eachTodo = 0; eachTodo < 1000; eachTodo ++){
        //get the todo
        const todo = allTodo[eachTodo];
        // update the todo text
        todo.firstElementChild.dispatchEvent(new Event('dbclick'));
        todo.firstElementChild.value += `updated`;
        todo.firstElementChild.dispatchEvent(
            Object.assign(new Event('keydown'), {key: 'Enter'})

        );
        // checking for update...
        if(!/updated/.test(todo.firstElementChild.textContent)){
            throw new Error(`Todo was not updated!`);
        }
        // get the delete button..
        const deleteButton = todo.lastElementChild;
        // triger the click event..
        deleteButton.dispatchEvent(new Event('click'));
    }

}
let time;
document.body.prepend(
    mk('div', {
        style:'position:fixed; bottom: 0; left: 0; background: #333; color: #fff; padding 1rem; display: flex; justify-content: space-between;'
    }, [
    mk('button', {
        onclick(){
            const start = performance.now()
            testTodoApp(document.body)
            const end = performance.now()
            TimeRanges.textContent = `${end - start}ms`
        }

    }, ['Run Test']),
    (time = mk('time', {}, ['0ms']))
    ])
)