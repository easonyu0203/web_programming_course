//counter of todo item
var todo_item_id = 0;
//all toodo item
var todo_items = []; //{todo_item: item, id: todo_item_id ,isDone: false}
//unDone
var unDone_cnt = 0;

//input event handle
document.getElementById("todo_input").addEventListener("keyup", (e) =>{
	//check condition
	if(e.key === "Enter" && e.target.value !== ""){
		//add todo item
		add_todo_item(e.target.value);
		//clear input bar
		e.target.value = "";
	}
})

//buttons event handle
all_bnt = document.getElementById("All_bnt");
active_bnt = document.getElementById("Active_bnt");
completed_bnt = document.getElementById("Completed_bnt");
clean_bnt = document.getElementById("Clean_bnt");
buttons = document.querySelectorAll("ul.todo-app__view-buttons > button");

all_bnt.addEventListener("click", ()=>{
	//visual select
	visual_bnt_select(all_bnt);
	//items list display all
	set_all_display();
});

active_bnt.addEventListener("click",()=>{
	set_all_display();
	//visual select
	visual_bnt_select(active_bnt);
	//items list display active
	done_item_list = todo_items.filter((obj)=>{ return obj.isDone === true;});
	for(let i = 0; i < done_item_list.length; i++){
		done_item_list[i].todo_item.classList.add("not_display");
	}
});

completed_bnt.addEventListener("click", ()=>{
	set_all_display();
	//visual select
	visual_bnt_select(completed_bnt);
	//items list display completed
	undone_item_list = todo_items.filter((obj)=>{ return obj.isDone === false;});
	for(let i = 0; i < undone_item_list.length; i++){
		undone_item_list[i].todo_item.classList.add("not_display");
	}
})

clean_bnt.addEventListener("click", delete_done_items);

function set_all_display(){
	for(let i = 0; i < todo_items.length; i++){
		todo_items[i].todo_item.classList.remove("not_display");
	}
}

function visual_bnt_select(bnt_obj){
	for(let i = 0; i < buttons.length; i++){
		buttons[i].classList.remove("select");
	}
	bnt_obj.classList.add("select");
}

function add_todo_item(str){
	// create todo item (li object)
	//todo item
	var item = document.createElement("li"); item.setAttribute("class", "todo-app__item");

	//check box
	var check_box = document.createElement("div"); check_box.setAttribute("class", "todo-app__checkbox");
	var input_check_box = document.createElement("input"); input_check_box.setAttribute("type", "checkbox"); input_check_box.setAttribute("id", todo_item_id);
	  //set checkbox event handler
	  input_check_box.addEventListener("click", todo_item_click);
	var label_check_box = document.createElement("label"); label_check_box.setAttribute("for", todo_item_id);
	check_box.appendChild(input_check_box); check_box.appendChild(label_check_box);
	//detail
	var detail = document.createElement("h1"); detail.setAttribute("class", "todo-app__item-detail");
	var text = document.createTextNode(str);
	detail.appendChild(text);
	//x
	var x = document.createElement("img"); x.setAttribute("src", "./img/x.png" ); x.setAttribute("class", "todo-app__item-x"); x.setAttribute("id", "x_" + todo_item_id);
	  //set x event handler
	  x.addEventListener("click", delet_item);
	item.appendChild(check_box); item.appendChild(detail); item.appendChild(x);

	//add to ul
	document.getElementById("todo-app__list").appendChild(item);
	//add to todo_items
	todo_items.push({todo_item: item, id: todo_item_id ,isDone: false});
	//increment todo_item_id after add todo_item
	todo_item_id++;
	//update unDone count
	unDone_cnt++;
	update_unDone_cnt();
}

function update_unDone_cnt(){
	document.getElementById("todo-app__total").innerHTML = unDone_cnt +  " left";
}

function todo_item_click(e){
	let item_obj = items_getObjById(e.target.id);
	if(e.target.checked === true){
		done_todo_item(item_obj);
	}
	else{
		un_done_todo_item(item_obj);
	}

}

function items_getObjById(id){
	for(let i = 0; i < todo_items.length; i++){
		if(id ==  todo_items[i].id){
			return todo_items[i];
		}
	}
}

function done_todo_item(item_obj){
	//visual
	item_obj.todo_item.style["textDecoration"] = "line-through";
	item_obj.todo_item.style["opacity"]= 0.5;

	//data maintain
	item_obj.isDone = true;
	unDone_cnt--;
	update_unDone_cnt();
}

function un_done_todo_item(item_obj){
	//visual
	item_obj.todo_item.style["textDecoration"] = "none";
	item_obj.todo_item.style["opacity"]= 1;

	//data maintain
	item_obj.isDone = false;
	unDone_cnt++;
	update_unDone_cnt();
}

function delet_item(e){
	let item_obj = items_getObjById(e.target.id.slice(2));
	//visual
	item_obj.todo_item.remove();

	//data maintain
	//unDone count
	if(item_obj.isDone == false){
			unDone_cnt--;
		update_unDone_cnt();
	}

	//item list
	let index = 0; //get index
	for(;index < todo_items.length; index++){
		if(todo_items[index].id == item_obj.id){break;}
	}
	todo_items.splice(index, 1);

}

function delete_done_items(){

	done_item_list = todo_items.filter((obj)=>{ return obj.isDone === true;});
	undone_item_list = todo_items.filter((obj)=>{ return obj.isDone === false;});


	//visual
	for(let i = 0; i < done_item_list.length; i++){
		done_item_list[i].todo_item.remove();
	}

	//data maintain
	todo_items = undone_item_list;
}