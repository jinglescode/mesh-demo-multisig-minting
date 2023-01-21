import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from "@meshsdk/react";
import { CardanoWallet } from "@meshsdk/react";
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
  const { wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);

  async function startMinting() {
    setLoading(true);
    const recipientAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();
    console.log("starting minting", { recipientAddress, utxos });
    const { unsignedTx } = await createTransaction(recipientAddress, utxos);
    console.log({ unsignedTx });
    await signTransaction(unsignedTx);
  }

  async function signTransaction(unsignedTx: string) {
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log({ txHash });
    setLoading(false);
  }

  return (
    <>
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
    </>
  );
}
