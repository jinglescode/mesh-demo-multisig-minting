
## Tutorial

### Setup

- create folder, `tokens_sales`, open VS code
- go to https://meshjs.dev/guides/nextjs, setup project and install Mesh

### Wallet

- go to https://meshjs.dev/react/ui-components
- add CardanoWallet component
- go to https://meshjs.dev/apis/browserwallet
- add button and get wallet address, `await wallet.getChangeAddress()`

### Minting backend API

- go to https://meshjs.dev/guides/multisig-minting
- create `create-mining-transaction.ts` file
- get new wallet from https://meshjs.dev/apis/appwallet or your own wallet
- init AppWallet
- create ForgeScript
- create AssetMetadata
- create Mint
- create Transaction

### Backend

- install axios
- create `backend` folder and index.ts file
- create `post()` function
- create `createTransaction()` function

### Minting function

- add `await wallet.getUtxos();`
- add `await createTransaction(recipientAddress, utxos);`
- add `await wallet.signTx(unsignedTx, true);`
- add `await wallet.submitTx(signedTx);`

## Add confirmation

- add `koiosProvider.onTxConfirmed`

### UI

- add simple UI look and feel
