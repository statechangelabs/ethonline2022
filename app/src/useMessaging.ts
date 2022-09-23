import { Messaging__factory } from "./contracts";
import { BigNumber, ethers, Signer, Wallet } from "ethers";
import { useAccount, useChainId } from "@raydeck/usemetamask";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAsyncEffect from "./useAsyncEffect";

export const addresses: Record<string, string> = {
  // "1337": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "80001": "0x48e10f8a98152b46e552961aCf5B7A1B67504D29",
  "137": "0xFD17de2f833d59646a3263cbdA2Ea5bba4CD60E4",
};

export const getAddress = (chainId: string): string => {
  const envChain = process.env[`REACT_APP_MESSAGING_${chainId}`];
  if (envChain) {
    return envChain;
  } else if (addresses[chainId]) return addresses[chainId];
  else throw new Error("No messaging contract for this chain");
};

export const getContract = (
  chainId: string,
  provider: ethers.providers.Provider | Signer
) => {
  const address = getAddress(chainId);
  return Messaging__factory.connect(address, provider);
};

// export const ethereum = (window as unknown as { ethereum: any }).ethereum;
// export const provider = ethereum
//   ? new ethers.providers.Web3Provider(ethereum)
//   : undefined;
export const useMessaging = () => {
  const chainId = useChainId();
  const chainIdDec = parseInt(chainId, 16).toString(10);
  const messaging = getContract(
    chainIdDec,
    ethers.providers.getDefaultProvider()
  );

  if (!messaging) throw new Error("messaging is not defined");
  return messaging;
};
export const useMessages = (address: string) => {
  const [messages, setMessages] = useState<
    { from: string; cid: string; blockNumber: number }[]
  >([]);
  const messaging = useMessaging();
  useAsyncEffect(async () => {
    const filter = messaging.filters.Message(undefined, address, undefined);
    const events = await messaging.queryFilter(filter);
    setMessages(
      events
        .map((event) => ({
          from: event.args[0],
          cid: event.args[2],
          blockNumber: event.blockNumber,
        }))
        .sort((a, b) => b.blockNumber - a.blockNumber)
    );
  }, [address]);
  useEffect(() => {
    const listener: ethers.providers.Listener = (from, to, cid, event) => {
      if (to.toLowerCase() === address.toLowerCase) {
        setMessages((messages) => [
          ...messages,
          { from, cid, blockNumber: event.blockNumber },
        ]);
      }
    };
    messaging.on("Message", listener);
    return () => {
      messaging.removeListener("Message", listener);
    };
  }, [address, messaging]);
  return messages;
};
export const useMyMessages = () => {
  const address = useAccount();
  return useMessages(address);
};
export const usePublicKey = (address: string) => {
  const messaging = useMessaging();
  const [publicKey, setPublicKey] = useState<string>();
  useAsyncEffect(async () => {
    const data = await messaging.publicKeyOf(address);
    const publicKey = ethers.utils.base64.encode(data);
    setPublicKey(publicKey);
  }, [address]);
  useEffect(() => {
    const listener: ethers.providers.Listener = (
      _address,
      _publicKey,
      event
    ) => {
      if (_address.toLowerCase() === address.toLowerCase()) {
        setPublicKey(_publicKey);
      }
    };
    messaging.on("NewPublicKey", listener);
    return () => {
      messaging.removeListener("NewPublicKey", listener);
    };
  }, [address, messaging]);
  return publicKey;
};
export const useMyPublicKey = () => {
  const address = useAccount();
  return usePublicKey(address);
};

export const useSendMessage = () => {
  const messaging = useMessaging();
  return useCallback(
    async (to: string, message: string) => {
      const tx = await messaging.sendMessageTo(message, to);
      return tx;
      // const receipt = await tx.wait();
      // return receipt;
    },
    [messaging]
  );
};
export const useSetPublicKey = () => {
  const messaging = useMessaging();
  return useCallback(
    async (publicKey: string) => {
      const bytes = ethers.utils.base64.decode(publicKey);
      const decodedPublicKey = ethers.utils.hexlify(bytes);
      const tx = await messaging.setPublicKey(decodedPublicKey);
      return tx;
    },
    [messaging]
  );
};
export const useGetFeeForRecipient = () => {
  const messaging = useMessaging();
  return useCallback(
    async (recipient: string) => {
      return messaging.messagingFeeFor(recipient);
    },
    [messaging]
  );
};
export const useWhiteListSenders = (address: string) => {
  const messaging = useMessaging();
  const [senders, setSenders] = useState<Record<string, BigNumber>>({});
  useAsyncEffect(async () => {
    let key = "";
    let index = 0;
    do {
      key = await messaging.messagingFeeSenders(address, index);
      const data = await messaging.messagingFeeFor(key);
      const _key = key;
      setSenders((oldData) => ({ ...oldData, [_key]: data }));
      index++;
    } while (key);
  }, [messaging, address]);
  useEffect(() => {
    const listener: ethers.providers.Listener = (_to, _from, _fee, event) => {
      if (_to.toLowerCase() == address.toLowerCase()) {
        setSenders((oldData) => ({ ...oldData, [_from]: _fee }));
      }
    };
    messaging.on("NewWhitelistMessagingFee", listener);
    return () => {
      messaging.removeListener("NewWhitelistMessagingFee", listener);
    };
  }, [messaging, address]);
  return senders;
};
export const useMyWhitelistSenders = () => {
  const address = useAccount();
  return useWhiteListSenders(address);
};
