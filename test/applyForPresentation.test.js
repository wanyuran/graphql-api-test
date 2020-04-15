const {gql} = require("apollo-boost");
const ApolloClient = require("apollo-client");
const fetch = require('node-fetch');

const client = new ApolloClient({
    uri: "https://dev.session.mobi/graphql",
    fetch: fetch
});
const ADD_APPLICATION = gql`
mutation ($sessionId: Int!) {
  addApplicationNum(id: $sessionId)
}
`;

test('apply for a presentation',async () => {
    // const res =await client
    //     .query({
    //         query: GET_SESSIONS,
    //         variables: {
    //             teamId: 24,
    //             first: 5,
    //             cursor: "4",
    //         },
    //     });
    const res = await client
        .mutate({
            mutation: ADD_APPLICATION,
            variables: {
                sessionId: 30
            }
    })
    console.log("+++++++",res.data);
    // t.is(res.data.getSessionByTeamId.id, '1'
    // expect(res.data.addApplicationNum).toBe(true)
});