import {client, PUBLISH_SESSION, GET_SESSIONS, DELETE_SESSION} from "../requests";


describe("scenario 3: user publish a session and then delete it", () => {
    const random = Math.floor(Math.random() * 1000);
    const title = "api-test" + random;
    const description = "api-test" + random;
    const teamId = 24;
    let sessionId;

    test("publish a session", async () => {
        const res = await client
            .mutate({
                mutation: PUBLISH_SESSION,
                variables: {
                    title: title,
                    description: description,
                    teamId: teamId
                }
            });
        // console.log("______________\n", res.data, "title:" + title, "description:" + description, "\n____________");
        sessionId = res.data.createSession.id;
        expect(res.data.createSession.id).not.toBeNull();
    });

    test("session published displayed in the session list", async () => {
        // let res = {
        //     "data": {
        //         "getSessionsByTeamId": {
        //             "totalCount": 0,
        //             "edges": [{
        //                 "node": {
        //                     "id": 0,
        //                     "title": null,
        //                     "voteNum": 0,
        //                     "hero": null,
        //                     "voteInfo": {
        //                         "isVote": false,
        //                     },
        //                     "creator": {
        //                         "nickname": null,
        //                     },
        //                     "claimInfo": {
        //                         "isClaimed": false,
        //                     },
        //                 },
        //                 "cursor": "",
        //             }],
        //             "pageInfo": {
        //                 "endCursor": "",
        //                 "hasNextPage": true,
        //             },
        //         }
        //     }
        // };

        let cursor = "";
        let sessions = [];
        let hasNextPage = true;

        while (hasNextPage) {
            let res = await client
                .query({
                    query: GET_SESSIONS,
                    variables: {
                        teamId: teamId,
                        first: 5,
                        cursor: cursor
                    }
                });
            // console.log("++++++++++\n" + JSON.stringify(res.data) + "\n++++++++++");

            let sessionArr = res.data.getSessionsByTeamId.edges;
            hasNextPage = res.data.getSessionsByTeamId.pageInfo.hasNextPage;
            cursor = sessionArr[sessionArr.length - 1].cursor;
            // console.log("\n", "cursor:" + cursor, "\n", "hasNextPage:" + hasNextPage, "\n");

            for (let j = 0; j < sessionArr.length; j++) {
                sessions.push(res.data.getSessionsByTeamId.edges[j].node.title);
            }
        }
        // console.log("++++++++++\n" + sessions + "\n++++++++++");
        expect(sessions).toContain(title);
    });

    test("delete the session published", async () => {
        const res = await client
            .mutate({
                mutation: DELETE_SESSION,
                variables: {
                    sessionId: sessionId,
                }
            });
        // console.log("______________\n", res.data, "\nsessionId:" + sessionId, "\ntitle:" + title, "\ndescription:" + description, "\n____________");
        expect(res.data.deleteSession).toBe(true);
    });


});