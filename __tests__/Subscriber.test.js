import Subsciber from "../utils/subscriber";
import client from "../__customMockData__/client.mock";
import store from "../utils/store";

let subscriber = new Subsciber(store, client);

describe("API query and mutation request", () => {
  test("subscribeToQuery should be an instance of promise", () => {
    expect(subscriber.subscribeToQuery()).toBeInstanceOf(Promise);
  });

  test("sendQuery should get all the users from the API", () => {
    return subscriber.sendQuery(undefined, {}, "getUsers").then(data => {
      expect(data.success).toBe(true);
    });
  });

  test("subscribeToMutation should be an instance of promise", () => {
    expect(subscriber.subscribeToMutation()).toBeInstanceOf(Promise);
  });

  test("sendMutation should return an error message", () => {
    return subscriber
      .sendMutation(undefined, { data: {} }, "createUser")
      .catch(error => {
        expect(error.success).toBe(false);
      });
  });

  test("subscribeToMultiConcurrentQueries should return a promise", () => {
    expect(subscriber.subscribeToMultiConcurrentQueries()).toBeInstanceOf(
      Promise
    );
  });

  test("sendMultipleConcurrentQueries should return an array of users and posts", () => {
    let configs = [{ operation: "getUsers" }, { operation: "getPosts" }];
    return subscriber
      .sendMultipleConcurrentQueries(undefined, configs)
      .then(data => {
        expect(data).toHaveLength(2);
      });
  });
});
