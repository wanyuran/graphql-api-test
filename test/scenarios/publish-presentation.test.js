import {client, PUBLISH_PRESENTATION, GET_PRESENTATIONS, DELETE_PRESENTATION} from "../requests";

describe("scenario 4: user publish a presentation and then delete it", () => {
    const random = Math.floor(Math.random() * 1000);
    const title = "api-test-presentation-title" + random;
    const description = "api-test-presentation-description" + random;
    const presenter = "wyr-test";
    const presentationStartDate = Date.UTC(2020, 4, 26, 11, 30).toString();
    const presentationEndDate = Date.UTC(2020, 4, 26, 12, 30).toString();
    const orderMealDeadline = Date.UTC(2020, 4, 25, 18, 30).toString();
    const onlinePresentation = "12345678";
    const offlinePresentation = "Shenzhen Office";
    const teamId = 24;
    let presentationId;

    test("user publish a presentation", async () => {
        const res = await client
            .mutate({
                mutation: PUBLISH_PRESENTATION,
                variables: {
                    title: title,
                    description: description,
                    presenter: presenter,
                    presentationStartDate: presentationStartDate,
                    presentationEndDate: presentationEndDate,
                    offlinePresentation: offlinePresentation,
                    onlinePresentation: onlinePresentation,
                    teamId: teamId,
                    orderMealDeadline: orderMealDeadline
                }
            });
        presentationId = res.data.createPresentation.id;
        console.log("______________\n", res.data, "\ntitle:" + title, "\ndescription:" + description, "\nsessionId:" + presentationId, "\n____________");
        expect(presentationId).not.toBeUndefined();
    });


    test("presentation published displayed in the presentation list", async () => {
        let cursor = "";
        let presentations = [];
        let hasNextPage;

        do {
            let res = await client
                .query({
                    query: GET_PRESENTATIONS,
                    variables: {
                        teamId: teamId,
                        cursor: cursor,
                        first: 5
                    }
                });
            console.log("++++++++++\n" + JSON.stringify(res.data) + "\n++++++++++");

            let presentationArr = res.data.getPresentationsByTeamId.edges;
            hasNextPage = res.data.getPresentationsByTeamId.pageInfo.hasNextPage;
            cursor = presentationArr[presentationArr.length - 1].cursor;
            console.log("\n", "cursor:" + cursor, "\n", "hasNextPage:" + hasNextPage, "\n");

            for (let i = 0; i < presentationArr.length; i++) {
                presentations.push(res.data.getPresentationsByTeamId.edges[i].node.title);
            }
        }
        while (hasNextPage);

        console.log("++++++++++\n" + presentations + "\n++++++++++");
        expect(presentations).toContain(title);
    });

    test("delete the presentation published", async () => {
        const res = await client
            .mutate({
                mutation: DELETE_PRESENTATION,
                variables: {
                    sessionId: presentationId
                }
            });
        console.log("______________\n", res.data, "\nsessionId:" + presentationId, "\n____________");
        expect(res.data.deletePresentation).toBe(true);
    })
});