import './style.css';

import $ from 'jquery';
import Chat from './Chat';

// const $myCircle = {
//     id:  Date.now(),
//     size: $sizeInput.val() ? parseInt($sizeInput.val()) : 50,
//     color: $colorInput.val() ? $colorInput.val() : "red",
//     top: 100,
//     left: 50
// }

const talk = new Chat({ //talk это обьект который отвечает за
    onMessage: addLog, //в talk  мы передали config , когда  приходит новое смс выз мотод onMessage в котором есть ф-я addLog и она вызывается
    // onUpdate: updateCircle,
});

const $container = $('#container'); //полностью весь контейнер
const $colorInput = $('#color'); //messageInput
const $sizeInput = $('#size'); // authorInput имя пользователя который отправл смс

$($container).on('click', onBodyClick);

function onBodyClick(e) {
    $('.circle').css({
        top: (e.pageY - 25) + 'px',
        left: (e.pageX - 25) + 'px'
    });
    
    sendMessage();
}

talk.initConnection();

function addLog({ payload }) { //payload это обьект который хранит в себе username и massage
    // const $container = $(`<div>${payload.color} ${payload.message}</div>`); // сощдали ДОМ елемент в дереве
    // $log.append($container); //поместили его в контейнер для общего чата
    // $log.addClass('circle'); // класс для стилизации
    // // setTimeout(() => { //возвели в setTimeout для только что бы выполнилась асинхронно, она попадает в web API , для анимации, плавное появления которое мы стилизовали в css
    // // });
    
    const $circle = $('<div></div>');
    $circle.addClass('circle');
    $circle.attr("id", payload.id);
    $circle.css("height", payload.size);
    $circle.css("width", payload.size);
    $circle.css('background-color', payload.color);
    $circle.css({ top: payload.top, left: payload.left });
    $container.append($circle);

}


// function updateCircle({ payload }) {
//      let $circle = $(`#${payload.id}`);
//   $circle.css(`left`, payload.left - parseInt(payload.size) / 2);
//   $circle.css(`top`, payload.top - parseInt(payload.size) / 2);
//   $circle.css(`background`, payload.color);
//   $circle.css(`height`, payload.size);
//   $circle.css(`width`, payload.size);
// }

function sendMessage() { //
    talk.send($colorInput.val(), $sizeInput.val()); //send это ф-я, а не метод websocket, первым передаем имя, потом смс 
    // $messageInput.val(''); //затем обнуляем строку для ввода смс
}











// import './style.css';

// import $ from 'jquery';
// import Chat from './Chat';

// const talk = new Chat({ //talk это обьект который отвечает за
//     onMessage: addLog, //в talk  мы передали config , когда  приходит новое смс выз мотод onMessage в котором есть ф-я addLog и она вызывается
// });

// const $log = $('#log'); //полностью весь контейнер
// const $messageInput = $('#message');
// const $authorInput = $('#author'); // имя пользователя который отправл смс

// $('#chatForm').on('submit', (e) => { //chatForm вся форма
//     e.preventDefault();
//     sendMessage(); // когда кликрули по форме формируется отправка смс
// });

// talk.initConnection();

// function addLog({ payload }) { //payload это обьект который хранит в себе username и massage
//     const $message = $(`<div>${payload.username}: ${payload.message}</div>`); // сощдали ДОМ елемент в дереве
//     $log.append($message); //поместили его в контейнер для общего чата
//     setTimeout(() => { //возвели в setTimeout для только что бы выполнилась асинхронно, она попадает в web API , для анимации, плавное появления которое мы стилизовали в css
//         $message.addClass('message'); // класс для стилизации
//     });
// }

// function sendMessage() { //
//     talk.send($authorInput.val(), $messageInput.val()); //send это ф-я, а не метод websocket, первым передаем имя, потом смс 
//     $messageInput.val(''); //затем обнуляем строку для ввода смс
// }