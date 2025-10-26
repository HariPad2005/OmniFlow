'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import NexusUnifiedBalance from './unified-balance'
import {
  BridgeAndExecuteButton,
  BridgeButton,
  TransferButton,
  SwapButton,
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
} from '@avail-project/nexus-widgets'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { parseUnits } from 'viem'
import NexusProvider from '@/providers/NexusProvider'
export default function Nexus() {
  return (
  
    <div className="flex items-center justify-center w-full max-w-4xl flex-col gap-6 z-10">
      
        <Tabs defaultValue="balance" className="w-full items-center">
          <TabsList>
            <TabsTrigger value="balance">Unified Balance</TabsTrigger>
            <TabsTrigger value="bridge">Send Tokens</TabsTrigger>
          </TabsList>

        {/* --- Unified Balance Tab --- */}
        <TabsContent value="balance" className="w-full items-center">
          <NexusUnifiedBalance />
        </TabsContent>
 
        
        
      </Tabs>
    </div>
  )
}
