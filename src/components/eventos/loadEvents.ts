import client from "../../../tina/__generated__/client";
import { sortEvents, toEventSummary, type EventSummary } from "./eventData";

export async function loadEvents(): Promise<EventSummary[]> {
  const result = await client.queries.eventConnection({ first: 200 });
  const nodes = (result.data?.eventConnection?.edges ?? []).map((edge: any) => edge?.node).filter(Boolean);
  return sortEvents(nodes.map(toEventSummary));
}
