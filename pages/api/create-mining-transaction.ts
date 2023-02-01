import {
  AppWallet,
  AssetMetadata,
  ForgeScript,
  largestFirst,
  Mint,
  Transaction,
} from "@meshsdk/core";
import type { NextApiRequest, NextApiResponse } from "next";
import { KoiosProvider } from "@meshsdk/core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipientAddress = req.body.recipientAddress;
  const utxos = req.body.utxos;
  const koiosProvider = new KoiosProvider("preprod");

  const appWallet = new AppWallet({
    networkId: 0,
    fetcher: koiosProvider,
    submitter: koiosProvider,
    key: {
      type: "mnemonic",
      words: [
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
      ],
    },
  });

  // minting script
  const appWalletAddress = appWallet.getPaymentAddress();
  const forgingScript = ForgeScript.withOneSignature(appWalletAddress);

  // define assets
  const assetName = "MeshBlueBanner";

  const assetMetadata: AssetMetadata = {
    name: "Mesh Blue Banner",
    // image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    image: 'https://meshjs.dev/logo-mesh/mesh.png',
    mediaType: "image/jpg",
    description: "This NFT is minted by Mesh (https://meshjs.dev/).",
  };

  const asset: Mint = {
    assetName: assetName,
    assetQuantity: "1",
    metadata: assetMetadata,
    label: "721",
    recipient: recipientAddress,
  };

  const costLovelace = "10000000";
  const selectedUtxos = largestFirst(costLovelace, utxos, true);
  const bankWalletAddress =
    "addr_test1qzmwuzc0qjenaljs2ytquyx8y8x02en3qxswlfcldwetaeuvldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmysm5e6yx";

  // create the transaction
  const tx = new Transaction({ initiator: appWallet });
  tx.setTxInputs(selectedUtxos);
  tx.mintAsset(forgingScript, asset);
  tx.sendLovelace(bankWalletAddress, costLovelace);
  tx.setChangeAddress(recipientAddress);
  const unsignedTx = await tx.build();

  res.status(200).json({ unsignedTx: unsignedTx });
}
