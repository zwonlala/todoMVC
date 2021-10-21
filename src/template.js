import {ItemList} from './item';
import {escapeForHTML} from './helper'

export default class Template {
    
    itemList(items) {
        return items.reduce((a, item) => a + `
<li data-id=${item.id} ${item.completed ? ' class="completed"' : ''}>
    <div class="view">
        <input class="toggle" type="checkbox" ${item.completed ? 'checked' : ''}>
        <label${escapeForHTML(item.title)}</label>
        <button class="destroy"></button>
    </div>
</li>`, '');
    }

    itemCounter(activeTodos) {
        return `${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`; 
    }
}
