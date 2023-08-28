
var Email=document.getElementById("Email");
var password=document.getElementById("password");
var addbtn=document.getElementById("click");
var data=document.getElementById("data");
var deleteall=document.getElementById("deleteall");
var nameAlert=document.getElementById("nameAlert");
var arr;
var currentindex;//بقدر اوصله من اي مكان هون بستخدمه في update عشان احصل علم الاندكس الي بدي اعدل عليه
if(localStorage.getItem("list")==null){//اذا ما كان مدخل اشي 
   arr=[];
}
else{
  arr=JSON.parse(localStorage.getItem("list")) ;//احضار البيانات من اللوكل ستورج وبنخزنهم في اريه
  displaydata();// عشان تظهر البيانات بالجدول اول ما افتح الصفحة حتى بعد اغلاق الصفحة رح تضل محتفظة بالبيانات) 
//JSON.parse : بحول الى array of object
}


addbtn.onclick=function(){
  if(addbtn.innerHTML=='add'){
    add();
  }else{
    update();
    addbtn.innerHTML="add";//عشان لما يكبس على update 
    //يرجع البتن الى add
  }

  displaydata();
  clear();
}

 
function add(){
    //create يحضر البيانات
  var obj= {
    eml:Email.value,
    pass:password.value 
   };
   
   arr.push(obj);  
   localStorage.setItem("list",JSON.stringify(arr));
   
   //localStorage اذا بدي احتفظ بالبيانات حتى بعد ما اغلق الصفحة
   //setItem :بتخزن البيانات في ال localstorge
   //list اي اسم انا بسميه
   //JSON.stringify بتحول الى سترنج
   //getItem:بتحضر البيانات من localstorge
   Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'added successfully',
    showConfirmButton: false,
    timer: 2500
  })
}


function displaydata(){
    //read لطباعة البيانات المدخلة في الجدول
    //i هي id الي بتميز رقم الصف
  var result="";
  for(var i=0;i<arr.length;i++){
result +=`<tr>
<td>${i}</td>
<td>${arr[i].eml}</td>
<td>${arr[i].pass}</td>
<td>
<button onclick="getdatatoupdate(${i})" class="btn btn-outline-info">update</button> 
<button onclick="del(${i})" class="btn btn-outline-danger">delete</button> 
</td>
</tr>`;
}
data.innerHTML=result;
}

function clear(){
/*clear
لازالة البيانات الي بدخلهم من الفورم بعد ما نكبس على سبمت(لتنظيف الفورم) */
Email.value="";
password.value="";
}

//delete
function del(index){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      arr.splice(index,1);//بروح على الاندكس وبحذف عنصر واحد من الاريه
localStorage.setItem("list",JSON.stringify(arr));//لازم كمان لما احذف من الاريف احذف من اللوكل ستورج
displaydata();//لازم نحطها عشان تعرض البيانات بعد الحذف لانه اذا ما حطيناها رح تنحذف البيانات لكن رح تضل ظاهرة بالجدول لانه عرضنا البيانات قبل الحذف فقط فلازم نعرض البيانات بعد الحذف كمان مرة 

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

//delete all
deleteall.onclick=function (){
  localStorage.removeItem('list');//localStorageبحذف كل اشي من ال 
  arr=[];
  data.innerHTML="";//بحذف العناصر من الجدول 
}
//search
function search(e){
  var result="";
  for(var i=0;i<arr.length;i++){
    if(arr[i].eml.toLowerCase().includes(e.toLowerCase())){
    result +=`<tr>
    <td>${i}</td>
    <td>${arr[i].eml}</td>
    <td>${arr[i].pass}</td>
    <td>
    <button  class="btn btn-outline-info">update</button> 
    <button onclick="del(${i})" class="btn btn-outline-danger">delete</button> 
    </td>
    </tr>`;
    }}
    data.innerHTML=result;
}
/*searchطريقة اخرى مختصرة ل 
function search(e){
  let result=arr.filter(function(x){
    return arr.eml.includes(e);
  }
  );
  
    data.innerHTML=result;
}
*/

//start update
function getdatatoupdate(index){//عشان اجيب البيانات الي بدي اعدلهم في الفورم
  var mm=arr[index];// بجيب معلومات الاريه حسب الاندكس
  Email.value=mm.eml;
password.value=mm.pass;
addbtn.innerHTML="update";
currentindex=index;
}

function update(){
  //اخذ الي بدي اعدل عليه من currentindex وعدل عليه
  var obj= {
    eml:Email.value,
    pass:password.value 
   };
   arr[currentindex].eml=obj.eml;
   arr[currentindex].pass=obj.pass;
   localStorage.setItem("list",JSON.stringify(arr));
}
//end update

//name validation
Email.onkeyup = function(){
  var namePattern = /^[A-Z][a-z]{2,8}$/;
  if(namePattern.test(Email.value)){
    addbtn.removeAttribute("disabled");
    Email.classList.add('is-valid');
    Email.classList.remove('is-invalid'); 
    nameAlert.classList.add('d-none');  
    
  } 
  else {
    addbtn.setAttribute("disabled","disabled");
    Email.classList.replace('is-valid','is-invalid');
    nameAlert.classList.add("d-block");
      nameAlert.classList.remove("d-none");
 
  }
}
//end name valid//


