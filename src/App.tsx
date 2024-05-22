import React from "react";
// import { useBlock } from "@starknet-react/core";
//import Header from "./components/Header";
//import {Button} from "./components/ui/Button";
import dynamic from "next/dynamic";
import {useAccount, useConnect} from "@starknet-react/core";
import {sepolia} from "@starknet-react/chains";
import { useState, useEffect } from 'react';

const ConnectModal = dynamic(
    () => import("./components/starknet/ConnectModal")
);

const AlertModal = dynamic(
    () => import("./components/AlertModal")
);

const TextBoxWithButton = dynamic(
    () => import("./components/TextBoxWithButton")
);

function HandleConnectedModal() {
    const { connector } = useConnect();
    if (!connector) {
        return null;
    }

    const [data, setData] = useState<bigint>(BigInt(0));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setData(await connector.chainId());
        };
        fetchData();
        setLoading(false);
    }, []); // Empty dependency array means this effect runs once after the initial render

    if (loading) {
        return <div>Loading...</div>;
    }

    const isSepolia = data == sepolia.id;

    if(!isSepolia){
        return (
            <>
                <AlertModal />
            </>

        );
    }
    else
    {
        return (
            <>
                <br/>
                <p>connected to wallet in sepolia network!</p>
                <br/>
            </>
        );
    }
}

export default function App() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { disconnect } = useDisconnect();
  // disconnect();

  const { address } = useAccount();

    // if (address)
    // {
    //     disconnect();
    //     return (
    //       <div>if!</div>
    //     );
    // }
    // else {

    if(address == null)
    {
        return (
            <div className="w-full mb-8 h-12 flex items-center">
                <ConnectModal/>
            </div>
    )
        ;
    } else {
        return (
            <>
                <div>
                    <HandleConnectedModal/>
                    <br/><br/><br/><br/><br/>
                    <div>wallet address: {address}</div>
                    <TextBoxWithButton />
                </div>
            </>
        );
    }

    //}
}

//export default App;
