import { useChainId } from "@raydeck/usemetamask";
import { ethers, Signer } from "ethers";
import { getContractAddress } from "ethers/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Requests__factory } from "./contracts";
import useAsyncEffect from "./useAsyncEffect";
export const addresses: Record<string, string> = {
  // "1337": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "80001": "0x48e10f8a98152b46e552961aCf5B7A1B67504D29",
  "137": "0xFD17de2f833d59646a3263cbdA2Ea5bba4CD60E4",
};

export const getAddress = (chainId: string): string => {
  const envChain = process.env[`REACT_APP_ESCROW_${chainId}`];
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
  return Requests__factory.connect(address, provider);
};

export const useRequests = () => {
  const chainId = useChainId();
  return useMemo(
    () => getContract(chainId, ethers.providers.getDefaultProvider()),
    [chainId]
  );
};

export const useRequestsForBuyer = async (buyer: string) => {
  const getRequest = useGetRequest();
  //iterate over the requests
  const [requests, setRequests] = useState<
    Awaited<ReturnType<typeof getRequest>>[]
  >([]);
  const [maxId, setMaxId] = useState(0);
  const getRequests = useCallback(
    async (flush = false) => {
      let id = 0;
      if (flush) {
        setRequests([]);
      } else {
        id = maxId;
      }
      while (true) {
        try {
          const request = await getRequest(id);
          if (request.buyer === buyer) setRequests((old) => [...old, request]);
          id++;
        } catch (e) {
          setMaxId(id);
          break;
        }
      }
    },
    [requests]
  );

  useAsyncEffect(getRequests, []);
  const refresh = useCallback(() => {
    getRequests(true);
  }, [getRequests]);
  const getNew = useCallback(() => {
    getRequests(false);
  }, [getRequests]);
  return useMemo(
    () => ({ requests, refresh, getNew }),
    [requests, refresh, getNew]
  );
};
export const useGetRequest = () => {
  const requests = useRequests();
  return useCallback(
    async (id: number) => {
      const request = await requests.getRequest(id);
      return request;
    },
    [requests]
  );
};
