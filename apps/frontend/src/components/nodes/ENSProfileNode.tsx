import { Handle, NodeProps, Position, useReactFlow } from '@xyflow/react';
import React, { memo } from 'react';
import { ENSProfileCard } from '@ensvolution/components/cards/ENSProfileCard';
import { ProfileNode } from '@ensvolution/types';
import { useENS } from '@/providers/ENSProvider';
import { useSidebar } from '@ensvolution/ui/components/sidebar';

const ENSProfileNode = ({data, id}: NodeProps<ProfileNode>) => {
  const {changeSelectedProfile, selectedProfile} = useENS();
  const {handleSidebarChange, isSidebarOpen} = useSidebar();
  const { fitView } = useReactFlow()

  const handleClick = () => {
    changeSelectedProfile(data);
    fitView({
      nodes: [{id}],
      duration: 1000,
      maxZoom: 1
    })
    if (selectedProfile?.id === data.id) {
      handleSidebarChange(!isSidebarOpen);
    } else {
      handleSidebarChange(true);
    }
  };

  return(
  <>
    <ENSProfileCard
      {...data}
      handleClick={handleClick}
      selected={(selectedProfile?.id === data.id && isSidebarOpen) }
    />

    <Handle
      type="source"
      position={Position.Right}
      id={`source-${id}`}
      style={{background: '#555', width: '8px', height: '8px'}}
    />

    <Handle
      type="target"
      position={Position.Left}
      id={`target-${id}`}
      style={{background: '#555', width: '8px', height: '8px'}}
    />
  </>)
}

export default memo(ENSProfileNode);
