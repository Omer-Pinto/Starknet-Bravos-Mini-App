import {makeRpcCall} from './rpcClient'


interface RpcRequestParams {
    transaction_hash: string;
}

type RpcResult = Record<string, unknown>;


const rpcUrl = 'https://free-rpc.nethermind.io/sepolia-juno';
const methodName = 'starknet_getTransactionByHash';

export default async function executeGetTransactionByHashRpc (transactionHash: string) : Promise<string>
{
    const methodParams: RpcRequestParams = { transaction_hash: transactionHash };

    return makeRpcCall<RpcRequestParams, RpcResult>(rpcUrl, methodName, methodParams)
        .then(response => {
            if (response.error) {
                console.error('RPC Error:', response.error);
                return response.error.message;
            } else {
                console.log('RPC Response:', response.result);
                // JSON.stringify(data, null, 2);
                if (response.result != null)
                {
                    return JSON.stringify(response.result, null, 8);
                }
                else {
                    return 'empty result';
                }
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            return error.message;
        });
}