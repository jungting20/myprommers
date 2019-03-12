/* let obj = [{'id':1,'name':2},{'id':1,'name':2},{'id':1,'name':2}]
const last = args => args[args.length-1];
last(obj)['name'] = 3; */


let str = 'input+span+span+input';
let range = num => Array.from(new Array(+num),(_,i) => i);

const changeplusstr = str => str.replace(/\w+\*\d+/g,function(match,p1,p2){
    let [tagname,num]  = match.split('*');
    return range(num).map(a => tagname).join('+');
 });




 let str2 = 'divasdasd(id=hi,class=hihi,um=asd)';

 console.log(/(?<=\().+(?=\))/.exec(str2)[0])



 const debounce = (f,time) => {
    var timer;
    return function(...args){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            f(...args);
        },time)
    }
 }



 const onlyone = f => {
    let isexcute = false;
    return function(...args){
        if(!isexcute){
            isexcute = true;
            return f(...args);
        }
    }
}


const log = a => console.log(a);

const onlyonelog = onlyone(log);

onlyonelog(45);
onlyonelog(50);