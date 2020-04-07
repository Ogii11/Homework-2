
if(document.cookie != ""){
  var ca = decodeURIComponent(document.cookie).split(";")
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf("item") == 0) {
      c = c.substring(5 + i.toString().length, c.length);
    }
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(c));
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode("X"));
    li.appendChild(deleteBtn);
    document.getElementById("items").appendChild(li);
  }
}

var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var signal = false;
// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event
filter.addEventListener("keyup", filterItems);
for (var i = 0; i < document.getElementsByClassName("filter-items").length; i++) {
  document.getElementsByClassName("filter-items")[i].addEventListener('click', textToFilter);
}
// Add item
function addItem(e) {
  e.preventDefault();
  //Get input value
  var newItem = document.getElementById("item").value;
  // Create new li element
  var li = document.createElement("li");
  var fLi = document.createElement("li");
  // Add class
  li.className = "list-group-item";
  fLi.className = "list-group-item filter-items"
  fLi.addEventListener('click', textToFilter);
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));
  fLi.appendChild(document.createTextNode(newItem));
  // Create del button element
  var deleteBtn = document.createElement("button");
  // Add classes to del button
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  // Append text node
  deleteBtn.appendChild(document.createTextNode("X"));
  // Append button to li
  li.appendChild(deleteBtn);
  // Append li to list
  itemList.appendChild(li);
  document.getElementById("f-items").appendChild(fLi);
}

// Remove item
function removeItem(e) {
  var x = Array.prototype.slice.call(itemList.querySelectorAll('li')).indexOf(e.target.parentElement);
  var y = "item"+x;
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
      removeCookie(y);
      resetCookies();
      for(var i = 0; i < itemList.getElementsByTagName("li").length;i++){
        var name = `item${i}`;
        var nValue = itemList.getElementsByTagName("li")[i].textContent.replace(/\sX$|X$/,""); 
        setCookie(name,nValue);
        console.log(name + nValue)
      }
    }
  }
}
// Filter items
function filterItems(e) {
  document.getElementById("f-items").style.display = "block";    
  var fItems = document.getElementById("f-items").getElementsByTagName("li");
  // convert text to lowercase
  if (signal) {
    var text = e.value.toLowerCase();
  } else {
    var text = e.target.value.toLowerCase();
  }
  // Get list items
  var items = itemList.getElementsByTagName("li");
  // Convert HTMLCollection to an array
  Array.from(items).forEach(function(item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  Array.from(fItems).forEach(function(item) {
    var itemName = item.textContent;
    if (text == "") {
      item.style.display = "none";
    } else if (itemName.toLowerCase().indexOf(text) != -1){
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  signal = false;
  if (e.keyCode != 38 && e.keyCode != 40) {
    itemTracker = 0;
    firstDown = true;
  }
}

function textToFilter(e){
  document.getElementById("filter").value = e.target.textContent;
  signal = true;
  filterItems(filter);
  e.target.parentElement.style.display = "none";
}
var itemTracker = 0;
var firstDown = true;

function aler(e,f){
  var allItems = document.querySelectorAll(".filter-items[style=\"display: block;\"]");
  if(e.keyCode == 13){//enter
    var i;
    for (i = 0; i < allItems.length; i++) {
      if (allItems[i].classList.contains("selected-item")) {
        document.getElementById("filter").value = allItems[i].textContent;
      }
    }
  }
  for(var i = 0;i<allItems.length;i++){
    if (allItems[i].classList.contains("selected-item")) {
      allItems[i].classList.remove("selected-item");
    }
  }
  console.log(e.keyCode);
  if (e.keyCode == 40) {//strelica dolje
    if (itemTracker == allItems.length-1) {
      itemTracker = 0;
      allItems[itemTracker].classList.add("selected-item");
    } else if(firstDown){
      allItems[itemTracker].classList.add("selected-item");
      firstDown = false;
    } else {
      itemTracker++;
      allItems[itemTracker].classList.add("selected-item");
    }
  } else if (e.keyCode == 38) {
    if (itemTracker == 0) {
      itemTracker = allItems.length - 1;
      allItems[itemTracker].classList.add("selected-item");
    } else{
      itemTracker--;
      allItems[itemTracker].classList.add("selected-item");
    }
  }
}
window.onbeforeunload = function(){
  for(var i = 0; i < itemList.getElementsByTagName("li").length;i++){
    var name = `item${i}`;
    var nValue = itemList.getElementsByTagName("li")[i].textContent.replace(/\sX$|X$/,""); 
    setCookie(name,nValue);
  }
};

function resetCookies(){
  for(var i = 0;i<100;i++){
    var ime = "item"+i;
    removeCookie(ime);
  }
}

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (7*60*24*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function removeCookie(cname, cvalue="") {
  var d = new Date();
  console.log(cname);
  d.setTime(d.getTime() - (7*60*24*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}