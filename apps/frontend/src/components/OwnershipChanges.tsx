'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useOwnershipChanges } from '@ensvolution/hooks';
import { Skeleton } from '@ensvolution/ui/components/skeleton';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@ensvolution/ui/components/alert';
import { ScrollArea } from '@ensvolution/ui/components/scroll-area';
import { Button } from '@ensvolution/ui/components/button';
import {
  AlertTriangle,
  User,
  X,
  ExternalLink,
} from 'lucide-react';
import { useENS } from '@/providers/ENSProvider';
import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '@ensvolution/ui/components/sidebar';
import { viemClient } from '@/config/viemClient';

export interface OwnershipChangesProps {
  ensName: string;
}

interface AddressDisplayInfo {
  address: string;
  name: string | null;
  isLoading: boolean;
}

const OwnershipChanges: React.FC<OwnershipChangesProps> = ({
  ensName,
}) => {
  const { setShowOwnershipChanges } = useENS();
  const { handleSidebarChange } = useSidebar();
  const [addressInfo, setAddressInfo] = useState<
    Record<string, AddressDisplayInfo>
  >({});

  const {
    data: ownershipChanges,
    isLoading,
    error,
    isError,
  } = useOwnershipChanges(ensName);

  // Tracks which addresses we've already started resolving so that re-renders
  // (e.g. the query refetching) don't kick off duplicate lookups. A ref is
  // used because we need a synchronous read inside the loop — `setState`
  // updaters run later during React's reconciliation, so we can't rely on a
  // setState-callback read to gate the next iteration.
  const inFlightRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!ownershipChanges || ownershipChanges.length === 0) return;
    let cancelled = false;

    const resolveAddresses = async () => {
      const uniqueAddresses = [
        ...new Set(ownershipChanges.map((change) => change.ownerAddress)),
      ];

      for (const address of uniqueAddresses) {
        if (cancelled) return;
        if (inFlightRef.current.has(address)) continue;
        inFlightRef.current.add(address);

        setAddressInfo((prev) => ({
          ...prev,
          [address]: { address, name: null, isLoading: true },
        }));

        try {
          const resolved = await viemClient.getEnsName({
            address: address as `0x${string}`,
          });
          if (cancelled) return;
          setAddressInfo((prev) => ({
            ...prev,
            [address]: { address, name: resolved, isLoading: false },
          }));
        } catch {
          if (cancelled) return;
          setAddressInfo((prev) => ({
            ...prev,
            [address]: { address, name: null, isLoading: false },
          }));
        }
      }
    };

    void resolveAddresses();
    return () => {
      cancelled = true;
    };
  }, [ownershipChanges]);

  const handleClose = () => {
    setShowOwnershipChanges(false);
    handleSidebarChange(false);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getEtherscanTxUrl = (txHash: string) => {
    return `https://etherscan.io/tx/${txHash}`;
  };

  const getEtherscanAddressUrl = (address: string) => {
    return `https://etherscan.io/address/${address}`;
  };

  const renderAddressDisplay = (address: string) => {
    const info = addressInfo[address];

    if (!info || info.isLoading) {
      return (
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-20" />
          <ExternalLink className="h-3 w-3" />
        </div>
      );
    }

    const displayText = info.name || formatAddress(address);

    return (
      <a
        href={getEtherscanAddressUrl(address)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm hover:text-blue-600 transition-colors"
      >
        <span className="font-mono text-xs underline decoration-dotted">
          {displayText}
        </span>
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  };

  if (isLoading) {
    return (
      <Sidebar variant="sidebar" side="right">
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <User className="h-5 w-5" />
              Ownership History
            </h3>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X size={18} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Loading ownership changes for {ensName}...
          </p>
        </SidebarHeader>
        <SidebarContent className="px-2 py-2">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  if (isError || !ownershipChanges) {
    return (
      <Sidebar variant="sidebar" side="right">
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <User className="h-5 w-5" />
              Ownership History
            </h3>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X size={18} />
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2 py-2">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Ownership Data</AlertTitle>
            <AlertDescription>
              {error?.message ||
                `Failed to load ownership history for ${ensName}`}
            </AlertDescription>
          </Alert>
        </SidebarContent>
      </Sidebar>
    );
  }

  if (ownershipChanges.length === 0) {
    return (
      <Sidebar variant="sidebar" side="right">
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <User className="h-5 w-5" />
              Ownership History
            </h3>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X size={18} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No ownership changes found for {ensName}
          </p>
        </SidebarHeader>
        <SidebarContent className="px-2 py-2 flex items-center justify-center">
          <div className="text-center py-6 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No ownership transfers have been recorded for this domain.</p>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar variant="sidebar" side="right">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5" />
            Ownership History
          </h3>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X size={18} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {ownershipChanges.length} ownership change
          {ownershipChanges.length !== 1 ? 's' : ''} for {ensName}
        </p>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        <ScrollArea className="h-full">
          <div className="space-y-4 pr-4">
            {ownershipChanges.map((change, index) => (
              <div key={`${change.transactionID}-${change.blockNumber}`} className="p-3 text-xs rounded-md border space-y-1">
                {change.timestamp && (
                  <>
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-medium">{formatDate(change.timestamp)}</div>
                  </>
                )}

                <div className="text-sm text-muted-foreground">Owner</div>
                <div className="font-medium">{renderAddressDisplay(change.ownerAddress)}</div>

                <div className="text-sm text-muted-foreground">Block Number</div>
                <div className="font-medium font-mono text-xs">{change.blockNumber.toLocaleString()}</div>

                <div className="text-sm text-muted-foreground">Transaction Hash</div>
                <div className="font-medium">
                  <a
                    href={getEtherscanTxUrl(change.transactionID)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-600 hover:text-blue-800 underline decoration-dotted flex items-center gap-1 w-full"
                  >
                    {formatAddress(change.transactionID)}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default OwnershipChanges;
