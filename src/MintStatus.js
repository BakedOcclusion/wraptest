import { useEffect, useState } from "react";
import { useContractMethod } from "./hooks";
import ClipLoader from "react-spinners/ClipLoader";
import { utils, ethers } from "ethers";

export default function MintStatus(props) {
  const token = props.token;

  const { state: publicMintState, send: mint } = useContractMethod("mint");
  const { state: mintWithLootState, send: mintWithLoot } = useContractMethod(
    "mintWithLoot"
  );

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(true);

  useEffect(() => {
    if (token < 0) {
      mintWithLoot(token, {
        value: utils.parseEther("0.0")
      });
    } else {
      mint(token, {
        value: utils.parseEther("0.0")
      });
    }
  }, [props.token]);

  function checkMintingState(mintState) {
    //console.log("mintState effect ", token, " mintState = ", mintState);
    if (mintState && mintState.status) {
      if (mintState.status == "Success") {
        setSuccessMessage("Success!");
        setLoading(false);
      }
      if (mintState.status == "Exception" || mintState.status == "Fail") {
        if (mintState.errorMessage.includes("already been minted")) {
          setErrorMessage("Already Minted");
        } else if (mintState.errorMessage.includes("Not the owner")) {
          setErrorMessage("Not the owner");
        } else {
          setErrorMessage("Transaction Failed");
        }
        setLoading(false);
      }
    }
  }

  // Minting updates
  useEffect(() => {
    checkMintingState(publicMintState);
  }, [publicMintState]);

  useEffect(() => {
    checkMintingState(mintWithLootState);
  }, [mintWithLootState]);

  return (
    <div className="mint-status">
      <span>Minting {token.toString()}</span>
      <ClipLoader loading={loading} size={20} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
