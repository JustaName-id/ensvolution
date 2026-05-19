import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import React, { memo } from 'react';
import { CalendarPlus, CalendarClock, CalendarX } from 'lucide-react';
import { LifecycleNode as LifecycleNodeType } from '@ensvolution/types';
import { useENS } from '@/providers/ENSProvider';
import { useSidebar } from '@ensvolution/ui/components/sidebar';

function formatDate(timestamp?: string) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const KIND_STYLES = {
  registration: {
    label: 'Registered',
    icon: CalendarPlus,
    border: 'border-emerald-300',
    bg: 'bg-emerald-50',
    hoverBg: 'hover:bg-emerald-100',
    text: 'text-emerald-700',
    ring: 'ring-emerald-300',
    selectedBorder: 'border-emerald-500',
  },
  renewal: {
    label: 'Renewed',
    icon: CalendarClock,
    border: 'border-sky-300',
    bg: 'bg-sky-50',
    hoverBg: 'hover:bg-sky-100',
    text: 'text-sky-700',
    ring: 'ring-sky-300',
    selectedBorder: 'border-sky-500',
  },
  expiry: {
    label: 'Expires',
    icon: CalendarX,
    border: 'border-rose-300 border-dashed',
    bg: 'bg-rose-50',
    hoverBg: 'hover:bg-rose-100',
    text: 'text-rose-700',
    ring: 'ring-rose-300',
    selectedBorder: 'border-rose-500',
  },
} as const;

const LifecycleNode = ({ data, id }: NodeProps<LifecycleNodeType>) => {
  const { selectedLifecycle, changeSelectedLifecycle } = useENS();
  const { handleSidebarChange } = useSidebar();
  const { fitView } = useReactFlow();

  const style = KIND_STYLES[data.kind];
  const Icon = style.icon;

  const primaryDate = formatDate(data.timestamp);
  const newExpiry = data.kind === 'renewal' ? formatDate(data.expiryDate) : null;

  const isSelected = selectedLifecycle?.id === id;

  const handleClick = () => {
    fitView({ nodes: [{ id }], duration: 1000, maxZoom: 1 });
    if (isSelected) {
      changeSelectedLifecycle(null);
      handleSidebarChange(false);
    } else {
      changeSelectedLifecycle({ id, data });
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
        aria-label={`${style.label} on ${primaryDate ?? 'unknown date'}`}
        aria-pressed={isSelected}
        className={`w-[200px] rounded-md border ${style.bg} ${style.hoverBg} shadow-sm px-3 py-2 cursor-pointer transition-colors focus:outline-none focus:ring-2 ${style.ring} ${
          isSelected ? `${style.selectedBorder} ring-2 ${style.ring}` : style.border
        }`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wide ${style.text}`}>
          <Icon className="h-3 w-3" />
          {style.label}
        </div>
        {primaryDate && (
          <div className="mt-1 text-sm font-medium text-gray-800">{primaryDate}</div>
        )}
        {newExpiry && (
          <div className="text-[11px] text-gray-500 mt-0.5">
            new expiry: <span className="font-mono">{newExpiry}</span>
          </div>
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

export default memo(LifecycleNode);
