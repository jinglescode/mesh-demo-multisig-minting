import { UTxO } from "@meshsdk/core";
import axios from "axios";

const instance = axios.create({
  baseURL: `/api/`,
  withCredentials: true,
});

// export async function post(route: string, body = {}) {
//   return await instance
//     .post(`${route}`, body)
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((error) => {
//       throw error;
//     });
// }

// export async function createTransaction(
//   recipientAddress: string,
//   utxos: UTxO[]
// ) {
//   return await post(`create-mining-transaction`, { recipientAddress, utxos });
// }



export function post(route: string, body = {}) {
  return instance
    .post(`${route}`, body)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function createTransaction(
  recipientAddress: string,
  utxos: UTxO[]
) {
  return await post(`create-mining-transaction`, { recipientAddress, utxos });
}