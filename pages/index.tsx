import { useState } from "react";
import type { NextPage } from "next";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { KoiosProvider } from "@meshsdk/core";
import { createTransaction } from "@/backend";

const Home: NextPage = () => {
  const { connected } = useWallet();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Mint My Token</h1>
        {connected ? <MintSection /> : <CardanoWallet />}
      </div>
    </div>
  );
};

export default Home;

function MintSection() {
  const koiosProvider = new KoiosProvider("preprod");

  const { wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  async function startMinting() {
    setSuccess(false);
    setTxHash(undefined);
    setLoading(true);
    const recipientAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();
    console.log("starting minting", { recipientAddress, utxos });
    const { unsignedTx } = await createTransaction(recipientAddress, utxos);

    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log({ txHash });
    setLoading(false);
    setTxHash(txHash);

    koiosProvider.onTxConfirmed(txHash, () => {
      console.log("Transaction confirmed");
      setSuccess(true);
    });
  }

  return (
    <>
      {txHash ? (
        <>
          <p>
            <b>Tx Hash:</b>
            <br />
            {txHash}
          </p>
          {success ? (
            <p>Transaction confirmed</p>
          ) : (
            <p>Waiting confirmation...</p>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => startMinting()}
          disabled={loading}
          style={{
            fontSize: "20px",
            margin: "16px",
            padding: "10px",
            backgroundColor: loading ? "orange" : "grey",
          }}
        >
          Mint Now!
        </button>
      )}
    </>
  );
}
