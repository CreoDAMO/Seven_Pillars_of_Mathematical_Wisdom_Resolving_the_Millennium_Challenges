// App.jsx
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// Public Gate Components
import { PillarsVisualizer } from '@/components/PublicGate/PillarsVisualizer'
import { ProblemExplorer } from '@/components/PublicGate/ProblemExplorer'
import { ProofSimulator } from '@/components/PublicGate/ProofSimulator'
import { NFTGallery } from '@/components/PublicGate/NFTGallery'
import { EntropyMeter } from '@/components/PublicGate/EntropyMeter'
import { SAPIConsole } from '@/components/PublicGate/SAPIConsole'

// Hybrid System Components
import { SimulationEngine } from '@/components/HybridSystem/SimulationEngine'
import { EmulationChamber } from '@/components/HybridSystem/EmulationChamber'
import { VirtualizationCore } from '@/components/HybridSystem/VirtualizationCore'
import { ContainerFlow } from '@/components/HybridSystem/ContainerFlow'
import { ServerlessView } from '@/components/HybridSystem/ServerlessView'
import { HCIInterface } from '@/components/HybridSystem/HCIInterface'
import { HMCInterface } from '@/components/HybridSystem/HMCInterface'
import { NanoCellPrinter } from '@/components/HybridSystem/NanoCellPrinter'
import { QuantumPortals } from '@/components/HybridSystem/QuantumPortals'

// Quantum Visual Engine
import { QuantumFieldViewer } from '@/components/QuantumEngine/QuantumFieldViewer'
import { EntropyPulseWave } from '@/components/QuantumEngine/EntropyPulseWave'
import { NanoCellPulseMap } from '@/components/QuantumEngine/NanoCellPulseMap'

// Public Ledger
import { PublicWalletDisplay } from '@/components/PublicLedger/PublicWallet'
import { DonationLedger } from '@/components/PublicLedger/LiveLedger'
import { FiatTaxAutoCalc } from '@/components/PublicLedger/TaxCalculator'

// Self-Validation
import { SystemValidator } from '@/components/SelfTest/ValidatorCore'
import { EntropyChecker } from '@/components/SelfTest/EntropyCheck'
import { APIHealthMonitor } from '@/components/SelfTest/APIMonitor'

export default function LivingPublicGate() {
  const [activeTab, setActiveTab] = useState('visualizer')
  const [systemEntropy, setSystemEntropy] = useState(0.92)

  return (
    <div className="living-system-container bg-gray-950 text-white min-h-screen p-6">
      <header className="system-header mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">
          Ξ Seven Pillars of Mathematical Wisdom
        </h1>
        <p className="text-gray-300">Living Public Gate Interface</p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-10 gap-1 mb-6">
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="proof">Proof Sim</TabsTrigger>
          <TabsTrigger value="nft">NFT Gallery</TabsTrigger>
          <TabsTrigger value="entropy">Entropy</TabsTrigger>
          <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
          <TabsTrigger value="quantum">Quantum</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
          <TabsTrigger value="sapi">SAPI</TabsTrigger>
          <TabsTrigger value="test">Self-Test</TabsTrigger>
        </TabsList>

        {/* Core Components */}
        <TabsContent value="visualizer">
          <PillarsVisualizer entropy={systemEntropy} />
        </TabsContent>

        <TabsContent value="problems">
          <ProblemExplorer />
        </TabsContent>

        <TabsContent value="proof">
          <ProofSimulator />
        </TabsContent>

        <TabsContent value="nft">
          <NFTGallery />
        </TabsContent>

        <TabsContent value="entropy">
          <EntropyMeter value={systemEntropy} />
        </TabsContent>

        {/* Hybrid System */}
        <TabsContent value="hybrid">
          <div className="hybrid-grid gap-4">
            <SimulationEngine />
            <EmulationChamber />
            <VirtualizationCore />
            <ContainerFlow />
            <ServerlessView />
            <HCIInterface />
            <HMCInterface />
            <NanoCellPrinter />
            <QuantumPortals />
          </div>
        </TabsContent>

        {/* Quantum Visual Engine */}
        <TabsContent value="quantum">
          <div className="quantum-interface grid gap-4">
            <QuantumFieldViewer />
            <EntropyPulseWave entropy={systemEntropy} />
            <NanoCellPulseMap />
          </div>
        </TabsContent>

        {/* Public Ledger */}
        <TabsContent value="ledger">
          <div className="ledger-interface grid gap-4">
            <PublicWalletDisplay />
            <DonationLedger />
            <FiatTaxAutoCalc />
          </div>
        </TabsContent>

        {/* SAPI Interface */}
        <TabsContent value="sapi">
          <SAPIConsole />
        </TabsContent>

        {/* Self-Validation */}
        <TabsContent value="test">
          <div className="validation-grid gap-4">
            <SystemValidator />
            <EntropyChecker />
            <APIHealthMonitor />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
