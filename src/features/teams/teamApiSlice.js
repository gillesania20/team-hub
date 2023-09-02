import { api } from './../api/apiSlice';
const teamApiRoute = 'teams';
const teamApi = api.injectEndpoints({
    endpoints: (build) => ({
        addTeam: build.mutation({
            query: ({name}) => ({
                url: `${teamApiRoute}`,
                method: 'POST',
                body: {
                    name
                }
            })
        })
    })
});
export const {
    useAddTeamMutation
} = teamApi;