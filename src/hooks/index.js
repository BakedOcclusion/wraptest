import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import spellBookContractABI from "../spellbooksabi.json";
//import { spellbooksContractAddress } from "../contracts";

const spellbooksContractAddress = "0x808f518866aa95afdef9bd0330bcbf56483fa98e";

console.log("spellbooksContractAddress = ", spellbooksContractAddress);
console.log("spellBookContractABI = ", spellBookContractABI);

const spellbooksContractInterface = new ethers.utils.Interface(
  spellBookContractABI
);
const contract = new Contract(
  spellbooksContractAddress,
  spellbooksContractInterface
);

export function useContractMethod(methodName) {
  const { state, send } = useContractFunction(contract, methodName, {});
  return { state, send };
}

function getSpellbookCount() {
  const [count] =
    useContractCall({
      abi: spellbooks,
      address: spellbooksAddress,
      method: "totalSupply",
      args: []
    }) ?? [];
  return count ? count.toString() : null;
}
