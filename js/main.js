function timestamp() { 
  var response = document.getElementById("g-recaptcha-response"); 
  if (response == null || response.value.trim() == "") {
    var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
    elems["ts"] = JSON.stringify(new Date().getTime());
    document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems); 
  } 
} 
setInterval(timestamp, 500); 



/*---------------------RECAPTCHA-----------------------------*/
function scaleCaptcha(elementWidth) {
  var reCaptchaWidth = 304;
	var containerWidth = jQuery('.myform').width();
  if(reCaptchaWidth > containerWidth) {
    var captchaScale = containerWidth / reCaptchaWidth;
    jQuery('.g-recaptcha').css({
      'transform':'scale('+captchaScale+')'
    });
  }
}

jQuery(function() { 
  scaleCaptcha();
  jQuery(window).resize(jQuery.throttle(100, scaleCaptcha) );
});


//for trottle
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

function recaptcha_callback() {
                jQuery( "#btn" ).removeAttr('disabled');
	
		
};    
/*--------------------------PHONE--------------------------------*/

var input = document.querySelector("#phone"),
errorMsg = document.querySelector("#error-msg"),
validMsg = document.querySelector("#valid-msg");

var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

let regex = /[A-Za-zА-Яа-яЁё]/g; 

var input = document.querySelector("#phone");

const phoneInput = window.intlTelInput(input, {
  preferredCountries: ["by", "ru", "cn"],
  utilsScript: "utils.js.js" 
});

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};


input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (phoneInput.isValidNumber()) {
      validMsg.classList.remove("hide");
      document.getElementById("btn").disabled = false; 
    } else {
      input.classList.add("error");
      var errorCode = phoneInput.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
      document.getElementById("btn").disabled = true; 
    }
  }
});

input.addEventListener('change', reset);
input.addEventListener('keyup', reset);


input.oninput = function(){
  this.value = this.value.replace(regex, '');
}

const info = document.querySelector(".alert-info");

function process(event) {
 event.preventDefault();

 const phoneNumber = phoneInput.getNumber();

 info.style.display = "";
 info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
}



