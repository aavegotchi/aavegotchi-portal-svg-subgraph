import {
  OpenPortals,
  PortalOpened
} from "../generated/Contract/Contract"
import { fetchPortalSvgs, getOrCreatePortal} from "./helper"



export function handlePortalOpened(event: PortalOpened): void {
  let id = event.params.tokenId;
  let entity = getOrCreatePortal(event.params.tokenId);
  let svgs = fetchPortalSvgs(id);
  entity.svgs = svgs;
  entity.save();
}

export function handleOpenPortals(event: OpenPortals): void {
  let ids = event.params._tokenIds;
  for(let i=0; i<ids.length; i++) {
    let id = ids[i];
    let entity = getOrCreatePortal(id);
    let svgs = fetchPortalSvgs(id);
    entity.svgs = svgs;
    entity.save();
  }
}
