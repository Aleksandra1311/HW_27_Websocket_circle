import './style.css';
import $ from 'jquery';
import Circle from './Circle';

const uniqueID = Date.now();

const talk = new Circle({
    onMessage: handleMessage,
    id: uniqueID,
});

const $container = $('#container');
const $colorInput = $('#color');
const $sizeInput = $('#size');

$($container).on('click', onContainerClick);

function onContainerClick(e) {
    const top = e.pageY - 50;
    const left = e.pageX - 50;
    
    sendMessage({top, left});
}

talk.initConnection();

function handleMessage({ payload }) {
    console.log('in handleMessage', payload)
    const element = $(`[id="${payload.id}"]`);
    if (element) {
        element.remove();
    }
    
    const $circle = $('<div></div>');
    $circle.addClass('circle');
    $circle.attr("id", payload.id);
    $circle.css({ top: payload.top, left: payload.left });
    $circle.css('background-color', payload.color);
    $circle.css("width", payload.size);
    $circle.css("height", payload.size);
    $container.append($circle);

}

function sendMessage({top, left}) {
    talk.update({color: $colorInput.val(), size: $sizeInput.val(), top, left});
}
