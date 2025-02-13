function CallerStreamTranscription() {
  return (
    <div className="msg left-msg">
      <div className="msg-img"></div>

      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">BOT</div>
          <div className="msg-info-time">12:45</div>
        </div>

        <div className="msg-text">
          Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
        </div>
      </div>
    </div>
  );
}

function AdminStreamTranscription() {
  return (
    <div className="msg right-msg">
      <div className="msg-img"></div>

      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">Sajad</div>
          <div className="msg-info-time">12:46</div>
        </div>

        <div className="msg-text">You can change your name in JS section!</div>
      </div>
    </div>
  );
}

export { CallerStreamTranscription, AdminStreamTranscription };
