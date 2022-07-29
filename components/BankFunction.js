import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants/index.js";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function BankFunction() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const bankAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [depositAmount, setDepositAmount] = useState("");
  const [balance, setBalance] = useState("0");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const { runContractFunction: Deposit } = useWeb3Contract({
    abi: abi,
    contractAddress: bankAddress,
    functionName: "Deposit",
    params: {},
    msgValue: depositAmount,
  });

  const { runContractFunction: Withdraw } = useWeb3Contract({
    abi: abi,
    contractAddress: bankAddress,
    functionName: "Withdraw",
    params: { _amount: withdrawAmount },
  });

  const { runContractFunction: getBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: bankAddress,
    functionName: "getBalance",
    params: {},
  });

  async function updateUI() {
    const balanceFromCall = (await getBalance()).toString();
    setBalance(balanceFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    updateUI();
  };

  return (
    <div className="p-5 flex-col">
      <h2 className="mb-5">Here you can deposit and withdraw ETH</h2>
      {bankAddress ? (
        <div>
          <input
            className="border-2 ml-auto"
            type="text"
            onChange={(event) =>
              setDepositAmount(BigInt(event.target.value * 10 ** 18))
            }
          />
          <button
            className="bg-orange-500 text-black font-bold py-2 px-4 rounded ml-4"
            onClick={async function () {
              await Deposit({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
          >
            <div>Deposit</div>
          </button>
          <input
            className="border-2 ml-4"
            type="text"
            onChange={(event) =>
              setWithdrawAmount(BigInt(event.target.value * 10 ** 18))
            }
          />
          <button
            className="bg-orange-500 text-black font-bold py-2 px-4 rounded ml-4"
            onClick={async () => {
              await Withdraw({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
            }}
          >
            <div>Withdraw</div>
          </button>
          <div className="mt-5">
            Balance: {ethers.utils.formatUnits(balance, "ether")} ETH
          </div>
        </div>
      ) : (
        <div>No bank address detected</div>
      )}
    </div>
  );
}
