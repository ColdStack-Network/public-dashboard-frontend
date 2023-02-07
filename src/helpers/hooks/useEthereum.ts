import { observerEtherAddress } from "helpers/EtherAddObserver";
import { useEffect, useState } from "react";

type EtherSelectedAddress = string | null;

export const useGetSelectedAddr = () => {
  const [selectedAddr, setSelectedAddr] = useState<EtherSelectedAddress>(null);

  useEffect(() => {
    const initialAddress = observerEtherAddress.get();
    setSelectedAddr(initialAddress);

    observerEtherAddress.subscribe(setSelectedAddr);

    return () => {
      observerEtherAddress.unSubscribe(setSelectedAddr);
    };
  }, []);

  return selectedAddr;
};
