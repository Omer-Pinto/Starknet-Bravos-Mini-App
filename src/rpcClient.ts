import axios from 'axios';

interface RpcRequest<Params> {
    jsonrpc: string;
    method: string;
    params: Params;
    id: number;
}

interface RpcError {
    code: number;
    message: string;
    data?: unknown;
}

interface RpcResponse<Result> {
    jsonrpc: string;
    result?: Result;
    error?: RpcError;
    id: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeRpcCall = async <Params, Result>(url: string, method: string, params: Params): Promise<RpcResponse<Result>> => {
    const requestData: RpcRequest<Params> = {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: Date.now(), // Unique ID for the request
    };

    try {
        const response = await axios.post<RpcResponse<Result>>(url, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export { makeRpcCall };