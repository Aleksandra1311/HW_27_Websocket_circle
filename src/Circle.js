// тут вся работа с сетью,

import $ from 'jquery';

const CONNECTION_URL = 'wss://fep-app.herokuapp.com/';

export default class Circle {
    constructor(config) {
        this.config = config;
    }

    initConnection(name) {
        this.socket = new WebSocket(CONNECTION_URL);

        this.socket.onopen = this.onSocketOpen.bind(this);
        this.socket.onclose = this.onSocketClose.bind(this);
        this.socket.onmessage = this.onSocketMessage.bind(this);
    }

    onSocketOpen() {
           this.add();
    }

    onSocketClose() {
        console.warn('Disconnected');
        this.initConnection();
    }
    onSocketMessage(e) {
        this.config.onMessage && this.config.onMessage(JSON.parse(e.data));
    }

   add() {
        this.socket.send(
            JSON.stringify({
                type: 'add',
                payload: {
                    id: this.config.id,
                    color: $("#color").val(),
                    size:  $("#size").val(),
                    top: 0,
                    left: 0,
                },
            }),
        );
    }
    update({color, size, top, left}) {
        this.socket.send(
            JSON.stringify({
                type: 'update',
                payload: {
                    id: this.config.id,
                    color,
                    size,
                    top,
                    left,
                },
            })
        );
    }
}
