import { api } from './../api/apiSlice';
const teamApiRoute = 'teams';
const teamApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTeam: build.query({
            query: ({teamID}) => ({
                url: `${teamApiRoute}/${teamID}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response.team;
            }
        }),
        addTeam: build.mutation({
            query: ({name}) => ({
                url: `${teamApiRoute}`,
                method: 'POST',
                body: {
                    name
                }
            })
        }),
        updateTeam: build.mutation({
            query: ({teamID, name}) => ({
                url: `${teamApiRoute}/${teamID}`,
                method: 'PATCH',
                body: {
                    name
                }
            })
        })
    })
});
export const {
    useGetTeamQuery,
    useAddTeamMutation,
    useUpdateTeamMutation
} = teamApi;