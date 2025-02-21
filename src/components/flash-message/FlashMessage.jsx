import css from "./FlashMessage.module.css";
const FlashMessage = ({ message }) => {
  switch (message.type) {
    case "error":
      return <p className={`${css.msg} ${css.error}`}>{message.msg}</p>;
    case "success":
      return <p className={`${css.msg} ${css.success}`}>{message.msg}</p>;
    default: 
      return null
  }
};

export default FlashMessage;
