var images = [
	"https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
	"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636",
	"https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg",
	"https://www.gannett-cdn.com/presto/2020/03/31/PDTF/c20a2406-360b-4ac6-8a1c-696edf2f8bc3-GettyImages-1172975655.jpg?crop=2137,1203,x0,y0&width=2137&height=1203&format=pjpg&auto=webp",
	"https://res.cloudinary.com/sanitarium/image/fetch/q_auto/https://www.sanitarium.com.au/getmedia%2Fae51f174-984f-4a70-ad3d-3f6b517b6da1%2Ffruits-vegetables-healthy-fats.jpg%3Fwidth%3D1180%26height%3D524%26ext%3D.jpg"
];

var index = 3;

function init_image(){
	//set init image
	set_image_and_src(images[index]);
	//set buttons
	document.getElementById("back_button").onclick  = back_button_press;
	document.getElementById("next_button").onclick  = next_button_press;
}

function set_image_and_src(img_src){
	document.getElementById("display").src = img_src;
	document.getElementById("image_src").href = img_src;
	document.getElementById("image_src").innerHTML = img_src;
}

function check_button(){
	if(index == 0){
		// disable button visual effect
		document.getElementById("back_button").classList.add("disabled");
	}
	else if(index == 4){
		// disable button visual effect
		document.getElementById("next_button").classList.add("disabled");
	}
	else{
		document.getElementById("back_button").classList.remove("disabled");
		document.getElementById("next_button").classList.remove("disabled");
	}
}

function back_button_press(){
	// do nothing when index 0
	if(index == 0){ return; }
	
	index--;
	set_image_and_src(images[index]);
	check_button();
}

function next_button_press(){
	//do noting when index 4
	if(index == 4){return;}

	index++;
	set_image_and_src(images[index]);
	check_button();
}


document.addEventListener("DOMContentLoaded", init_image());