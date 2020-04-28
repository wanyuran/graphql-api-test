import { EDIT_SESSION, SEARCH_SESSION} from "../../../helper/session";
import { EDIT_PRESENTATION } from "../../../helper/presentation";
import {client} from "../../../helper/requests";

describe("scenario 5: publisher use the keyword to search the matched sessions & presentations, then edit the first of them", () => {
    let targetSessions = [];
    let targetPresentations = [];
    const random = Math.floor(Math.random() * 1000);
    const title = "api-test-title" + random;
    const description = "api-test-description" + random;
    const presenter = "wyr-test";
    const teamId = 24;
    const offlinePresentation = "ChengDu office";
    const onlinePresentation = "22222222";
    const presentationStartDate = new Date(2020,5,30,14,30).getTime().toString();
    const presentationEndDate = new Date(2020,5,30,15,30).getTime().toString();
    const orderMealDeadline = new Date(2020,5,29,18,30).getTime().toString();

    test("publisher use the keyword to search the matched sessions & presentations", async () => {
        const keyword = "test";
        let cursor = "";
        let results = [];
        let hasNextPage;

        do {
            let res = await client
                .query({
                    query: SEARCH_SESSION,
                    variables: {
                        keyword: keyword,
                        first: 5,
                        cursor: cursor
                    }
                });
            // console.log("---------------response:-----------------\n", JSON.stringify(res.data));

            let resultPage = res.data.searchSessionPresentation;
            hasNextPage = resultPage.pageInfo.hasNextPage;
            cursor = resultPage.edges[resultPage.edges.length - 1].cursor;
            // console.log("\ncursor: " + cursor, "\nhasNextPage: " + hasNextPage);

            for (let i = 0; i < resultPage.edges.length; i++) {
                results.push(resultPage.edges[i].node.title);

                let resultType = resultPage.edges[i].node.__typename;
                let id  = resultPage.edges[i].node.id;
                if (resultType === "Session" ) {
                    targetSessions.push(id);
                } else if(resultType === "Presentation") {
                    targetPresentations.push(id);
                }
            }
        }
        while (hasNextPage);

        // console.log("\n---------------search result is:-----------------\n", results);

        results.forEach(item => {
            expect(item).toEqual(expect.stringContaining(keyword));
        });
    });

    test("edit the first searched session and update", async () => {
        const res = await client
            .mutate({
                mutation: EDIT_SESSION,
                variables: {
                    id: targetSessions[0],
                    title: title,
                    description: description,
                    teamId: teamId,

                }
            });
        // console.log("___________\n", res.data, "\n____________");

        expect(res.data.updateSession.id).toEqual(targetSessions[0]);
        expect(res.data.updateSession.__typename).toEqual('Session');
    });


    test("edit the first searched presentation and update", async () => {
        const res = await client
            .mutate({
                mutation: EDIT_PRESENTATION,
                variables: {
                    id: targetPresentations[0],
                    title: title,
                    description: description,
                    teamId: teamId,
                    presenter: presenter,
                    onlinePresentation: onlinePresentation,
                    offlinePresentation: offlinePresentation,
                    presentationStartDate: presentationStartDate,
                    presentationEndDate: presentationEndDate,
                    orderMealDeadline: orderMealDeadline
                }
            });
        // console.log("___________\n", res.data, "\n____________");
        expect(res.data.updatePresentation.id).toEqual(targetPresentations[0]);
        expect(res.data.updatePresentation.__typename).toEqual('Presentation');
    });

})