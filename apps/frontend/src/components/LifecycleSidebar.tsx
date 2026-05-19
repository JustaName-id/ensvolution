"use client"

import React from 'react';
import { CalendarClock, CalendarPlus, CalendarX, ExternalLink, X } from 'lucide-react';
import { Button } from '@ensvolution/ui/components/button';
import { Badge } from '@ensvolution/ui/components/badge';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from '@ensvolution/ui/components/sidebar';
import { useENS } from '@/providers/ENSProvider';
import { formatDate, formatTime } from '@ensvolution/helpers';

const KIND_META = {
  registration: { label: 'Registration', icon: CalendarPlus },
  renewal: { label: 'Renewal', icon: CalendarClock },
  expiry: { label: 'Current Expiry', icon: CalendarX },
} as const;

const LifecycleSidebar: React.FC = () => {
  const { selectedLifecycle, changeSelectedLifecycle } = useENS();
  const { handleSidebarChange } = useSidebar();

  const event = selectedLifecycle?.data ?? null;
  if (!event) return null;

  const meta = KIND_META[event.kind];
  const Icon = meta.icon;

  const handleClose = () => {
    changeSelectedLifecycle(null);
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

  const dateLabel = event.kind === 'expiry' ? 'Expires' : 'Timestamp';

  return (
    <Sidebar variant="sidebar" side="right">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {meta.label}
          </h3>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X size={18} />
          </Button>
        </div>
        <div>
          <div className="p-3 text-xs rounded-md border space-y-1">
            {renderRow(
              dateLabel,
              `${formatDate(event.timestamp)} ${formatTime(event.timestamp)}`
            )}
            {event.kind === 'renewal' && event.expiryDate &&
              renderRow(
                'New Expiry',
                `${formatDate(event.expiryDate)} ${formatTime(event.expiryDate)}`
              )}
            {event.kind === 'registration' && event.expiryDate &&
              renderRow(
                'Initial Expiry',
                `${formatDate(event.expiryDate)} ${formatTime(event.expiryDate)}`
              )}
            {event.blockNumber !== undefined &&
              renderRow('Block Number', event.blockNumber.toLocaleString())}
            {event.transactionID &&
              renderRow(
                'Transaction Hash',
                renderExternalLink(
                  `https://etherscan.io/tx/${event.transactionID}`,
                  `${event.transactionID.substring(0, 25)}...`
                )
              )}
            {renderRow(
              'Event',
              <Badge variant="outline" className="font-mono text-[10px]">
                {meta.label}
              </Badge>
            )}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2" />
    </Sidebar>
  );
};

export default LifecycleSidebar;
