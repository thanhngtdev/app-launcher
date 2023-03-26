const makeCancelablePromise = (promise: Promise<any>) => {
  let cancel: (reason: any) => void;
  const wrappedPromise = new Promise((resolve, reject) => {
    cancel = reject;
    promise.then((val) => resolve(val)).catch((error) => reject(error));
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      cancel({ isCanceled: true });
    },
  };
};

class PromiseHandler {
  executor: { promise: Promise<any>; cancel: () => void } | null;

  constructor() {
    this.executor = null;
  }

  takeLatest(promise: Promise<any>) {
    if (this.executor) {
      this.executor.cancel();
    }

    this.executor = makeCancelablePromise(promise);

    return this.executor.promise;
  }
}

export default PromiseHandler;
