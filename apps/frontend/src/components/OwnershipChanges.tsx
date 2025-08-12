'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useOwnershipChanges } from '@ensvolution/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ensvolution/ui/components/card';
import { Skeleton } from '@ensvolution/ui/components/skeleton';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@ensvolution/ui/components/alert';
import { ScrollArea } from '@ensvolution/ui/components/scroll-area';
import { Separator } from '@ensvolution/ui/components/separator';
import { Button } from '@ensvolution/ui/components/button';
import {
  AlertTriangle,
  User,
  Clock,
  Hash,
  X,
  ExternalLink,
} from 'lucide-react';
import { useENS } from '@/providers/ENSProvider';
import { useSidebar } from '@ensvolution/ui/components/sidebar';
import OwnershipChangesService from '@/service/ownership-changes.service';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { clientEnv } from '@/config/clientEnv';

export interface OwnershipChangesProps {
  ensName: string;
  className?: string;
}

interface AddressDisplayInfo {
  address: string;
  name: string | null;
  isLoading: boolean;
}

const OwnershipChanges: React.FC<OwnershipChangesProps> = ({
  ensName,
  className = '',
}) => {
  const { setShowOwnershipChanges } = useENS();
  const { handleSidebarChange } = useSidebar();
  const [addressInfo, setAddressInfo] = useState<
    Record<string, AddressDisplayInfo>
  >({});

  // Create a simple viem client for ENS lookups
  const client = useMemo(
    () =>
      createPublicClient({
        chain: mainnet,
        transport: http(clientEnv.mainnetProvider),
      }),
    []
  );

  // Create service instance
  const serviceInstance = useMemo(() => new OwnershipChangesService(), []);

  const {
    data: ownershipChanges,
    isLoading,
    error,
    isError,
  } = useOwnershipChanges(ensName, serviceInstance);

  // Resolve ENS names for addresses using viem's built-in getEnsName
  useEffect(() => {
    if (!ownershipChanges || ownershipChanges.length === 0) return;

    const resolveAddresses = async () => {
      const uniqueAddresses = [
        ...new Set(ownershipChanges.map((change) => change.ownerAddress)),
      ];

      for (const address of uniqueAddresses) {
        if (addressInfo[address]) continue; // Skip if already resolved or resolving

        // Set loading state
        setAddressInfo((prev) => ({
          ...prev,
          [address]: { address, name: null, isLoading: true },
        }));

        try {
          // Use viem's built-in getEnsName function
          const ensName = await client.getEnsName({
            address: address as `0x${string}`,
          });

          setAddressInfo((prev) => ({
            ...prev,
            [address]: { address, name: ensName, isLoading: false },
          }));
        } catch {
          // Fallback to address if ENS resolution fails
          setAddressInfo((prev) => ({
            ...prev,
            [address]: { address, name: null, isLoading: false },
          }));
        }
      }
    };

    void resolveAddresses();
  }, [ownershipChanges, client, addressInfo]);

  const handleClose = () => {
    setShowOwnershipChanges(false);
    handleSidebarChange(false);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
        <User className="h-3 w-3" />
        <span className="font-mono text-xs underline decoration-dotted">
          {displayText}
        </span>
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Ownership History
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X size={18} />
            </Button>
          </div>
          <CardDescription>
            Loading ownership changes for {ensName}...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !ownershipChanges) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Ownership History
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Ownership Data</AlertTitle>
            <AlertDescription>
              {error?.message ||
                `Failed to load ownership history for ${ensName}`}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (ownershipChanges.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Ownership History
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X size={18} />
            </Button>
          </div>
          <CardDescription>
            No ownership changes found for {ensName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No ownership transfers have been recorded for this domain.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Ownership History
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X size={18} />
          </Button>
        </div>
        <CardDescription>
          {ownershipChanges.length} ownership change
          {ownershipChanges.length !== 1 ? 's' : ''} for {ensName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {ownershipChanges.map((change, index) => (
              <div key={`${change.transactionID}-${change.blockNumber}`}>
                <div className="flex flex-col space-y-2">
                  {change.timestamp && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDate(change.timestamp)}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {renderAddressDisplay(change.ownerAddress)}
                  </div>

                  <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Hash className="h-3 w-3" />
                      <span className="font-mono">
                        Block: {change.blockNumber.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-mono">Tx:</span>
                      <a
                        href={getEtherscanTxUrl(change.transactionID)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-blue-600 hover:text-blue-800 underline decoration-dotted flex items-center gap-1"
                      >
                        {formatAddress(change.transactionID)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {index < ownershipChanges.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OwnershipChanges;
