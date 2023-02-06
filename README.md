
## Tutorial

### Setup

- create folder, `vending_machine`, open VSCode
- go to https://meshjs.dev/guides/nextjs, setup project and install Mesh

### Step 1: Connect Browser Wallet

- go to https://meshjs.dev/react/ui-components
- add CardanoWallet component
- go to https://meshjs.dev/apis/browserwallet
- add button and get wallet address, `await wallet.getChangeAddress()`

### Step 2: Setup App Wallet

- create `create-mining-transaction.ts` file under `pages/api`
- get new wallet from https://meshjs.dev/apis/appwallet or your own wallet
- create koios provider instance
- initialize AppWallet

### Step 3: Create Minting Transaction

- go to https://meshjs.dev/guides/multisig-minting
- create ForgeScript
- create AssetMetadata
- create Transaction
- sign the Transaction

### Step 4: Call the Minting endpoint

- install axios
- create `backend` folder and index.ts file
- create `post()` function
- create `createTransaction()` function
- add `await wallet.getUtxos();`
- add `await createTransaction(recipientAddress, utxos);`
- add `await wallet.signTx(unsignedTx, true);`
- add `await wallet.submitTx(signedTx);`

### Bonus: Listen for TX confirmation

- add `koiosProvider.onTxConfirmed`

### UI

- add simple UI look and feel
