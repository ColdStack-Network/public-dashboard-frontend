import { compose } from "redux";
declare global {
  interface Console {
    hint: any
  }
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const getArgs = (_args) =>
  [].slice.call(_args)
    .map(v => typeof v === 'object' ? JSON.stringify(v, getCircularReplacer()) : v)
    .join(' ');

const styles = (color, bg) => `color: ${color}; background-color: ${bg}; border-radius: 3px; padding: 2px;`;

const ext = () => {
  Object.defineProperty(
    console,
    'hint',
    {
      enumerable: false,
      configurable: false,
      writable: false,
      value: {
        success: function () {
          console.log(`%c ${getArgs(arguments)}`, styles('#fff', '#34eb8c'));
        },
        error: function () {
          console.log(`%c ${getArgs(arguments)}`, styles('#fff', 'red'));
        },
        warning: function () {
          console.log(`%c ${getArgs(arguments)}`, styles('#333', '#f5e342'));
        },
        info: function () {
          console.log(`%c ${getArgs(arguments)}`, styles('#fff', '#34c9eb'));
        }
      }
    }
  );
}

export default ext;
