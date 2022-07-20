enum Status {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

type Resolve<T> = (value: T | PromiseLike<T>) => void
type Reject = (reason?: any) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void
type onFulfilled<T, TResult1> = ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null
type onRejected<TResult2> = ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null

function isPromise(value: any): value is PromiseLike<any> {
  return ((value !== null && typeof value === 'object') || typeof value === 'function') && typeof value.then === 'function'
}
console.log('开始')

class Promise2<T> implements Promise<T> {
  status: Status = Status.PENDING
  private value!: T
  private reason?: any
  private onFulfilledCallbackList: (() => void)[] = []
  private onRejectedCallbackList: (() => void)[] = []

  constructor(exectuor: Executor<T>) {
    try {
      exectuor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }

  private _resolve(value: T | PromiseLike<T>) {
    try {
      setTimeout(() => {
        if (isPromise(value)) {
          value.then(this._resolve.bind(this), this._reject.bind(this))
          return
        }
        if (this.status === Status.PENDING) {
          this.status = Status.FULFILLED
          this.value = value
          this.onFulfilledCallbackList.forEach(fn => fn())
        }
      })
    } catch (error) {
      this._reject(error)
    }
  }
  private _reject(reason: any) {
    setTimeout(() => {
      if (this.status === Status.PENDING) {
        this.status = Status.REJECTED
        this.reason = reason
        this.onRejectedCallbackList.forEach(fn => fn())
      }
    })
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: onFulfilled<T, TResult1>,
    onrejected?: onRejected<TResult2>
  ): Promise2<TResult1 | TResult2> {
    const onfulfilledFn = typeof onfulfilled === 'function' ? onfulfilled : (v: T | TResult1) => v as TResult1
    const onrejectedFn =
      typeof onrejected === 'function'
        ? onrejected
        : (r: any) => {
            throw r
          }
    const promise2 = new Promise2<TResult1 | TResult2>((resolve, reject) => {
      if (this.status === Status.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onfulfilledFn!(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === Status.REJECTED) {
        setTimeout(() => {
          try {
            const x = onrejectedFn!(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === Status.PENDING) {
        this.onFulfilledCallbackList.push(() => {
          try {
            const x = onfulfilledFn!(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCallbackList.push(() => {
          try {
            const x = onrejectedFn!(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
    })

    return promise2
  }

  catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<T | TResult> {
    throw new Error('Method not implemented.')
  }
  finally(onfinally?: () => void): Promise<T> {
    throw new Error('Method not implemented.')
  }
  [Symbol.toStringTag]: string
}

function resolvePromise<T>(promise2: Promise2<T>, x: T | PromiseLike<T>, resolve: Resolve<T>, reject: any) {
  if (x === promise2) {
    const e = new TypeError('TypeError: Chaining cycle detected for promise!')
    console.log(e)
    return reject(e)
  }
  let call = false

  if (isPromise(x)) {
    try {
      const then = x.then
      then.call(
        x,
        (y: T | PromiseLike<T>) => {
          if (call) return
          call = true
          resolvePromise(promise2, y, resolve, reject)
        },
        r => {
          if (call) return
          call = true
          reject(r)
        }
      )
    } catch (error) {
      reject(error)
    }
  } else {
    resolve(x)
  }
}
