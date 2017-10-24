var arr = ['arr','obj','function'];
for(var i=0;i<arr.length;i++){
	console.log(arr[i]);
};
var obj = {
	name:'小明',
	age: 18
}
for (var key in obj ){
	console.log(key,obj[key]);
}