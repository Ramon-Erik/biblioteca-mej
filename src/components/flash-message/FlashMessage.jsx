const FlashMessage = ({ message }) => {
  switch (message.type) {
    case "error":
      return <p className="msg error">{message.msg}</p>;
    case "success":
      return <p className="msg success">{message.msg}</p>;
    default: 
      return nulll
  }
};

export default FlashMessage;
