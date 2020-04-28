import {client} from "../../../helper/requests";
import {EDIT_MY_INFO, CREATE_SUBSCRIPTION, GET_MY_SUBSCRIPTIONS} from "../../../helper/subcription";

// 该test suite因为delete api还没有做，会产生冗余的数据，请谨慎使用！！

describe("scenario 8: user create a subscription serial and check my subscriptions, then delete it", () => {
    const random = Math.floor(Math.random() * 100);
    const teamName = "测试专用系列" + random.toString();
    let createTeamId;

    test("user edit his personal info", async () => {
        const random = Math.ceil(Math.random() * 10)
        const nickname = "万小慢" + random.toString();
        const avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq6DHbHFRW5L4ImZSL8eTicUfASTGVIFCPRbjicfPjPfaq5JxqoLELG2ia5LCcr6gISwtNGa7vvs0MIA/132";
        const email = random.toString() + "@123.com";

        const res = await client
            .mutate({
                mutation: EDIT_MY_INFO,
                variables: {
                    nickname: nickname,
                    avatarUrl: avatarUrl,
                    email: email
                }
            });
        expect(res.data.updateUser.nickname).toEqual(nickname);
        expect(res.data.updateUser.email).toEqual(email);
    });

    test("create a subscribe serial", async () => {
        const res = await client
            .mutate({
                mutation: CREATE_SUBSCRIPTION,
                variables: {
                    teamName: teamName
                }
            });

        createTeamId = res.data.createTeam.id;
        expect(res.data.createTeam.name).toEqual(teamName);
    });

    test("check my subscription list", async () => {
        let type = [];
        const res = await client
            .query({
                query: GET_MY_SUBSCRIPTIONS,
                variables: {
                    role: null
                }
            });

        let subscriptions = res.data.teams;
        for (let i = 0; i < subscriptions.length; i++) {
            type.push(subscriptions[i].__typename);
        }

        type.forEach(item => {
            expect(item).toEqual("Team");
        })
    });

    test("delete the subscription created", async () => {
    })
})