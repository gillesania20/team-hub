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
        searchTeam: build.mutation({
            query: ({teamName}) => ({
                url: `${teamApiRoute}/search-team/${teamName}`,
                method: 'GET'
            })
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
        }),
        deleteTeam: build.mutation({
            query: ({teamID}) => ({
                url: `${teamApiRoute}/${teamID}`,
                method: 'DELETE'
            })
        })
    })
});
export const {
    useGetTeamQuery,
    useSearchTeamMutation,
    useAddTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation
} = teamApi;