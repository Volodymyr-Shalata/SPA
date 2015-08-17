
function removeObjProperties(obj,props){
    for(var i =0; i<props.length; i++){
        if(obj.hasOwnProperty(props[i])){
            delete obj[props[i]];
        }
    }
    return obj;
}