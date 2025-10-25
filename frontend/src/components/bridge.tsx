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
import { ArrowBigRight, CircleAlertIcon } from "lucide-react";

import ChainSelect from "./blocks/chain-select";
import TokenSelect from "./blocks/token-select";
import IntentModal from "./blocks/intent-modal";
import { useNexus } from "@/providers/NexusProvider";
import useListenTransaction from "@/hooks/useListenTransactions";

const NexusBridge = () => {
  const [inputs, setInputs] = useState<{
    chain: SUPPORTED_CHAINS_IDS | null;
    token: SUPPORTED_TOKENS | null;
    amount: string | null;
  }>({
    chain: null,
    token: null,
    amount: null,
  });

  const [showTestnet, setShowTestnet] = useState(false);
  const { nexusSDK, intentRefCallback } = useNexus();
  const { processing, explorerURL } = useListenTransaction({
    sdk: nexusSDK!,
    type: "bridge",
  });

  const [isLoading, setIsLoading] = useState(false);

  const initiateBridge = async () => {
    if (!inputs.chain || !inputs.token || !inputs.amount) return;
    setIsLoading(true);

    try {
      const bridgeResult = await nexusSDK?.bridge({
        token: inputs.token,
        amount: inputs.amount,
        chainId: inputs.chain,
      });

      if (bridgeResult?.success) {
        console.log("Bridge successful:", bridgeResult.explorerUrl);
      }
    } catch (error) {
      console.error("Error while bridging:", error);
    } finally {
      setIsLoading(false);
      intentRefCallback.current = null;
    }
  };

  return (
    <>
      <Card className="w-full max-w-lg items-center mx-auto bg-transparent">
        <CardHeader className="w-full">
          <CardTitle className="text-center">Nexus Bridge</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-5 w-full max-w-md">
          {/* Toggle Testnet/Mainnet */}
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
              setInputs({ ...inputs, chain, token: null }) // reset token
            }
            isTestnet={showTestnet}
          />

          {/* Token select */}
          {inputs.chain && (
            <TokenSelect
              selectedChain={inputs.chain.toString()}
              selectedToken={inputs?.token ?? undefined}
              handleTokenSelect={(token) =>
                setInputs({ ...inputs, token })
              }
              isTestnet={showTestnet}
            />
          )}

          {/* Amount input */}
          <div className="grid gap-3 w-full text-left">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="text"
              className="w-full"
              value={inputs?.amount ?? ""}
              onChange={(e) =>
                setInputs({ ...inputs, amount: e.target.value })
              }
            />
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-y-5">
          <Button
            type="submit"
            onClick={initiateBridge}
            disabled={
              !inputs.chain || !inputs.token || !inputs.amount || isLoading
            }
          >
            {isLoading ? (
              <CircleAlertIcon className="size-5 animate-spin" />
            ) : (
              "Send"
            )}
          </Button>

          {/* Transaction progress */}
          {intentRefCallback?.current?.intent && (
            <div className="flex flex-col gap-y-2 items-center">
              <p>Total Steps: {processing?.totalSteps}</p>
              <p>Status: {processing?.statusText}</p>
              <p>Progress: {processing?.currentStep}</p>
            </div>
          )}

          {/* Explorer link */}
          {explorerURL && (
            <a
              href={explorerURL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold flex items-center gap-x-2"
            >
              <ArrowBigRight className="size-5" /> View on Explorer
            </a>
          )}
        </CardFooter>
      </Card>

      {/* Intent modal */}
      {intentRefCallback?.current?.intent && (
        <IntentModal intent={intentRefCallback?.current} />
      )}
    </>
  );
};

export default NexusBridge;
