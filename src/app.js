import './style.css';
import $ from 'jquery';
import Chat from './Chat';

const uniqueID = Date.now();

const talk = new Chat({
    onMessage: handleMessage,
    id: uniqueID,
});

const $container = $('#container');
const $colorInput = $('#color');
const $sizeInput = $('#size');

$($container).on('click', onBodyClick);

function onBodyClick(e) {
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
    $circle.css("height", payload.size);
    $circle.css("width", payload.size);
    $circle.css('background-color', payload.color);
    $circle.css({ top: payload.top, left: payload.left });
    $container.append($circle);

}

function sendMessage({top, left}) {
    talk.update({color: $colorInput.val(), size: $sizeInput.val(), top, left});
}
