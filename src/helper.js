export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

export function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}

export function $delegate(target, selector, type, hadler, capture) {
    const dispatchEvent = (event) => {
        const targetElement = event.target;
        const potentialElements = target.querySelectorAll(selector);
        let i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] == targetElement) {
                hadler.call(targetElement, event);
                break;
            }   
        }
    };

    $on(target, type, dispatchEvent, !!capture);
}

export const escapeForHTML = 
    (s) => s.replace(/[&<]/g, (c) => (c === "&" ? "&amp" : "&lt"));
