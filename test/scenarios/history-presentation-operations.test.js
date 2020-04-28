import {client} from "../../helper/requests";
import {
    UPDATE_DOCUMENT_URL,
    UPDATE_FEEDBACK_URL,
    GET_HISTORY_PRESENTATIONS,
    GET_PRESENTATION_IN_HISTORY
} from "../../helper/presentation";

describe("scenario 6: team creator check the exact presentation in history and update its file address & feedback url", () => {
    const teamId = 24;
    const now = new Date().getTime();
    const documentUrl = "https://drive.google.com/drive/folders/62pF9O0BOhUbg7";
    const feedbackUrl = "https://jinshuju.net/forms/aZHJgw";
    let presentationsInHistoryId = [];
    let presentationsInHistory = [];

    test("check the presentations in history list", async () => {
        let cursor = "";
        let hasNextPage;
        let presentationsInHistoryCreatedTime = [];

        do {
            const res = await client
                .query({
                    query: GET_HISTORY_PRESENTATIONS,
                    variables: {
                        teamId: teamId,
                        first: 5,
                        cursor: cursor
                    }
                });

            let paginationResult = res.data.getPresentationsByTeamId;
            cursor = paginationResult.edges[paginationResult.edges.length - 1].cursor;
            hasNextPage = paginationResult.pageInfo.hasNextPage;

            for (let i = 0; i < paginationResult.edges.length; i++) {
                presentationsInHistory.push(paginationResult.edges[i].node.title);
                presentationsInHistoryId.push(paginationResult.edges[i].node.id);
                presentationsInHistoryCreatedTime.push(paginationResult.edges[i].node.createdAt);
            }
        }
        while (hasNextPage);

        // console.log("-------------results are:-------------\n", presentationsInHistory);
        // console.log("-------------results are:-------------\n", presentationsInHistoryId);
        console.log("-------------results are:-------------\n", presentationsInHistoryCreatedTime);
        console.log("------------- now:-------------\n", now);

        presentationsInHistoryCreatedTime.forEach(item => {
            expect(parseInt(item)).toBeLessThan(now);
        })
    });

    test("check the first presentation in history", async () => {
        const res = await client
            .query({
                query: GET_PRESENTATION_IN_HISTORY,
                variables: {
                    sessionId: presentationsInHistoryId[0]
                }
            });
        console.log("_____________\n", res.data, "\n_____________");
        expect(res.data.presentation.title).toEqual(presentationsInHistory[0]);
    });

    test("update the first presentation document url", async () => {
        const res = await client
            .mutate({
                mutation: UPDATE_DOCUMENT_URL,
                variables: {
                    id: presentationsInHistoryId[0],
                    value: documentUrl
                }
            });
        expect(res.data.updateDocumentUrl).toEqual(true);
    });

    test("update the first presentation feedback url", async () => {
        const res = await client
            .mutate({
                mutation: UPDATE_FEEDBACK_URL,
                variables: {
                    id: presentationsInHistoryId[0],
                    value: feedbackUrl
                }
            });
        expect(res.data.updateFeedbackUrl).toEqual(true);
    });
})