import { emptySplitApi as api } from "./emptyApi";
import connection from "../../services/signalr";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    lookupFollowUser: build.mutation<
      LookupFollowUserApiResponse,
      LookupFollowUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/lookup/me/follow/${queryArg.userToFollowId}`,
        method: "POST",
      }),
    }),
    lookupGetFollowersList: build.query<
      LookupGetFollowersListApiResponse,
      LookupGetFollowersListApiArg
    >({
      query: () => ({ url: `/api/v1/lookup/me/followers` }),
    }),
    lookupGetFollowingList: build.query<
      LookupGetFollowingListApiResponse,
      LookupGetFollowingListApiArg
    >({
      query: () => ({ url: `/api/v1/lookup/me/following` }),
    }),
    lookupGetReceivedMessages: build.query<
      LookupGetReceivedMessagesApiResponse,
      LookupGetReceivedMessagesApiArg
    >({
      query: () => ({ url: `/api/v1/lookup/me/messages` }),
      async onCacheEntryAdded(args,
                              {cacheDataLoaded, cacheEntryRemoved, updateCachedData},
      ){
        try {
          await cacheDataLoaded;
          connection.on("lookupReceived", (message: LookupMessage) => {
            console.log(message.content)
            updateCachedData((draft) => {
              /* For editing lookups
              const index = draft.findIndex(msg => msg.id == message.id);
              if(index > -1) {
                draft[index] = message;
              } else {
                draft.push(message);
              }
              */
              draft.push(message);
            })
          })
        } catch {

        }
      }
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
    weatherGet: build.query<WeatherGetApiResponse, WeatherGetApiArg>({
      query: () => ({ url: `/api/v1/weather` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as webApi };
export type LookupFollowUserApiResponse = unknown;
export type LookupFollowUserApiArg = {
  userToFollowId: string;
};
export type LookupGetFollowersListApiResponse =
  /** status 200  */ LookupMessage[];
export type LookupGetFollowersListApiArg = void;
export type LookupGetFollowingListApiResponse =
  /** status 200  */ LookupMessage[];
export type LookupGetFollowingListApiArg = void;
export type LookupGetReceivedMessagesApiResponse =
  /** status 200  */ LookupMessage[];
export type LookupGetReceivedMessagesApiArg = void;
export type LookupPostLookupApiResponse = unknown;
export type LookupPostLookupApiArg = {
  createLookupModel: CreateLookupModel;
};
export type LookupEditLookupApiResponse = unknown;
export type LookupEditLookupApiArg = {
  id: string;
  editLookupModel: EditLookupModel;
};
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
export type Weather = {
  id?: number;
  temp?: number;
};
export const {
  useLookupFollowUserMutation,
  useLookupGetFollowersListQuery,
  useLookupGetFollowingListQuery,
  useLookupGetReceivedMessagesQuery,
  useLookupPostLookupMutation,
  useLookupEditLookupMutation,
  useWeatherGetQuery,
} = injectedRtkApi;
