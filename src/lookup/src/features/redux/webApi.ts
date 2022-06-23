import { emptySplitApi as api } from "./emptyApi";
import connection from "../../services/signalr";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    lookupGetLookup: build.query<
      LookupGetLookupApiResponse,
      LookupGetLookupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/lookup/${queryArg.id}`,
        body: queryArg.body,
      }),
    }),
    lookupPostLookup: build.mutation<
      LookupPostLookupApiResponse,
      LookupPostLookupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/lookup`,
        method: "POST",
        body: queryArg.createLookupModel,
      }),
    }),
    lookupEditLookup: build.mutation<
      LookupEditLookupApiResponse,
      LookupEditLookupApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/lookup/edit/${queryArg.id}`,
        method: "POST",
        body: queryArg.editLookupModel,
      }),
    }),
    lookupGetMessagesFromUser: build.query<
      LookupGetMessagesFromUserApiResponse,
      LookupGetMessagesFromUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/lookup/${queryArg.userId}/messages`,
      }),
    }),
    lookupGetMessageThread: build.query<
      LookupGetMessageThreadApiResponse,
      LookupGetMessageThreadApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/lookup/${queryArg.lookupId}/thread`,
      }),
    }),
    userGetFollowersList: build.query<
      UserGetFollowersListApiResponse,
      UserGetFollowersListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/${queryArg.userId}/followers`,
      }),
    }),
    userGetFollowingList: build.query<
      UserGetFollowingListApiResponse,
      UserGetFollowingListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/userid:guid/following`,
        params: { userId: queryArg.userId },
      }),
    }),
    userGetUserInfo: build.query<
      UserGetUserInfoApiResponse,
      UserGetUserInfoApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/user/${queryArg.userId}` }),
    }),
    userFollowUser: build.mutation<
      UserFollowUserApiResponse,
      UserFollowUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/me/follow/${queryArg.userToFollowId}`,
        method: "POST",
      }),
    }),
    userGetReceivedMessages: build.query<
      UserGetReceivedMessagesApiResponse,
      UserGetReceivedMessagesApiArg
    >({
      query: () => ({ url: `/api/v1/user/me/messages` }),
      async onCacheEntryAdded(args,
                              {cacheDataLoaded, cacheEntryRemoved, updateCachedData},
      ){
        try {
          await cacheDataLoaded;
          connection.on("lookupReceived", (message: LookupMessage) => {
            updateCachedData((draft) => {
              let newMsg = draft.unshift(message);
              draft.push(message);
            })
          })
        } catch {

        }
      }
    }),
    userGetMeInfo: build.query<UserGetMeInfoApiResponse, UserGetMeInfoApiArg>({
      query: () => ({ url: `/api/v1/user/me` }),
    }),
    weatherGet: build.query<WeatherGetApiResponse, WeatherGetApiArg>({
      query: () => ({ url: `/api/v1/weather` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as webApi };
export type LookupGetLookupApiResponse = /** status 200  */ LookupMessage;
export type LookupGetLookupApiArg = {
  id: string;
  body: boolean;
};
export type LookupPostLookupApiResponse = unknown;
export type LookupPostLookupApiArg = {
  createLookupModel: CreateLookupModel;
};
export type LookupEditLookupApiResponse = unknown;
export type LookupEditLookupApiArg = {
  id: string;
  editLookupModel: EditLookupModel;
};
export type LookupGetMessagesFromUserApiResponse =
  /** status 200  */ LookupMessage[];
export type LookupGetMessagesFromUserApiArg = {
  userId: string;
};
export type LookupGetMessageThreadApiResponse =
  /** status 200  */ LookupMessage[];
export type LookupGetMessageThreadApiArg = {
  lookupId: string;
};
export type UserGetFollowersListApiResponse = /** status 200  */ User[];
export type UserGetFollowersListApiArg = {
  userId: string;
};
export type UserGetFollowingListApiResponse = /** status 200  */ User[];
export type UserGetFollowingListApiArg = {
  userId?: string;
};
export type UserGetUserInfoApiResponse = /** status 200  */ User;
export type UserGetUserInfoApiArg = {
  userId: string;
};
export type UserFollowUserApiResponse = unknown;
export type UserFollowUserApiArg = {
  userToFollowId: string;
};
export type UserGetReceivedMessagesApiResponse =
  /** status 200  */ LookupMessage[];
export type UserGetReceivedMessagesApiArg = void;
export type UserGetMeInfoApiResponse = /** status 200  */ User;
export type UserGetMeInfoApiArg = void;
export type WeatherGetApiResponse = /** status 200  */ Weather;
export type WeatherGetApiArg = void;
export type LookupMessage = {
  id?: string;
  content?: string;
  publisherUserId?: string;
  publisherUsername?: string;
  timestamp?: string;
  likes?: number;
  edited?: boolean;
  replyId?: string | null;
  editedTimetamp?: string | null;
};
export type CreateLookupModel = {
  content?: string;
  edited?: boolean;
  replyId?: string | null;
};
export type EditLookupModel = {
  content?: string;
};
export type User = {
  username?: string;
  avatarUrl?: string;
  headerUrl?: string;
  bio?: string;
  location?: string;
  joinedDate?: string;
  followersCount?: number;
  followingCount?: number;
  lookupsCount?: number;
};
export type Weather = {
  id?: number;
  temp?: number;
};
export const {
  useLookupGetLookupQuery,
  useLookupPostLookupMutation,
  useLookupEditLookupMutation,
  useLookupGetMessagesFromUserQuery,
  useLookupGetMessageThreadQuery,
  useUserGetFollowersListQuery,
  useUserGetFollowingListQuery,
  useUserGetUserInfoQuery,
  useUserFollowUserMutation,
  useUserGetReceivedMessagesQuery,
  useUserGetMeInfoQuery,
  useWeatherGetQuery,
} = injectedRtkApi;
