"use client";

import React, { useMemo } from 'react';
import { useOwnershipChanges } from '@ensvolution/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ensvolution/ui/components/card';
import { Badge } from '@ensvolution/ui/components/badge';
import { Skeleton } from '@ensvolution/ui/components/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@ensvolution/ui/components/alert';
import { ScrollArea } from '@ensvolution/ui/components/scroll-area';
import { Separator } from '@ensvolution/ui/components/separator';
import { Button } from '@ensvolution/ui/components/button';
import { AlertTriangle, User, ArrowRight, Clock, Hash, X } from 'lucide-react';
import { useENS } from '@/providers/ENSProvider';
import { useSidebar } from '@ensvolution/ui/components/sidebar';
import OwnershipChangesService from '@/service/ownership-changes.service';

export interface OwnershipChangesProps {
  ensName: string;
  className?: string;
}

const OwnershipChanges: React.FC<OwnershipChangesProps> = ({
  ensName,
  className = ""
}) => {
  const { setShowOwnershipChanges } = useENS();
  const { handleSidebarChange } = useSidebar();

  // Create service instance
  const serviceInstance = useMemo(() => new OwnershipChangesService(), []);

  const { data: ownershipChanges, isLoading, error, isError } = useOwnershipChanges(ensName, serviceInstance);

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

  const getEventBadgeVariant = (eventType: string) => {
    switch (eventType) {
      case 'NewOwner':
        return 'default';
      case 'WrappedTransfer':
        return 'secondary';
      case 'Transfer':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'NewOwner':
        return 'text-blue-600';
      case 'WrappedTransfer':
        return 'text-purple-600';
      case 'Transfer':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
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
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
            >
              <X size={18}/>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
            >
              <X size={18}/>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Ownership Data</AlertTitle>
            <AlertDescription>
              {error?.message || `Failed to load ownership history for ${ensName}`}
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
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
            >
              <X size={18}/>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
          >
            <X size={18}/>
          </Button>
        </div>
        <CardDescription>
          {ownershipChanges.length} ownership change{ownershipChanges.length !== 1 ? 's' : ''} for {ensName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {ownershipChanges.map((change, index) => (
              <div key={`${change.transactionID}-${change.blockNumber}`}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={getEventBadgeVariant(change.eventType)}
                      className="w-fit"
                    >
                      {change.eventType}
                    </Badge>
                    {change.timestamp && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(change.timestamp)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3" />
                      <span className="font-mono text-xs">
                        {formatAddress(change.ownerAddress)}
                      </span>
                    </div>
                    {index < ownershipChanges.length - 1 && (
                      <>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Next transfer
                        </span>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Hash className="h-3 w-3" />
                      <span className="font-mono">
                        Block: {change.blockNumber.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-mono">
                        Tx: {formatAddress(change.transactionID)}
                      </span>
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
