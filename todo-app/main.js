import './utils/bling'

//creating two function....

//function one: App function
function app(){
//state
//ui
return mk('form',{id:'form'}, [
    mk('input', {type:'text',id: 'todo', placeholder: 'Enter a Todo'}),
    mk('button', {type: 'submit'}, ['Add Todo'])
])
}

//function two: Rendering Function
function render(){
    document.body.append(app())
}
render()