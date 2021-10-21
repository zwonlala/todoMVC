export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

export function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}

export function $delegate(target, selector, type, handler, capture) {
    const dispatchEvent = (event) => {
        const targetElement = event.target;
        const potentialElements = target.querySelectorAll(selector);
        let i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] == targetElement) {
                handler.call(targetElement, event);
                break;
            }   
        }
    };

    $on(target, type, dispatchEvent, !!capture);
}

export const escapeForHTML = 
    (s) => s.replace(/[&<]/g, (c) => (c === "&" ? "&amp" : "&lt"));

/**
 * 궁금한 거
 *
 * 1. qs() 함수에서 "(scope || document).querySelector" 이렇게 코드가 작성되어 있는데, scope에서 querySelctor 함수를 실행하는 이유가 뭘까..?
 * 2. $on() 함수를 보니 그냥 target에 addEventListener() 해주는 코드인데 굳이 $on을 해야하는 이유가 무엇인지. 다 치고나서 addEventListener() 함수 사용하는 구조로 바꿔보자~
 * 3. delegate() 함수에서 delegate라는 의미가 무엇일까? 
 *    함수 내용을 보면, target의 child element 중에서 selector에 해당하는 요소들을 찾은 후에 ~~하는데 어떤 의미인지 잘 모르겠다 
 * 4. escapeForHTML 함수는
 *    우선 문자열 s를 입력받아서, 정규표현식 /[&<]/g 즉 '&'나 '<'를 찾은 후에 두번째 파라미터인 화살표 함수를 실행시켜 치환함
 *    두번때 파라미터인 화살표 함수는 문자열 c를 입력받아서 c가 만약 "&" 이면 "&amp"를 리턴하고, 아니라면 "&lt"를 리턴하는 함수
 *    이 예제를 통해 String.prototype.replace() 함수의 두번째 파라미터로 function을 사용할 수 있음을 깨달음
 *
 */