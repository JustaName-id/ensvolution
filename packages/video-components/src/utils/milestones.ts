import { ProfileRecord, ProfileStateWithChanges } from '@ensvolution/types';
import { GENERAL_FIELDS, SUPPORTED_SOCIALS } from '@justaname.id/sdk';

export function getFirstAvatar(profileStates: ProfileStateWithChanges[]) {
  for (const state of profileStates) {
    const found = (state.cumulativeRecords ?? []).find(
      (rec) => rec.key === 'avatar' && rec.value && rec.rawValue
    );
    if (found) return { record: found, timestamp: state.timestamp };
  }
  return null;
}

export function getFirstResolverChange(profileStates: ProfileStateWithChanges[]) {
  for (const state of profileStates) {
    if (state.id !== 0 && state.eventType === 'resolver' && state.resolverChange && state.resolverChange.address) {
      return {address: state.resolverChange.address, timestamp: state.timestamp};
    }
  }
  return null;
}

export function getFirstMultiChainAddress(profileStates: ProfileStateWithChanges[]) {
  for (const state of profileStates) {
    const found = (state.cumulativeRecords ?? []).find(
      rec => rec.type === 'addr' && rec.key !== "60"
    );
    if (found) return {record: found, timestamp: state.timestamp};
  }
  return null;
}

export function getFirstSocial(profileStates: ProfileStateWithChanges[]) {
  for (const state of profileStates) {
    const found = (state.cumulativeRecords ?? []).find(
      rec => SUPPORTED_SOCIALS.some(social => rec.key === social.identifier)
    );
    if (found) return {record: found, timestamp: state.timestamp};
  }
  return null;
}

export function getFirstContentHash(profileStates: ProfileStateWithChanges[]) {
  for (const state of profileStates) {
    const found = (state.cumulativeRecords ?? []).find(
      rec => rec.type === 'contentHash' && rec.value && rec.value !=="0x"
    );
    if (found) return {record: found, timestamp: state.timestamp};
  }
  return null;
}

export function getPowerUserMoment(profileStates: ProfileStateWithChanges[]) {
  for (const state of profileStates) {
    if (state.eventType !== 'resolver') {
      const changes = state.changes.added.length +  state.changes.deleted.length +  state.changes.updated.length
      if(changes > 1){
        return {count: changes, timestamp: state.timestamp};
      }
    }
  }
  return null;
}

export function getFirstCustomField(profileStates: ProfileStateWithChanges[]) {
  const customRecs: { record: ProfileRecord; timestamp: string}[] = [];
  for (const state of profileStates) {
    for (const rec of (state.cumulativeRecords ?? [])) {
      if(rec.type !=='text') continue;
      const k = rec.key?.toLowerCase();
      // if(k ==="snapshot") continue
      // if(k ==="eth.ens.delegate") continue
      if(!SUPPORTED_SOCIALS.some(social => social.identifier === k) && !GENERAL_FIELDS.some(field => field.identifier === k)) customRecs.push(
        {record:rec, timestamp: state.timestamp}
      )
    }
  }
  if (customRecs.length === 0) return null;
  return customRecs[0];
}

export function getStats(profileStates: ProfileStateWithChanges[]) {
  let addressChanges = 0, profileRecordChanges = 0, resolverChanges = 0, contentHashChanges = 0;
  for (const state of profileStates) {
    if(state.id===0) continue;
    if (state.eventType === 'resolver') {
      resolverChanges++;
      continue;
    }
    profileRecordChanges += (state.currentUpdatedRecords || []).filter(
      (rec) => rec.type === 'text'
    ).length;
    addressChanges += (state.currentUpdatedRecords || []).filter(
      (rec) => rec.type === 'addr'
    ).length;
    contentHashChanges += (state.currentUpdatedRecords || []).filter(
      (rec) => rec.type === 'contentHash'
    ).length;
  }
  return {addressChanges, profileRecordChanges, resolverChanges, contentHashChanges};
}

export function getProfileStart(profileStates: ProfileStateWithChanges[]) {
  const {timestamp} = profileStates[0] || {};
  return timestamp || null;
}
