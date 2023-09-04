import { api } from './../api/apiSlice';
const membershipApiRoute = 'memberships';
const membershipApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMembership: build.query({
            query: ({teamID}) => ({
                url: `${membershipApiRoute}/get-single/${teamID}`,
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
    useGetMembershipQuery,
    useAddMembershipMutation,
    useDeleteMembershipMutation
} = membershipApi;