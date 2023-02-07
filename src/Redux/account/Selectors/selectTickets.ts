import { Ticket } from "models/Ticket";
import { createSelector } from "reselect";
import { selectAccountState } from "./selectAccountState";

export const selectTickets = createSelector([selectAccountState], (accountState): Ticket[] => accountState.tickets);
