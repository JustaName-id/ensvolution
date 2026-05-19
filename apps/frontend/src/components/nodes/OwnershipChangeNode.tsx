import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import React, { memo, useEffect, useState } from 'react';
import { Lock, User } from 'lucide-react';
import { OwnershipChangeNode as OwnershipChangeNodeType } from '@ensvolution/types';
import { useENS } from '@/providers/ENSProvider';
import { useSidebar } from '@ensvolution/ui/components/sidebar';
import { viemClient } from '@/config/viemClient';

function formatAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function formatDate(timestamp?: string) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const OwnershipChangeNode = ({ data, id }: NodeProps<OwnershipChangeNodeType>) => {
  const { selectedOwnershipChange, changeSelectedOwnershipChange } = useENS();
  const { handleSidebarChange } = useSidebar();
  const { fitView } = useReactFlow();

  const [ensName, setEnsName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    viemClient
      .getEnsName({ address: data.ownerAddress as `0x${string}` })
      .then((name) => {
        if (!cancelled) setEnsName(name);
      })
      .catch(() => {
        if (!cancelled) setEnsName(null);
      });
    return () => {
      cancelled = true;
    };
  }, [data.ownerAddress]);

  const display = ensName ?? formatAddress(data.ownerAddress);
  const dateLabel = formatDate(data.timestamp);

  const isSelected = selectedOwnershipChange?.id === id;

  const handleClick = () => {
    fitView({ nodes: [{ id }], duration: 1000, maxZoom: 1 });
    if (isSelected) {
      changeSelectedOwnershipChange(null);
      handleSidebarChange(false);
    } else {
      changeSelectedOwnershipChange({ id, data });
      handleSidebarChange(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Ownership change to ${display} at block ${data.blockNumber}`}
        aria-pressed={isSelected}
        className={`w-[200px] rounded-md border bg-amber-50 shadow-sm px-3 py-2 cursor-pointer hover:bg-amber-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          isSelected ? 'border-amber-500 ring-2 ring-amber-300' : 'border-amber-300'
        }`}
        title={data.ownerAddress}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-amber-700">
          {data.isWrapped ? <Lock className="h-3 w-3" /> : <User className="h-3 w-3" />}
          Owner change
        </div>
        <div className="mt-1 text-sm font-medium text-gray-800 truncate">
          {display}
        </div>
        {dateLabel && (
          <div className="text-[11px] text-gray-500 mt-0.5">{dateLabel}</div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="source"
        style={{ visibility: 'hidden' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        style={{ visibility: 'hidden' }}
      />
    </>
  );
};

export default memo(OwnershipChangeNode);
