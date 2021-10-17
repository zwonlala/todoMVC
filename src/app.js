import Controller from "./controller";
import { $on } from "./helpers";
import Template from "./template";
import Store from "./store";
import View from "./view";

const store = new Store("todos-vanila-es6");

const template = new Template();
const view = new View(template);

const controller = new Controller(store, view);

const setView = () => controller.setView(document.location.hash);
$on(window, "load", setView);
$on(window, "hashchange", setView);

/**
 * 궁금한 거
 *
 * 1. Store 라는 개념은 리액트에서도 사용하는 것 같았는데, 동일한 개념인가? 비슷한 개념인건가 아님 다른건가?
 * 2. $on 부분 보면 $ 사용하는것은 jquery로 알고있는데, 맞는 것인지 helpers.js 한번 봐보기
 * 3. Template 이라는게 있다. MVC 모델이라고 생각하면 Model, View, Controller만 있는 줄 알았는데,
 *    Template 이라는 애가 하는 것을 뭘까? 단순한 View를 미리 만들어놓은 템플릿인 것인가?
 *    위 코드를 보니, template을 생성한 후에 View의 생성자에 파라미터로 넣어주는데 이걸 보니 View와 연관된 일을 하는 것 같다
 * 4. document.location은 전에 url 관련된 처리를 했을때 봤던 것 같은데 hash 속성은 무엇인가?
 *    document.location 과 hash 속성에 대해 알아보기
 * 5. setView 라는 화살표 함수를 보면, 입력을 받지 않고 그냥 controller의 setView에 document.location.hash를 입력한다. 뭘까?
 *
 */
