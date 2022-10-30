var jncc = {};

function OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
        xml += "<" + prop + ">";
        if(obj[prop] instanceof Array) {
            for (var array in obj[prop]) {
                xml += OBJtoXML(new Object(obj[prop][array]));
            }
        } else if (typeof obj[prop] == "object") {
            xml += OBJtoXML(new Object(obj[prop]));
        } else {
            xml += obj[prop];
        }
        xml += "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g,'');
    return xml
}
function json2xml(input){
	return eval("OBJtoXML("+input+");")
}
jncc.document = function(json, el){
	if(el == "body"){
		document.body.innerHTML = json2xml(json);
	}
	else if(el == "html"){
		document.body.outerHTML = json2xml(json);
	}
	else{
		document.getElementById(el).innerHTML = json2xml(json);
	}
}