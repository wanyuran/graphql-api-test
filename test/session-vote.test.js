import {client, CANCEL_SESSION_VOTE, ADD_SESSION_VOTE, GET_SESSION} from "./requests";

const sessionId = 30;

describe("scenario: user vote for the exact session and then cancel the vote", () => {

    test('user check the exact session', async () => {
        const res = await client
            .query({
                query: GET_SESSION,
                variables: {
                    sessionId: sessionId
                }
            });
        // console.log("+++++++++++\n", res.data, "\n+++++++++");
        expect(res.data.session.title).toEqual('Python爬虫');
    });

    test('vote for the exact session', async () => {
        const res = await client
                .mutate({
                    mutation: ADD_SESSION_VOTE,
                    variables: {
                        sessionId: sessionId
                    }
                });
        // console.log("+++++++++++\n", res.data, "\n+++++++++");
        expect(res.data.addApplicationNum).toBe(true);
    });

    test('cancel the vote for the exact session', async () => {
        const res = await client
            .mutate({
                mutation: CANCEL_SESSION_VOTE,
                variables: {
                    sessionId: sessionId
                }
            });
        // console.log("+++++++++++\n", res.data, "\n+++++++++");
        expect(res.data.deleteApplicationNum).toBe(true);
    });

});

