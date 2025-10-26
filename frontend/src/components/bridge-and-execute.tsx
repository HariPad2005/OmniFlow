import {
  SUPPORTED_CHAINS,
  type SUPPORTED_CHAINS_IDS,
  type SUPPORTED_TOKENS,
} from "@avail-project/nexus-core";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CircleAlertIcon } from "lucide-react";
import ChainSelect from "./blocks/chain-select";
import TokenSelect from "./blocks/token-select";
import { useNexus } from "@/providers/NexusProvider";
import useListenTransaction from "@/hooks/useListenTransactions";

const NexusBridgeAndExecute = () => {
  const [inputs, setInputs] = useState<{
    chain: SUPPORTED_CHAINS_IDS | null;
    token: SUPPORTED_TOKENS | null;
    amount: string | null;
    contractAddress: string | null;
    callData: string | null;
  }>({
    chain: null,
    token: null,
    amount: null,
    contractAddress: null,
    callData: null,
  });

  const [showTestnet, setShowTestnet] = useState(false);
  const { nexusSDK } = useNexus();
  const { processing, explorerURL } = useListenTransaction({
    sdk: nexusSDK!,
    type: "bridgeAndExecute",
  });

  const [isLoading, setIsLoading] = useState(false);

  const initiateBridgeAndExecute = async () => {
    if (
      !inputs.chain ||
      !inputs.token ||
      !inputs.amount ||
      !inputs.contractAddress ||
      !inputs.callData
    )
      return;

    setIsLoading(true);

    try {
      const result = await nexusSDK?.bridgeAndExecute({
        token: inputs.token,
        amount: inputs.amount,
        toChainId: inputs.chain,
        contractAddress: inputs.contractAddress,
        callData: inputs.callData,
      });

      console.log("Bridge and Execute Result:", result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg items-center mx-auto bg-transparent">
      <CardHeader className="w-full">
        <CardTitle className="text-center">Nexus Bridge & Execute</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-5 w-full max-w-md">
        {/* Testnet/Mainnet Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="toggleTestnet"
            checked={showTestnet}
            onChange={(e) => setShowTestnet(e.target.checked)}
          />
          <Label htmlFor="toggleTestnet">
            {showTestnet ? "Testnet" : "Mainnet"}
          </Label>
        </div>

        {/* Chain select */}
        <ChainSelect
          selectedChain={inputs?.chain ?? SUPPORTED_CHAINS.ETHEREUM}
          handleSelect={(chain) =>
            setInputs({ ...inputs, chain, token: null })
          }
          isTestnet={showTestnet}
        />

        {/* Token select */}
        {inputs.chain && (
          <TokenSelect
            selectedChain={inputs.chain.toString()}
            selectedToken={inputs?.token ?? undefined}
            handleTokenSelect={(token) => setInputs({ ...inputs, token })}
            isTestnet={showTestnet}
          />
        )}

        {/* Amount */}
        <div className="grid gap-3 w-full text-left">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="text"
            className="w-full"
            value={inputs.amount ?? ""}
            onChange={(e) => setInputs({ ...inputs, amount: e.target.value })}
          />
        </div>

        {/* Contract address */}
        <div className="grid gap-3 w-full text-left">
          <Label htmlFor="contract">Contract Address</Label>
          <Input
            id="contract"
            type="text"
            className="w-full"
            value={inputs.contractAddress ?? ""}
            onChange={(e) =>
              setInputs({ ...inputs, contractAddress: e.target.value })
            }
          />
        </div>

        {/* Call data */}
        <div className="grid gap-3 w-full text-left">
          <Label htmlFor="calldata">Call Data (ABI Encoded)</Label>
          <Input
            id="calldata"
            type="text"
            className="w-full"
            placeholder="0xabcdef..."
            value={inputs.callData ?? ""}
            onChange={(e) =>
              setInputs({ ...inputs, callData: e.target.value })
            }
          />
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-y-5">
        <Button
          onClick={initiateBridgeAndExecute}
          disabled={
            !inputs.chain ||
            !inputs.token ||
            !inputs.amount ||
            !inputs.contractAddress ||
            !inputs.callData ||
            isLoading
          }
        >
          {isLoading ? (
            <CircleAlertIcon className="size-5 animate-spin" />
          ) : (
            "Bridge & Execute"
          )}
        </Button>

        {processing && (
          <div className="flex flex-col gap-y-2 items-center">
            <p>Total Steps: {processing.totalSteps}</p>
            <p>Status: {processing.statusText}</p>
            <p>Progress: {processing.currentStep}</p>
          </div>
        )}

        {explorerURL && (
          <a
            href={explorerURL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            View on Explorer
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default NexusBridgeAndExecute;
