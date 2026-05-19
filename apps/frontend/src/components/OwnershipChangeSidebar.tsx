"use client"

import React, { useEffect, useState } from 'react';
import { ExternalLink, Lock, User, X } from 'lucide-react';
import { Button } from '@ensvolution/ui/components/button';
import { Badge } from '@ensvolution/ui/components/badge';
import { Skeleton } from '@ensvolution/ui/components/skeleton';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from '@ensvolution/ui/components/sidebar';
import { useENS } from '@/providers/ENSProvider';
import { formatDate, formatTime } from '@ensvolution/helpers';
import { viemClient } from '@/config/viemClient';

const OwnershipChangeSidebar: React.FC = () => {
  const { selectedOwnershipChange, changeSelectedOwnershipChange } = useENS();
  const { handleSidebarChange } = useSidebar();

  const [ensName, setEnsName] = useState<string | null>(null);
  const [resolving, setResolving] = useState<boolean>(false);

  const change = selectedOwnershipChange?.data ?? null;

  useEffect(() => {
    if (!change) return;
    let cancelled = false;
    setResolving(true);
    setEnsName(null);
    viemClient
      .getEnsName({ address: change.ownerAddress as `0x${string}` })
      .then((name) => {
        if (!cancelled) setEnsName(name);
      })
      .catch(() => {
        if (!cancelled) setEnsName(null);
      })
      .finally(() => {
        if (!cancelled) setResolving(false);
      });
    return () => {
      cancelled = true;
    };
  }, [change?.ownerAddress]);

  if (!change) return null;

  const handleClose = () => {
    changeSelectedOwnershipChange(null);
    handleSidebarChange(false);
  };

  const renderRow = (label: string, value: React.ReactNode) => (
    <>
      <div className="text-sm text-muted-foreground">{label}</div>
      {typeof value === 'string' || typeof value === 'number' ? (
        <div className="font-medium">{value}</div>
      ) : (
        value
      )}
    </>
  );

  const renderExternalLink = (url: string, text: string) => (
    <div className="flex items-center place-content-between">
      <Link href={url} target="_blank" className="w-full flex place-content-between cursor-pointer">
        <div className="font-medium flex flex-col">
          <span className="my-auto underline">{text}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer">
          <ExternalLink size={12} />
        </Button>
      </Link>
    </div>
  );

  return (
    <Sidebar variant="sidebar" side="right">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            {change.isWrapped ? <Lock className="h-5 w-5" /> : <User className="h-5 w-5" />}
            Ownership Change
          </h3>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X size={18} />
          </Button>
        </div>
        <div>
          <div className="p-3 text-xs rounded-md border space-y-1">
            {change.timestamp &&
              renderRow(
                'Timestamp',
                `${formatDate(change.timestamp)} ${formatTime(change.timestamp)}`
              )}
            {renderRow(
              'Owner',
              <div className="font-medium">
                {resolving ? (
                  <Skeleton className="h-3 w-32" />
                ) : (
                  <div className="flex flex-col gap-1">
                    {ensName && (
                      <span className="font-mono text-xs underline decoration-dotted">
                        {ensName}
                      </span>
                    )}
                    {renderExternalLink(
                      `https://etherscan.io/address/${change.ownerAddress}`,
                      `${change.ownerAddress.substring(0, 25)}...`
                    )}
                  </div>
                )}
              </div>
            )}
            {renderRow('Block Number', change.blockNumber.toLocaleString())}
            {renderRow(
              'Transaction Hash',
              renderExternalLink(
                `https://etherscan.io/tx/${change.transactionID}`,
                `${change.transactionID.substring(0, 25)}...`
              )
            )}
            {renderRow(
              'Type',
              <Badge variant="outline" className="font-mono text-[10px]">
                {change.isWrapped ? 'Wrapped Transfer' : 'New Owner'}
              </Badge>
            )}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2" />
    </Sidebar>
  );
};

export default OwnershipChangeSidebar;
