type EtherAddress = string | null;
type EtherObject = { selectedAddress: EtherAddress };
enum ObserverEvent {
  addressChange = "addressChange",
}
type Listener = {
  (x: EtherAddress): void;
};

type ListenerObject = {
  pureEvent: (this: Window, ev: Event) => void;
  originEvent: Listener;
};

class ObserverEtherAddress {
  private prevValue: EtherAddress = null;
  private etherObject: EtherObject;
  private listeners: Array<ListenerObject> = [];
  private wasInited = false;

  constructor() {
    const etherObject = window.ethereum as EtherObject;
    this.etherObject = etherObject;
    this.prevValue = etherObject?.selectedAddress || null;
  }

  init() {
    if (this.wasInited) {
      throw new Error("ObserverEtherAddress class can be inited once, to prevent usefull waste memory");
    }
    this.wasInited = true;
    setInterval(() => {
      const { etherObject, prevValue } = this;
      const address = etherObject?.selectedAddress || null;

      if (address !== prevValue) {
        this.set(address);
        this.emit(address);
      }
    }, 500);
  }

  private emit(x: EtherAddress) {
    let event = new CustomEvent(ObserverEvent.addressChange, {
      detail: { address: x },
    });
    window.dispatchEvent(event);
  }

  subscribe(callback: Listener): void {
    const originEvent = (ev: Event) => {
      const ev2 = (ev as any).detail.address as string;
      callback(ev2);
    };
    this.listeners.push({ pureEvent: originEvent, originEvent: callback });
    window.addEventListener(ObserverEvent.addressChange, originEvent);
  }

  unSubscribe(callback: Listener): void {
    const idx = this.listeners.findIndex((el) => el.originEvent === callback);
    if (idx === -1) return;
    const cb = this.listeners[idx];
    window.removeEventListener(ObserverEvent.addressChange, cb.pureEvent);
    this.listeners = this.listeners.filter((_, i) => i !== idx);
  }

  get(): EtherAddress {
    return this.prevValue;
  }

  private set(x: EtherAddress) {
    this.prevValue = x;
  }

  public isMetamakUnlocked(): Promise<boolean> {
    if (!this.etherObject) return Promise.resolve(false);
    return window.ethereum._metamask.isUnlocked();
  }
}

export const observerEtherAddress = new ObserverEtherAddress();
