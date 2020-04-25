import {client, GET_PRESENTATION, ADD_PRESENTATION_VOTE, CANCEL_PRESENTATION_VOTE} from "../requests";

describe("scenario 2: user vote for the exact presentation and then cancel the vote", () => {
    const presentationId = 30;

    test("user check the exact presentation", async () => {
        const res = await client
            .query({
                query: GET_PRESENTATION,
                variables: {
                    sessionId : presentationId
                }
            });
        // console.log("______________\n", res.data,  "\n____________");
        expect(res.data.presentation.title).toEqual("Python爬虫");
    });

    test("vote for the exact presentation", async () => {
        const res = await client
            .mutate({
                mutation: ADD_PRESENTATION_VOTE,
                variables: {
                    sessionId: presentationId
                }
            });
        // console.log("______________\n", res.data,  "\n____________");
        expect(res.data.addApplicationNum).toBe(true);
    });

    test("cancel the vote for the exact presentation", async () => {
        const res = await client
            .mutate({
                mutation: CANCEL_PRESENTATION_VOTE,
                variables: {
                    sessionId: presentationId
                }
            });
        // console.log("______________\n", res.data,  "\n____________");
        expect(res.data.deleteApplicationNum).toBe(true);
    })

});
