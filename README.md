# winter-assert-promise
Executes a promise and applies the given assertion to the resolution.  Handles all failure routes gracefully.

# installation
`npm install --save-dev winter-assert-promise`

# usage
`
assertPromise(promise, args, assert, done);
`

## promise
Is a Promise implementation which takes a single argument

## args
Is an argument of any type (including object or function)

## assert
Is a function which is applied to the resolution of the provided promise

## done
Is the call back for your test.  If the assertion passes then this is called with no arguments.  If it fails or the promise is rejected, it is called with the error or reason respectively.
