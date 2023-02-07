import { compose } from "redux";
declare global {
  interface Console {
    hint: any;
  }
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const ext = () => {
  Object.defineProperty(console, "hint", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: {
      success: function () {},
      error: function () {},
      warning: function () {},
      info: function () {},
    },
  });
};

export default ext;
