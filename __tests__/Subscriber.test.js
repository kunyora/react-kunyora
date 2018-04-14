import KunyoraClient from "kunyora";

import Subsciber from "../utils/subscriber";
import client from "../__customMockData__/client.mock";

const Client = KunyoraClient({});

let subscriber = new Subsciber(Client.store, client),
  configs = [{ operation: "getUsers" }, { operation: "getPosts" }];

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
    return subscriber
      .sendMultipleConcurrentQueries(undefined, configs)
      .then(data => {
        expect(data).toHaveLength(2);
      });
  });
});

test("buildRequestHandshakePromise should return a Promise", () => {
  expect(subscriber.buildRequestHandshakePromise(configs)).toBeInstanceOf(
    Promise
  );
});

test("composeAxiosInstance should return an array of Promise of length 2 and each item be an instance of Promise", () => {
  expect(subscriber.composeAxiosInstance(configs)).toHaveLength(2);
  expect(subscriber.composeAxiosInstance(configs)[0]).toBeInstanceOf(Promise);
});

test("getQueryFromStore should return a Promise", () => {
  expect(subscriber.getQueryFromStore("getUsers")).toBeInstanceOf(Promise);
});

test("getQueryAxiosInstance should return a Promise", () => {
  expect(subscriber.getQueryAxiosInstance("getUsers")).toBeInstanceOf(Promise);
});

test("sendResponseToCallback should be defined", () => {
  expect(subscriber.sendResponseToCallback).toBeDefined();
});
