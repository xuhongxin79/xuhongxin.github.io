<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .preview {
            display: flex;
        }

        .remote {
            margin-left: 20px;
        }

        .text_chat {
            display: flex;
        }

        .text_chat textarea {
            width: 350px;
            height: 350px;
        }

        .send {
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div>
        <div>
            <button onclick="start()">连接信令服务器</button>
            <button onclick="leave()" disabled>断开连接</button>
        </div>

        <div class="preview">
            <div>
                <h2>本地:</h2>
                <video id="localvideo" autoplay playsinline></video>
            </div>
            <div class="remote">
                <h2>远端:</h2>
                <video id="remotevideo" autoplay playsinline></video>
            </div>
        </div>
        <!--文本聊天-->
        <h2>聊天:</h2>
        <div class="text_chat">
            <div>
                <textarea id="chat" disabled></textarea>
            </div>
            <div class="remote">
                <textarea id="sendtext" disabled></textarea>
            </div>
        </div>
        <div class="send">
            <button onclick="send()" disabled>发送</button>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
</body>
<script>
    'use strict'

    var localVideo = document.querySelector('video#localvideo');
    var remoteVideo = document.querySelector('video#remotevideo');

    // 文本聊天
    var chat = document.querySelector('textarea#chat');
    var send_txt = document.querySelector('textarea#sendtext');

    var localStream = null;

    var roomid = '44444';
    var socket = null;

    var state = 'init';

    var pc = null;
    var dc = null;

    function sendMessage(roomid, data) {
        socket.emit('message', roomid, data);
    }

    function getAnswer(desc) {
        pc.setLocalDescription(desc);
        // 发送信息
        socket.emit('message', roomid, desc);
    }

    function handleAnswerError(err) {
        console.error('Failed to get Answer!', err);
    }

    //接收远端流通道
    function call() {
        if (state === 'joined_conn') {
            if (pc) {
                var options = {
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                }
                pc.createOffer(options)
                    .then(function (desc) {
                        pc.setLocalDescription(desc);
                        socket.emit('message', roomid, desc);
                    })
                    .catch(function (err) {
                        console.error('Failed to get Offer!', err);
                    });
            }
        }
    }

    //文本对方传过来的数据
    function reveivemsg(e) {
        var msg = e.data;
        console.log('recreived msg is ：' + e.data);
        if (msg) {
            chat.value += '->' + msg + '\r\n';
        } else {
            console.error('recreived msg is null');
        }
    }

    function dataChannelStateChange() {
        var readyState = dc.readyState;
        if (readyState === 'open') {
            send_txt.disabled = false;
            btnSend.disabled = false;
        } else {
            send_txt.disabled = true;
            btnSend.disabled = true;
        }
    }

    function dataChannelError(error) {
        console.log("Data Channel Error:", error);
    }

    function conn() {
        //1 触发socke连接
        socket = io.connect();

        //2 加入房间后的回调
        socket.on('joined', (roomid, id) => {

            state = 'joined';

            createPeerConnection();

            btnConn.disabled = true;
            btnLeave.disabled = false;

            console.log("reveive joined message:state=", state);
        });
        socket.on('otherjoin', (roomid, id) => {

            if (state === 'joined_unbind') {
                createPeerConnection();
            }

            var dataChannelOptions = {
                ordered: true, //保证到达顺序
            };
            //文本聊天
            dc = pc.createDataChannel('dataChannel', dataChannelOptions);
            dc.onmessage = reveivemsg;
            dc.onopen = dataChannelStateChange;
            dc.onclose = dataChannelStateChange;
            dc.onerror = dataChannelError;


            state = 'joined_conn';

            //媒体协商
            call();
            console.log("reveive otherjoin message:state=", state);
        });
        socket.on('full', (roomid, id) => {
            console.log('receive full message ', roomid, id);

            closePeerConnection();
            closeLocalMedia();

            state = 'leaved';

            btnConn.disabled = false;
            btnLeave.disabled = true;
            console.log("reveive full message:state=", state);
            alert("the room is full!");
        });

        socket.on('leaved', (roomid, id) => {

            state = 'leaved';
            socket.disconnect();
            btnConn.disabled = false;
            btnLeave.disabled = true;
            console.log("reveive leaved message:state=", state);
        });

        socket.on('bye', (roomid, id) => {

            state = 'joined_unbind';
            closePeerConnection();
            console.log("reveive bye message:state=", state);
        });
        socket.on('disconnect', (socket) => {
            console.log('receive disconnect message!', roomid);
            if (!(state === 'leaved')) {
                closePeerConnection();
                closeLocalMedia();
            }
            state = 'leaved';

        });
        socket.on('message', (roomid, id, data) => {
            console.log(" message=====>", data);
            //媒体协商
            if (data) {
                if (data.type === 'offer') {
                    pc.setRemoteDescription(new RTCSessionDescription(data));
                    pc.createAnswer()
                        .then(getAnswer)
                        .catch(handleAnswerError);
                } else if (data.type === 'answer') {
                    console.log("reveive client message=====>", data);
                    pc.setRemoteDescription(new RTCSessionDescription(data));
                } else if (data.type === 'candidate') {
                    var candidate = new RTCIceCandidate({
                        sdpMLineIndex: data.label,
                        candidate: data.candidate
                    });
                    pc.addIceCandidate(candidate);

                } else {
                    console.error('the message is invalid!', data)
                }
            }

            console.log("reveive client message", roomid, id, data);
        });

        socket.emit('join', roomid);
        return;
    }

    function start() {
        if (!navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia is not supported!")
            return;
        }

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
            .then(function (stream) {
                localStream = stream;
                localVideo.srcObject = localStream;
                conn();
            })
            .catch(function (err) {
                console.error("getUserMedia  error:", err);
            })
    }

    function leave() {
        if (socket) {
            socket.emit('leave', roomid);
        }

        //释放资源
        closePeerConnection();
        closeLocalMedia();

        btnConn.disabled = false;
        btnLeave.disabled = true;
    }

    //关闭流通道
    function closeLocalMedia() {
        if (localStream && localStream.getTracks()) {
            localStream.getTracks().forEach((track) => {
                track.stop();
            });
        }
        localStream = null;
    }

    //关闭本地媒体流链接
    function closePeerConnection() {
        console.log('close RTCPeerConnection!');
        if (pc) {
            pc.close();
            pc = null;
        }
    }

    //创建本地流媒体链接
    function createPeerConnection() {
        console.log('create RTCPeerConnection!');
        if (!pc) {
            pc = new RTCPeerConnection({
                'iceServers': [{
                    'urls': 'turn:127.0.0.1:8000',
                    'credential': '123456',
                    'username': 'autofelix'
                }]
            });

            pc.onicecandidate = (e) => {
                if (e.candidate) {
                    sendMessage(roomid, {
                        type: 'candidate',
                        label: e.candidate.sdpMLineIndex,
                        id: e.candidate.sdpMid,
                        candidate: e.candidate.candidate
                    });
                }
            }

            //文本聊天
            pc.ondatachannel = e => {
                dc = e.channel;
                dc.onmessage = reveivemsg;
                dc.onopen = dataChannelStateChange;
                dc.onclose = dataChannelStateChange;
                dc.onerror = dataChannelError;
            }

            pc.ontrack = (e) => {
                remoteVideo.srcObject = e.streams[0];
            }
        }

        if (pc === null || pc === undefined) {
            console.error('pc is null or undefined!');
            return;
        }

        if (localStream === null || localStream === undefined) {
            console.error('localStream is null or undefined!');
            return;
        }

        if (localStream) {
            localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream);
            })
        }
    }

    //发送文本
    function send() {
        var data = send_txt.value;
        if (data) {
            dc.send(data);
        }
        send_txt.value = "";
        chat.value += '<-' + data + '\r\n';
    }
</script>

</html>
