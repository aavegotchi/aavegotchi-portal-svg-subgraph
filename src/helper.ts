import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Contract } from "../generated/Contract/Contract";
import { Portal } from "../generated/schema";
import { AAVEGOTCHI_DIAMOND } from "./constants";

export function getOrCreatePortal(portalId: BigInt): Portal {
    let id = portalId.toString();
    let entity = Portal.load(id);
    if(!entity) {
        entity = new Portal(id);
        entity.svgs = [];
    }
    return entity;
}

export function fetchPortalSvgs(id: BigInt): Array<string> {
    let contract = Contract.bind(Address.fromString(AAVEGOTCHI_DIAMOND));
    let svgsData = contract.try_portalAavegotchisSvg(id);
    if(svgsData.reverted) {
        return [];
    }

    let svgs = svgsData.value;
    return svgs;
}
