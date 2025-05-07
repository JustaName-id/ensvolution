import { getTextRecordIcon, getChainIcon, getContentHashIcon} from '@justweb3/widget'
import {getCoinTypeDetails, SupportedCoins} from "@justaname.id/sdk";
import {ProfileStateWithChanges} from "@ensvolution/types";
import { ReactNode } from 'react';

export const getColor = (eventType: ProfileStateWithChanges["eventType"])=>{
  switch (eventType) {
    case "text":
      return "#E47318";
    case "addr":
      return "#2DCCC1";
    case "resolver":
      return "#efe830";
    case "multi":
      return "#B613C9";
    case "contentHash":
      return "#de296e";
    default:
      return "#e0e0e0";
  }
}

export const getColorByProfile = (data: ProfileStateWithChanges): string => {
  return getColor(data.eventType);
};


export const getRecordTypeIcon = (recordType: string, recordKey: string): ReactNode => {

  let element: React.ReactNode = null;
  switch (recordType) {
    case "text":
      element = getTextRecordIcon(recordKey)
      break;
    case "addr":
      element = getChainIcon(getCoinTypeDetails(recordKey as  SupportedCoins).symbol);
      break;
    case "resolver":
      element = getTextRecordIcon(recordKey)
      break;
    case "contentHash":
      element = getContentHashIcon(recordKey)
      break;
    default:
      element = getTextRecordIcon(recordKey);
  }

  if(element &&
    typeof element === 'object' &&
    'props' in element &&
    element.props &&
    typeof element.props === 'object' &&
    'children' in element.props &&
    element.props.children === "?"){
    return null
  }


  return element;
};


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Unknown Date' : date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? 'Unknown Time' : date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const truncateString = (str: string, startLength = 6, endLength = 4): string => {
  if (!str) return "";
  if (str.length <= startLength + endLength) return str;

  return `${str.substring(0, startLength)}...${str.substring(str.length - endLength)}`;
};
