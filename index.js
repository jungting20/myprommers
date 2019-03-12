const head = ([arg,...args]) => arg;//배열 첫번쨰값
const tail = ([arg,...args]) => args;//첫번째를 제외한 나머지
const setvalue = element => ([attrname,attrvalue]) => element[attrname] = attrvalue;//속성에 값 세팅

/*
정규식매칭되는 문자열 뽑아줌 없으면 들어온애 그대로
*/
const getmatchstr = (re,str) => re.exec(str) ? re.exec(str)[0] : str;


/*
속성값 적용 후 htmlelement return;
*/
const makeelement = elname => {
    let attrs = getmatchstr(/(?<=\().+(?=\))/,elname).split(",").map(a => a.split("="));
    let element = document.createElement(getmatchstr(/\w+(?=\()/,elname));
    attrs.forEach(setvalue(element));
    return element;
}


/*
[0,1,2,3,4....]
*/
const range = num => Array.from(new Array(+num),(_,i) => i);

/*
depthel 사용 편의를 위해 input*3 이런식의 태그를 -> input+input+input의 문자열로 변경해줌
 */
const changeplusstr = str => str.replace(/\w+\*\d+/g,function(match,p1,p2){
    let [tagname,num]  = match.split('*');
    return range(num).map(a => tagname).join('+');
});


/*
인자형식(div(id=1),form(method=post),input(id=1,type=text))
 -> div(id=1) > form(method=post) > input(id=1,type=text) 형식의 array로 return
return [htmlelement,htmlelement,htmlelement]
*/
function depthel(...els){
    let elements =changeplusstr(head(els)).split('+').map(makeelement);//div+div+div-> [div:htmlelement,div:htmlelement,htmlelement...]
    let lastel =elements[elements.length - 1];//마지막 요소
    if(els.length == 1){
        return elements;
    }
    let childen = depthel(...tail(els));
    childen.forEach(element => {
        lastel.appendChild(element);
    });
    return elements;
}


/*
키업 입력시 디바운싱 적용
*/
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


/*
한번만 실행하게 하는 함수를 만드는 함수
*/
const onlyone = f => {
    var isexcute = false;
    return function(...args){
        if(!isexcute){
            isexcute = true;
            return f(...args);
        }
    }
}

const log = e => console.log(e.target);
const getelid = str => document.getElementById(str);
const appendbody = el => document.body.append(el);
const addcheckboxonlyone = onlyone(
    debounce(e => {
    getelid('form').append(depthel('div(id=checkbox)','input(type=checkbox)+span(innerText=개인정보보호방침에 동의합니다)')[0]);
},500));
/*
onlyone,debounce 적용
1.500ms에 한번 실행 (debounce)
2.이메일 이나 전화번호 입력시 checkbox 추가해야하는데 한번만 실행하면 되므로 onlyone 으로 한번만 실행되게 함수 생성(onlyone)
*/




(function(){
    let els = depthel(
        'div(id=container)',
        'form(method=post,action=#,id=form)',
        `
        span(innerText=이름)+input(id=name,type=text)+
        span(innerText=전화번호)+input(id=tel,type=text)+
        span(innerText=이메일)+input(id=email,type=email)+
        span(innerText=자기소개)+input(id=description,type=text)
        `
        );//div>form>span+input+span+input+span+input+span+input
        els.forEach(appendbody);
        const container = getelid('container');
        const tel = getelid('tel');
        const email = getelid('email');
        tel.onkeyup = addcheckboxonlyone;
        email.onkeyup = addcheckboxonlyone;
    })();
    
    
    
    
    
    
    
    