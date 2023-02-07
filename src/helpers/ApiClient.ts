import { AccessKey } from "models/AccessKey";
import { GetBandwidthAnalyticsRep, GetStorageUsageAnalyticsRep } from "models/Analytics";
import { NotificationRep } from "models/Notification";
import { Pagination } from "models/Pagination";
import { DeleteStakeRep, MakeStakeRep, Stake, StakingBody } from "models/Staking";
import { GetStatisticsRep } from "models/Statistics";
import { StakeId } from "models/TO_IDS";
import { apiGet, apiPost, authNodeClient, httpFormatDate, stakingClient, withParams } from "./HttpClient";

export class ApiClient {
  static getAccessKeys = () => {
    return apiGet<AccessKey[]>({ url: "/access-keys" }, { externalClient: authNodeClient, bearerAuth: true });
  };

  static getDashboardAccessKeys = () => {
    return apiGet<AccessKey>(
      { url: "/access-key-for-dashboard" },
      { externalClient: authNodeClient, bearerAuth: true }
    );
  };

  static getNotifications = (query: Pagination) => {
    const url = withParams("/notifications", query);
    return apiGet<NotificationRep>({ url });
  };

  static getStatisticsHome = async () => {
    return apiGet<GetStatisticsRep>({ url: "/statistics" });
  };

  static getStorageUsageAnalytics = async (from?: Date, to?: Date) => {
    const url = withParams("/storage-analytics", { fromDate: httpFormatDate(from), toDate: httpFormatDate(to) });
    return apiGet<GetStorageUsageAnalyticsRep>({ url });
  };

  static getBandwidthAnalytics = async (from?: Date, to?: Date) => {
    const url = withParams("/bandwidth-analytics", { fromDate: httpFormatDate(from), toDate: httpFormatDate(to) });
    return apiGet<GetBandwidthAnalyticsRep>({ url });
  };
}
export class StakingApiClient {
  static getStakingHistory = async () => {
    return apiGet<Stake[]>({ url: "/staking/history" }, { externalClient: stakingClient, bearerAuth: true });
  };

  static makeStake = async (stake: StakingBody) => {
    return apiPost<MakeStakeRep>(
      { url: "/staking/start", data: stake },
      { externalClient: stakingClient, bearerAuth: true }
    );
  };

  static cancelStake = async (id: StakeId) => {
    return apiPost<DeleteStakeRep>({ url: `/staking/stop/${id}` }, { externalClient: stakingClient, bearerAuth: true });
  };
}
