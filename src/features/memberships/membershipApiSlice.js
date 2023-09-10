import { api } from './../api/apiSlice';
const membershipApiRoute = 'memberships';
const membershipApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllMemberships: build.query({
            query: () => ({
                url: `${membershipApiRoute}`,
                method: 'GET'
            })
        }),
        getMembership: build.query({
            query: ({teamID}) => ({
                url: `${membershipApiRoute}/get-single-membership/${teamID}`,
                method: 'GET'
            })
        }),
        getCheckMembership: build.query({
            query: ({userID, teamID}) => ({
                url: `${membershipApiRoute}/check-membership/${userID}/${teamID}`,
                method: 'GET'
            })
        }),
        addMembership: build.mutation({
            query: ({teamID}) => ({
                url: `${membershipApiRoute}`,
                method: 'POST',
                body: {
                    teamID
                }
            })
        }),
        deleteMembership: build.mutation({
            query: ({membershipID}) => ({
                url: `${membershipApiRoute}/${membershipID}`,
                method: 'DELETE'
            })
        })
    })
});
export const {
    useGetAllMembershipsQuery,
    useGetMembershipQuery,
    useGetCheckMembershipQuery,
    useAddMembershipMutation,
    useDeleteMembershipMutation
} = membershipApi;