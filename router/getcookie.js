
    function setCookie(name,value,hours,path){
        var name= escape(name);
        var value = escape(value);
        var expires = new Date();
        expires.setTime(expires.getTime() + hours*1000*60);
        path = path == "" ? "" : ";path=" + path;
        _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
     
        document.cookie = name + "=" + value + _expires + path;
    }

function getCookie(cookie_name){
   var cookie_name= escape(cookie_name);
var allCookies=document.cookie;
console.log(allCookies)
    var cookie_name = cookie_name+ "=";


var cookies_lens=allCookies.indexOf(cookie_name)

if(cookies_lens!=-1)
{
   
var start=cookies_lens+cookie_name.length;
var end=allCookies.indexOf(";", start);
if(end==-1)
{
    end=allCookies.length
}
var passcookie=unescape(allCookies.substring(start, end));

console.log(passcookie)
return passcookie;
}
else return "";


}



function delCookie(name,path){
    var name=escape(name)
    var expires = new Date(0);
    path = path == "" ? "" : ";path=" + path;
    expires.setTime(exp.getTime()-1);
    var val=getCookie(name);
    if(val!=null)
    document.cookie = name + "="+ ";expires=" + expires.toUTCString()+path; 
}


    $(document).ready(function() {  

var password=getCookie("password")
 var user=getCookie("email")
// 
 if(user != "" && user != null){
    
    console.log(password)
    console.log(user)
    document.getElementById("password").value=password
 }
    else{
        $("#login").click(function(){
           
           if($("input[type='checkbox']").is(':checked'))
            {
                //var email=$("input[name='email']").val();
                var email=$("#email").val()
                //var email=document.getElementById("email").value;
                setCookie("email",email,60,"/reqlogin");
                console.log(getCookie("email"))
                var password=$("#password").val()
                //var password=$("input[name='password']").val();
                setCookie("password",password,60,"/reqlogin");
        
            }
            else{
                delCookie("email","/reqlogin");
                delCookie("password","/reqlogin");
                console.log("no cookie...wuwuwu")
            }
        })

    }

   
 })
    