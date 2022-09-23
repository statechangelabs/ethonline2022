import { useChainId } from "@raydeck/usemetamask";
import { ethers, Signer } from "ethers";
import { Escrow__factory } from "./contracts";
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
  return Escrow__factory.connect(address, provider);
};

export const useEscrow = () => {
  const chainId = useChainId();
  const;
};
